// @flow
import Immutable from "seamless-immutable";
import {GET_REPORTS_SEARCH, USER_SIGNOUT} from "../actions/ActionTypes";

const initialState = Immutable({
    reportsSearchList: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORTS_SEARCH.SUCCESS: {
            return Immutable.merge(state, {
                reportsSearchList: action.data,
            });
        }
        case USER_SIGNOUT.SUCCESS: {
            return Immutable.merge(state, initialState);
        }
        default:
            return state;
    }
};
