import { createSelector } from 'reselect';
import { LOAD_BOOKS, LOAD_BOOKS_RESULTS, TOGGLE_SELECT_BOOK, SELECT_ALL_BOOKS, DE_SELECT_ALL_BOOKS, BOOK_READ_CHANGING, BOOK_READ_CHANGED } from './actionNames';
import { SUBJECT_DELETED } from '../subjects/actionNames';
import { SET_BOOKS_SUBJECTS } from '../booksSubjectModification/actionNames';
import { SET_BOOKS_TAGS } from '../booksTagModification/actionNames';
import { EDITING_BOOK_SAVED } from '../editBook/actionNames';

import { BOOK_SAVED, MANUAL_BOOK_SAVED } from 'modules/scan/reducers/actionNames';

const initialBooksState = {
    booksHash: {},
    loading: false,
    selectedBooks: {},
    reloadOnActivate: false,
    initialQueryFired: false
};

export function booksReducer(state = initialBooksState, action){
    switch(action.type) {
        case LOAD_BOOKS:
            return Object.assign({}, state, { loading: true, initialQueryFired: true, reloadOnActivate: false });
        case LOAD_BOOKS_RESULTS:
            return Object.assign({}, state, { loading: false, booksHash: createBooksHash(action.books) });
        case EDITING_BOOK_SAVED:
            let newBookVersion = Object.assign({}, state.booksHash[action.book._id], action.book); //only update fields sent
            return Object.assign({}, state, { booksHash: { ...state.booksHash, [action.book._id]: newBookVersion } });
        case TOGGLE_SELECT_BOOK:
            return Object.assign({}, state, { selectedBooks: { ...state.selectedBooks, [action._id]: !state.selectedBooks[action._id] } });
        case SELECT_ALL_BOOKS:
            var newBookList = state.list.map(b => Object.assign({}, b, { selected: true }));
            return Object.assign({}, state, { list: newBookList, selectedCount: newBookList.length });
        case DE_SELECT_ALL_BOOKS:
            var newBookList = state.list.map(b => Object.assign({}, b, { selected: false }));
            return Object.assign({}, state, { list: newBookList, selectedCount: 0 });
        case SET_BOOKS_SUBJECTS:
            var newBookHash = { ...state.booksHash };

            action.books.forEach(_id => {
                let book = { ...newBookHash[_id] },
                    booksSubjectsHash = {};

                book.subjects.forEach(_id => booksSubjectsHash[_id] = true);

                action.add.forEach(sAdd => booksSubjectsHash[sAdd] = true);
                action.remove.forEach(sAdd => booksSubjectsHash[sAdd] = false);

                book.subjects = Object.keys(booksSubjectsHash).filter(_id => booksSubjectsHash[_id]);
                newBookHash[_id] = book;
            });

            return Object.assign({}, state, { booksHash: newBookHash });
        case SET_BOOKS_TAGS:
            var newBookHash = { ...state.booksHash };

            action.books.forEach(_id => {
                var book = { ...newBookHash[_id] },
                    booksTagsHash = {};

                book.tags.forEach(_id => booksTagsHash[_id] = true);

                action.add.forEach(sAdd => booksTagsHash[sAdd] = true);
                action.remove.forEach(sAdd => booksTagsHash[sAdd] = false);

                book.tags = Object.keys(booksTagsHash).filter(_id => booksTagsHash[_id]);
                newBookHash[_id] = book;
            });

            return Object.assign({}, state, { booksHash: newBookHash });
        case BOOK_SAVED:
        case MANUAL_BOOK_SAVED:
            return Object.assign({}, state, { reloadOnActivate: true });
        case BOOK_READ_CHANGING:
            return Object.assign({}, state, { booksHash: { ...state.booksHash, [action._id]: { ...state.booksHash[action._id], readChanging: true } } });
        case BOOK_READ_CHANGED:
            return Object.assign({}, state, { booksHash: { ...state.booksHash, [action._id]: { ...state.booksHash[action._id], readChanging: false, isRead: action.value } } });
    }
    return state;
}

function createBooksHash(booksArr){
    let result = {};
    booksArr.forEach(book => {
        if (!book.subjects){
            book.subjects = [];
        }
        if (!book.tags){
            book.tags = [];
        }
        result[book._id] = book
    });
    return result;
}

const booksWithSubjectsSelector = createSelector(
    [
        ({ booksModule }) => booksModule.books.booksHash,
        ({ booksModule }) => booksModule.subjects.subjectHash,
        ({ booksModule }) => booksModule.tags.tagHash
    ],
    adjustBooksForDisplay
);

export const booksSelector = state => {
    let booksModule = state.booksModule;

    return Object.assign({},
        booksModule.books,
        {
            list: booksWithSubjectsSelector(state),
            selectedBooksCount: Object.keys(booksModule.books.selectedBooks).filter(k => booksModule.books.selectedBooks[k]).length
        });
}

function adjustBooksForDisplay(booksHash, subjectsHash, tagHash){
    let books = Object.keys(booksHash).map(_id => booksHash[_id]);
    books.forEach(b => {
        b.subjectObjects = (b.subjects || []).map(s => subjectsHash[s]).filter(s => s);
        b.tagObjects = (b.tags || []).map(s => tagHash[s]).filter(s => s);
        b.authors = b.authors || [];

        let d = new Date(+b.dateAdded);
        b.dateAddedDisplay = `${(d.getMonth()+1)}/${d.getDate()}/${d.getFullYear()}`;
    });
    return books;
}