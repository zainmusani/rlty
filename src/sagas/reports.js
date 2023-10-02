import {call, fork, put, take} from "redux-saga/effects";
import {DOWNLOAD_REPORTS, GET_REPORTS_SEARCH} from '../actions/ActionTypes';
import {downloadReportsSuccess, getReportsSearchSuccess} from "../actions/ReportsActions";
import {
    callRequest,
    DOWNLOAD_REPORTS as DOWNLOAD_REPORTS_URL,
    GET_REPORTS_SEARCH as GET_REPORTS_SEARCH_URL,
} from '../config/WebService';
import {
    MESSAGE_TYPES, SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG
} from '../constants';
import ApiSauce from "../services/ApiSauce";
import Util from '../util';

function alert(message, type = MESSAGE_TYPES.ERROR) {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* getReportsSearch() {
    while (true) {
        const {parameter, responseCallback} = yield take(GET_REPORTS_SEARCH.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_REPORTS_SEARCH_URL,
                "",
                parameter,
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(getReportsSearchSuccess(response.data));
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

function* downloadReports() {
    while (true) {
        const {parameter, responseCallback} = yield take(DOWNLOAD_REPORTS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                DOWNLOAD_REPORTS_URL,
                "",
                parameter,
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(downloadReportsSuccess(response.data));
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
    yield fork(getReportsSearch);
    yield fork(downloadReports);
}
