import {take, put, call, fork} from "redux-saga/effects";
import {DASHBOARD_COUNT, GET_GRAPH, MONTHLY_REVENUE} from '../actions/ActionTypes';
import {
    SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG,
    MESSAGE_TYPES,
} from '../constants';
import {
    DASHBOARD_COUNT as DASHBOARD_COUNT_URL,
    MONTHLY_REVENUE as MONTHLY_REVENUE_URL,
    GET_GRAPH as GET_GRAPH_URL,
    callRequest,
} from '../config/WebService';
import ApiSauce from "../services/ApiSauce";
import Util from '../util';
import {dashboardCountSuccess, getGraphSuccess, monthlyRevenueSuccess} from "../actions/dashboardActions";
import {manipulateRevenueData} from '../helpers/dashboardHelper';

function alert(message, type = MESSAGE_TYPES.ERROR) {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* dashboardCount() {
    while (true) {
        const {payload, responseCallback} = yield take(DASHBOARD_COUNT.REQUEST);
        try {
            const response = yield call(
                callRequest,
                DASHBOARD_COUNT_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(dashboardCountSuccess(response.data));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert(response.message || SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert(err.message);
        }
    }
}


function* monthlyRevenue() {
    while (true) {
        const {payload, responseCallback} = yield take(MONTHLY_REVENUE.REQUEST);
        try {
            const response = yield call(
                callRequest,
                MONTHLY_REVENUE_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(monthlyRevenueSuccess(manipulateRevenueData(response.data)));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert(response.message || SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert(err.message);
        }
    }
}

function* getGraph() {
    while (true) {
        const {payload, responseCallback} = yield take(GET_GRAPH.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_GRAPH_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(getGraphSuccess(response.data));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert(response.message || SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert(err.message);
        }
    }
}

export default function* root() {
    yield fork(dashboardCount);
    yield fork(monthlyRevenue);
    yield fork(getGraph);
}
