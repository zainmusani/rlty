import { take, put, call, fork } from "redux-saga/effects";
import { ALLOW_NOTIFICATION, FIREBASE_NOTIFICATION_OPEN, DEVICE_TOKEN, GET_NOTIFICATION_LIST, NOTIFICATION_OPEN, SEND_NOTIFICATION, NOTIFICATION_COUNT } from '../actions/ActionTypes';
import {
    SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG,
    MESSAGE_TYPES,
} from '../constants';
import {
    SEND_NOTIFICATION as SEND_NOTIFICATION_URL,
    DEVICE_TOKEN as DEVICE_TOKEN_URL,
    GET_NOTIFICATION_LIST as GET_NOTIFICATION_LIST_URL,
    ALLOW_NOTIFICATION as ALLOW_NOTIFICATION_URL,
    NOTIFICATION_OPEN as NOTIFICATION_OPEN_URL,
    NOTIFICATION_COUNT as NOTIFICATION_COUNT_URL,
    FIREBASE_NOTIFICATION_OPEN as FIREBASE_NOTIFICATION_OPEN_URL,
    callRequest,
} from '../config/WebService';
import ApiSauce from "../services/ApiSauce";
import Util from '../util';
import { allowNotificationSuccess, deviceTokenSuccess, firebaseNotificationOpenSuccess, getNotificationListSuccess, notificationCountSuccess, notificationOpenSuccess, sendNotificationSuccess } from "../actions/GeneralActions";

function alert(message, type = MESSAGE_TYPES.ERROR) {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* sendNotification() {
    while (true) {
        const { payload, responseCallback } = yield take(SEND_NOTIFICATION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                SEND_NOTIFICATION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(sendNotificationSuccess(response.data));
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

function* deviceToken() {
    while (true) {
        const { payload, responseCallback } = yield take(DEVICE_TOKEN.REQUEST);
        try {
            const response = yield call(
                callRequest,
                DEVICE_TOKEN_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(deviceTokenSuccess(response.data));
                if (responseCallback) responseCallback(response.status);
            } else {
                if (responseCallback) responseCallback(false);
                alert(response.message || SOMETHING_WRONG);
                console.log(response.message || SOMETHING_WRONG, "error from deviceToken");
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert(err.message);
            console.log(response.message || SOMETHING_WRONG, "error from deviceToken");
        }
    }
}

function* allowNotification() {
    while (true) {
        const { payload, responseCallback } = yield take(ALLOW_NOTIFICATION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                ALLOW_NOTIFICATION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(allowNotificationSuccess(response.data));
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

function* getNotificationList() {
    while (true) {
        const { parameter, responseCallback } = yield take(GET_NOTIFICATION_LIST.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_NOTIFICATION_LIST_URL,
                "",
                parameter,
                {},
                ApiSauce
            );
            if (response.status) {
                console.log({ responseNOti: response });
                yield put(getNotificationListSuccess(response.data, parameter));
                if (responseCallback) responseCallback(response.data);
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

function* notificationCount() {
    while (true) {
        const { payload, responseCallback } = yield take(NOTIFICATION_COUNT.REQUEST);
        try {
            const response = yield call(
                callRequest,
                NOTIFICATION_COUNT_URL,
                payload,
                "",
                {},
                ApiSauce
            );

            if (response.status) {
                yield put(notificationCountSuccess(response.data));
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

function* notificationOpen() {
    while (true) {
        const { payload, responseCallback } = yield take(NOTIFICATION_OPEN.REQUEST);
        try {
            const response = yield call(
                callRequest,
                NOTIFICATION_OPEN_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(notificationOpenSuccess(response.data));
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

function* firebaseNotificationOpen() {
    while (true) {
        const { payload, responseCallback } = yield take(FIREBASE_NOTIFICATION_OPEN.REQUEST);
        try {
            const response = yield call(
                callRequest,
                FIREBASE_NOTIFICATION_OPEN_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(firebaseNotificationOpenSuccess(response.data));
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
    yield fork(sendNotification);
    yield fork(deviceToken);
    yield fork(allowNotification);
    yield fork(notificationCount);
    yield fork(getNotificationList);
    yield fork(notificationOpen);
    yield fork(firebaseNotificationOpen);
}
