import {
    SET_DESKTOP,
    SET_MOBILE,
    REQUEST_DESKTOP,
    REQUEST_MOBILE,
    LOAD_SUBJECTS,
    LOAD_SUBJECTS_RESULTS,
    LOAD_COLORS,
    SAVE_SUBJECT_RESULTS,
    SUBJECT_DELETED
} from './rootReducerActionNames';

export const setDesktop = () => ({ type: SET_DESKTOP });
export const setMobile = () => ({ type: SET_MOBILE });

export const requestDesktop = () => ({ type: REQUEST_DESKTOP });
export const requestMobile = () => ({ type: REQUEST_MOBILE });

export function loadSubjects(){
    return function(dispatch, getState){
        let publicUserId = getState().app.publicUserId;

        dispatch({ type: LOAD_SUBJECTS });

        Promise.resolve(ajaxUtil.get('/subject/all', { userId: publicUserId })).then(subjectsResp => {
            dispatch({type: LOAD_SUBJECTS_RESULTS, subjects: subjectsResp.results});
            dispatch({type: LOAD_COLORS, colors: subjectsResp.colors });
        });
    }
}

export const subjectEditingActions = {
    saveSubject(subjectProps){
        return function(dispatch, getState) {
            ajaxUtil.post('/subject/setInfo', subjectProps, resp => dispatch({ type: SAVE_SUBJECT_RESULTS, affectedSubjects: resp.affectedSubjects }));
        }
    },
    deleteSubject(_id){
        return function(dispatch, getState){
            ajaxUtil.post('/subject/delete', {_id: _id + ''}, resp => {
                dispatch({ type: SUBJECT_DELETED, subjectsDeleted: resp.subjectsDeleted, _id });
            });
        }
    }
};