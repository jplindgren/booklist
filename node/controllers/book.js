import { controller } from "easy-express-controllers";
import bookEntryQueueManager from "../app-helpers/bookEntryQueueManager";

const { graphql } = require("graphql");
import { executableSchema, root } from "../../startApp";

import AWS from "aws-sdk";
AWS.config.region = "us-east-1";

import orderBy from "lodash.orderby";
import request from "request";
import path from "path";
import uuid from "uuid/v4";

import findBooksQuery from "../graphql-queries/findBooks";
import findRecommendationQuery from "../graphql-queries/findRecommendations";
import findRecommendationMatches from "../graphql-queries/findRecommendationMatches";

import { ObjectId } from "mongodb";
import { getDbConnection } from "../util/dbUtils";

class BookController {
  async saveFromIsbn({ isbn }) {
    const userId = this.request.user.id;

    try {
      let addingItem = { userId, isbn };
      await bookEntryQueueManager.addPendingBook(userId, addingItem);

      this.send({ success: true });
    } catch (er) {
      this.send({ failure: true });
    }
  }
  async getRecommendations(params) {
    try {
      let userId = params.publicUserId || this.request.user.id;

      let resp = await graphql(executableSchema, findBooksQuery, root, this.request, { ids: params.bookIds, publicUserId: params.publicUserId });
      let books = resp.data.allBooks.Books;
      let isbnMap = new Map([]);
      books.forEach(book => {
        (book.similarItems || []).forEach(isbn => {
          if (!isbnMap.has(isbn)) {
            isbnMap.set(isbn, 0);
          }
          isbnMap.set(isbn, isbnMap.get(isbn) + 1);
        });
      });

      let isbns = [...isbnMap.keys()];

      let results = await graphql(executableSchema, findRecommendationQuery, root, this.request, { isbns, publicUserId: params.publicUserId });
      let resultRecommendations = results.data.allBookSummarys.BookSummarys;
      let resultRecommendationLookup = new Map(resultRecommendations.map(b => [b.isbn, b]));
      let isbnsOrdered = orderBy(
        [...isbnMap.entries()].map(([isbn, count]) => ({ isbn, count })),
        ["count"],
        ["desc"]
      );
      let potentialRecommendations = isbnsOrdered.map(b => resultRecommendationLookup.get(b.isbn)).filter(b => b);

      let potentialIsbns = potentialRecommendations.map(b => b.isbn).filter(x => x);

      let matches = (
        await graphql(executableSchema, findRecommendationMatches, root, this.request, {
          isbns: potentialIsbns,
          publicUserId: params.publicUserId
        })
      ).data.allBooks.Books;

      let matchingIsbns = new Set(matches.map(m => m.isbn).filter(x => x));
      let matchingEans = new Set(matches.map(m => m.ean).filter(x => x));

      let finalResults = potentialRecommendations.filter(m => (!m.isbn || !matchingIsbns.has(m.isbn)) && (!m.ean || !matchingEans.has(m.ean)));

      this.send({ results: finalResults });
    } catch (err) {
      console.log("err", err);
    }
  }
}
controller({ defaultVerb: "post" })(BookController);

export default BookController;
