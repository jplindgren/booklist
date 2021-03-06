export const type = `
  
  type Tag {
    _id: String
    name: String
    path: String
    userId: String
    backgroundColor: String
    textColor: String
  }

  type TagQueryResults {
    Tags: [Tag!]!
    Meta: QueryResultsMetadata!
  }

  type TagSingleQueryResult {
    Tag: Tag
  }

  type TagMutationResult {
    Tag: Tag
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type TagMutationResultMulti {
    Tags: [Tag]
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type TagBulkMutationResult {
    success: Boolean!
    Meta: MutationResultInfo!
  }

  input TagInput {
    _id: String
    name: String
    path: String
    userId: String
    backgroundColor: String
    textColor: String
  }

  input TagMutationInput {
    name: String
    path: String
    userId: String
    backgroundColor: String
    textColor: String
  }

  input TagSort {
    _id: Int
    name: Int
    path: Int
    userId: Int
    backgroundColor: Int
    textColor: Int
  }

  input TagFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
    _id_nin: [String]
    name_contains: String
    name_startsWith: String
    name_endsWith: String
    name_regex: String
    name: String
    name_ne: String
    name_in: [String]
    name_nin: [String]
    path_contains: String
    path_startsWith: String
    path_endsWith: String
    path_regex: String
    path: String
    path_ne: String
    path_in: [String]
    path_nin: [String]
    userId_contains: String
    userId_startsWith: String
    userId_endsWith: String
    userId_regex: String
    userId: String
    userId_ne: String
    userId_in: [String]
    userId_nin: [String]
    backgroundColor_contains: String
    backgroundColor_startsWith: String
    backgroundColor_endsWith: String
    backgroundColor_regex: String
    backgroundColor: String
    backgroundColor_ne: String
    backgroundColor_in: [String]
    backgroundColor_nin: [String]
    textColor_contains: String
    textColor_startsWith: String
    textColor_endsWith: String
    textColor_regex: String
    textColor: String
    textColor_ne: String
    textColor_in: [String]
    textColor_nin: [String]
    OR: [TagFilters]
  }
  
`;

export const mutation = `

  createTag (
    Tag: TagInput
  ): TagMutationResult

  updateTag (
    _id: String,
    Updates: TagMutationInput
  ): TagMutationResult

  updateTags (
    _ids: [String],
    Updates: TagMutationInput
  ): TagMutationResultMulti

  updateTagsBulk (
    Match: TagFilters,
    Updates: TagMutationInput
  ): TagBulkMutationResult

  deleteTag (
    _id: String
  ): DeletionResultInfo

`;

export const query = `

  allTags (
    _id: String,
    _id_ne: String,
    _id_in: [String],
    _id_nin: [String],
    name_contains: String,
    name_startsWith: String,
    name_endsWith: String,
    name_regex: String,
    name: String,
    name_ne: String,
    name_in: [String],
    name_nin: [String],
    path_contains: String,
    path_startsWith: String,
    path_endsWith: String,
    path_regex: String,
    path: String,
    path_ne: String,
    path_in: [String],
    path_nin: [String],
    userId_contains: String,
    userId_startsWith: String,
    userId_endsWith: String,
    userId_regex: String,
    userId: String,
    userId_ne: String,
    userId_in: [String],
    userId_nin: [String],
    backgroundColor_contains: String,
    backgroundColor_startsWith: String,
    backgroundColor_endsWith: String,
    backgroundColor_regex: String,
    backgroundColor: String,
    backgroundColor_ne: String,
    backgroundColor_in: [String],
    backgroundColor_nin: [String],
    textColor_contains: String,
    textColor_startsWith: String,
    textColor_endsWith: String,
    textColor_regex: String,
    textColor: String,
    textColor_ne: String,
    textColor_in: [String],
    textColor_nin: [String],
    OR: [TagFilters],
    SORT: TagSort,
    SORTS: [TagSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int,
    publicUserId: String,
    ver: String,
    cache: Int
  ): TagQueryResults!

  getTag (
    _id: String,
    publicUserId: String,
    ver: String,
    cache: Int
  ): TagSingleQueryResult!

`;
