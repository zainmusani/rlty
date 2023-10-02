import {take, put, call, fork} from "redux-saga/effects";
import {GET_FAQS, GET_SETTING, } from '../actions/ActionTypes';
import {
    SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG,
    MESSAGE_TYPES,
} from '../constants';
import {
    GET_SETTING as GET_SETTING_URL,
    GET_FAQS as GET_FAQS_URL,
    callRequest,
} from '../config/WebService';
import ApiSauce from "../services/ApiSauce";
import Util from '../util';
import {getFaqsSuccess, getSettingsSuccess} from "../actions/settingsActions";

function alert(message, type = MESSAGE_TYPES.ERROR) {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* getSettings() {
    while (true) {
        const {payload, responseCallback} = yield take(GET_SETTING.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_SETTING_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(getSettingsSuccess(response.data));
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

function* getFaqs() {
    while (true) {
        const {payload, responseCallback} = yield take(GET_FAQS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_FAQS_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(getFaqsSuccess(response.data));
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
    yield fork(getSettings);
    yield fork(getFaqs);
}
