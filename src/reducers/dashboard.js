// @flow
import Immutable from 'seamless-immutable';
import {DASHBOARD_COUNT, GET_GRAPH, MONTHLY_REVENUE, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
    dashboardCount: {},
    monthlyRevenue: {},
    graphData: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_COUNT.SUCCESS: {
            return Immutable.merge(state, {
                dashboardCount: action.data,
            });
        }
        case MONTHLY_REVENUE.SUCCESS: {
            return Immutable.merge(state, {
                monthlyRevenue: action.data,
            });
        }
        case GET_GRAPH.SUCCESS: {
            return Immutable.merge(state, {
                graphData: action.data,
            });
        }
        case USER_SIGNOUT.SUCCESS: {
            return Immutable.merge(state, initialState);
        }
        default:
            return state;
    }
};
