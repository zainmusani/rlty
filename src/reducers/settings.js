// @flow
import Immutable from 'seamless-immutable';
import {USER_SIGNOUT, GET_SETTING, GET_FAQS} from '../actions/ActionTypes';

const initialState = Immutable({
    settings: [],
    faqs: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SETTING.SUCCESS: {
            return Immutable.merge(state, {
                settings: action.data,
            });
        }
        case GET_FAQS.SUCCESS: {
            return Immutable.merge(state, {
                faqs: action.data,
            });
        }
        case USER_SIGNOUT.SUCCESS: {
            return Immutable.merge(state, initialState);
        }
        default:
            return state;
    }
};
