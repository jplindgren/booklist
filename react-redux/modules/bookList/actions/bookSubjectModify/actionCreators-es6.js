const {
    ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK,
    ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS,
    TOGGLE_SUBJECT_ADD_FOR_SUBJECT_MODIFICATION,
    TOGGLE_SUBJECT_REMOVE_FOR_SUBJECT_MODIFICATION,
    SETTING_BOOKS_SUBJECTS,
    SET_BOOKS_SUBJECTS,
    CANCEL_BOOKS_SUBJECT_MODIFICATION,
    CLEAR_SUBJECT_MODIFICATION_SUBJECTS
} = require('./actionNames');

function cancelBookSubjectModification(){
    return { type: CANCEL_BOOKS_SUBJECT_MODIFICATION }
}

function setBooksSubjects(books, add, remove){
    return function(dispatch, getState){
        dispatch({ type: SETTING_BOOKS_SUBJECTS });
        ajaxUtil.post('/bookBulk/setSubjects', { books, add, remove }, resp => {
            dispatch({ type: SET_BOOKS_SUBJECTS, books, add, remove });
            dispatch(cancelBookSubjectModification())
        });
    }
}

function toggleSubjectModificationAdd(_id){
    return { type: TOGGLE_SUBJECT_ADD_FOR_SUBJECT_MODIFICATION, _id }
}

function toggleSubjectModificationRemove(_id){
    return { type: TOGGLE_SUBJECT_REMOVE_FOR_SUBJECT_MODIFICATION, _id }
}

function enableSubjectModificationSingleBook(_id){
    return { type: ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK, _id }
}

function enableSubjectModificationToggledBooks(){
    return { type: ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS }
}

function subjectModificationClearSubjects(){
    return { type: CLEAR_SUBJECT_MODIFICATION_SUBJECTS };
}

module.exports = {
    setBooksSubjects,
    cancelBookSubjectModification,
    enableSubjectModificationSingleBook,
    enableSubjectModificationToggledBooks,
    toggleSubjectModificationAdd,
    toggleSubjectModificationRemove,
    subjectModificationClearSubjects
};