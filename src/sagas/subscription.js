import {call, fork, put, take} from "redux-saga/effects";
import {CANCEL_SUBSCRIPTION, CREATE_APPLE_SUBSCRIPTION, CREATE_FREE_SUBSCRIPTION, CREATE_GOOGLE_SUBSCRIPTION, GET_SUBSCRIPTION_DETAILS} from '../actions/ActionTypes';
import {cancelSubscriptionSuccess, createAppleSubscriptionSuccess, createFreeSubscriptionSuccess, createGoogleSubscriptionSuccess, getSubscriptionDetailsSuccess} from "../actions/SubscriptionActions";
import {
    callRequest, CANCEL_SUBSCRIPTION as CANCEL_SUBSCRIPTION_URL,
    CREATE_FREE_SUBSCRIPTION as CREATE_FREE_SUBSCRIPTION_URL,
    CREATE_APPLE_SUBSCRIPTION as CREATE_APPLE_SUBSCRIPTION_URL,
    CREATE_GOOGLE_SUBSCRIPTION as CREATE_GOOGLE_SUBSCRIPTION_URL,
    GET_SUBSCRIPTION_DETAILS as GET_SUBSCRIPTION_DETAILS_URL
} from '../config/WebService';
import {
    MESSAGE_TYPES, SAGA_ALERT_TIMEOUT,
    SOMETHING_WRONG
} from '../constants';
import ApiSauce from "../services/ApiSauce";
import Util from '../util';

function alert(message, type = MESSAGE_TYPES.ERROR, position = "bottom") {
    setTimeout(() => {
        Util.topAlert(message, type, position);
    }, SAGA_ALERT_TIMEOUT);
}

function* getSubscriptionDetails() {
    while (true) {
        const {parameter, responseCallback} = yield take(GET_SUBSCRIPTION_DETAILS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_SUBSCRIPTION_DETAILS_URL,
                "",
                parameter,
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(getSubscriptionDetailsSuccess(response.data));
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

function* createFreeSubscription() {
    while (true) {
        const {payload, responseCallback} = yield take(CREATE_FREE_SUBSCRIPTION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                CREATE_FREE_SUBSCRIPTION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(createFreeSubscriptionSuccess(response.data));
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

function* createAppleSubscription() {
    while (true) {
        const {payload, responseCallback} = yield take(CREATE_APPLE_SUBSCRIPTION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                CREATE_APPLE_SUBSCRIPTION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(createAppleSubscriptionSuccess(response.data));
                if (responseCallback) responseCallback(response);
            } else {
                if (responseCallback) responseCallback(false);
                alert(response.message || SOMETHING_WRONG, 'error', 'Top');
            }
        } catch (err) {
            if (responseCallback) responseCallback(false);
            alert(err.message);
        }
    }
}

function* createGoogleSubscription() {
    while (true) {
        const {payload, responseCallback} = yield take(CREATE_GOOGLE_SUBSCRIPTION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                CREATE_GOOGLE_SUBSCRIPTION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(createGoogleSubscriptionSuccess(response.data));
                if (responseCallback) responseCallback(response);
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

function* cancelSubscription() {
    while (true) {
        const {payload, responseCallback} = yield take(CANCEL_SUBSCRIPTION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                CANCEL_SUBSCRIPTION_URL,
                payload,
                "",
                {},
                ApiSauce
            );
            if (response.status) {
                yield put(cancelSubscriptionSuccess(response.data));
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
    yield fork(getSubscriptionDetails);
    yield fork(createFreeSubscription);
    yield fork(createAppleSubscription);
    yield fork(createGoogleSubscription);
    yield fork(cancelSubscription);
}
