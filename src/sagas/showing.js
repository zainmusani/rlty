import { take, put, call, fork } from "redux-saga/effects";
import { ADD_SHOWING, DELETE_SHOWING, EDIT_SHOWING, GET_SHOWINGS } from '../actions/ActionTypes';
import {
    SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG,
    MESSAGE_TYPES,
} from '../constants';
import {
    ADD_SHOWING as ADD_SHOWING_URL,
    GET_SHOWINGS as GET_SHOWINGS_URL,
    EDIT_SHOWING as EDIT_SHOWING_URL,
    DELETE_SHOWING as DELETE_SHOWING_URL,
    callRequest,
} from '../config/WebService';
import { getShowingsSuccess, addShowingSuccess, editShowingSuccess, deleteShowingSuccess } from "../actions/showingAction";
import ApiSauce from "../services/ApiSauce";
import Util from '../util';
import { manipulateShowingListData } from "../helpers/showingHelper";

function alert(message, type = MESSAGE_TYPES.ERROR) {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* addShowing() {
    while (true) {
        const { payload, responseCallback } = yield take(ADD_SHOWING.REQUEST);
        try {
            const response = yield call(
                callRequest,
                ADD_SHOWING_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(addShowingSuccess(response.data));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert("E1" + response.message || "E1" + SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert("E2" + err.message);
        }
    }
}

function* getShowings() {
    while (true) {
        const { payload, responseCallback } = yield take(GET_SHOWINGS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_SHOWINGS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );

            console.log("wrong showings ---->>>", response?.data);


            if (response.status) {
                const mainData = manipulateShowingListData(response.data);
                console.log("wrong main Data --->>>", mainData);
                yield put(getShowingsSuccess(mainData));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert("E3" + response.message || "E3" + SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert("E4" + err.message);
        }
    }
}

function* editShowing() {
    while (true) {
        const { payload, responseCallback } = yield take(EDIT_SHOWING.REQUEST);
        try {
            const response = yield call(
                callRequest,
                EDIT_SHOWING_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(editShowingSuccess(response.data));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert("E5" + response.message || "E5" + SOMETHING_WRONG);
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert("E6" + err.message);
        }
    }
}

function* deleteShowing() {
    while (true) {
        const { payload, responseCallback } = yield take(DELETE_SHOWING.REQUEST);
        try {
            const response = yield call(
                callRequest,
                DELETE_SHOWING_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(deleteShowingSuccess(payload));
                // yield put(deleteShowingSuccess(response.data));
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
    yield fork(addShowing);
    yield fork(getShowings);
    yield fork(editShowing);
    yield fork(deleteShowing);
}
