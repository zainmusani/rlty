// @flow
import Immutable from 'seamless-immutable';
import {GET_SUBSCRIPTION_DETAILS, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
    subscriptionDetails: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBSCRIPTION_DETAILS.SUCCESS: {
            return Immutable.merge(state, {
                subscriptionDetails: action.data,
            });
        }
        case USER_SIGNOUT.SUCCESS: {
            return Immutable.merge(state, initialState);
        }
        default:
            return state;
    }
};
