// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {DELETE_SHOWING, GET_SHOWINGS, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
    showingsList: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOWINGS.SUCCESS: {
            return Immutable.merge(state, {
                showingsList: action.data,
            });
        }
        case DELETE_SHOWING.SUCCESS: {
            const tempShowingsList = _.cloneDeep(state.showingsList);
            const dltIndx = Object.entries(tempShowingsList).map(a => a[1].dots.map((obj, i) => (obj.id === action.data.showing_id) && ({index: i, date: a[0]})).find(a => a)).find(a => a);
            if (dltIndx) tempShowingsList[dltIndx.date].dots.splice(dltIndx.index, 1);
            return Immutable.merge(state, {
                showingsList: tempShowingsList,
            });
        }
        case USER_SIGNOUT.SUCCESS: {
            return Immutable.merge(state, initialState);
        }
        default:
            return state;
    }
};
