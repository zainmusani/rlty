import {CANCEL_SUBSCRIPTION, CREATE_APPLE_SUBSCRIPTION, CREATE_FREE_SUBSCRIPTION, CREATE_GOOGLE_SUBSCRIPTION, GET_SUBSCRIPTION_DETAILS} from "./ActionTypes";


export function getSubscriptionDetailsRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: GET_SUBSCRIPTION_DETAILS.REQUEST,
    };
}

export function getSubscriptionDetailsSuccess(data) {
    return {
        data,
        type: GET_SUBSCRIPTION_DETAILS.SUCCESS,
    };
}

export function createFreeSubscriptionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CREATE_FREE_SUBSCRIPTION.REQUEST,
    };
}

export function createFreeSubscriptionSuccess(data) {
    return {
        data,
        type: CREATE_FREE_SUBSCRIPTION.SUCCESS,
    };
}

export function createAppleSubscriptionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CREATE_APPLE_SUBSCRIPTION.REQUEST,
    };
}

export function createAppleSubscriptionSuccess(data) {
    return {
        data,
        type: CREATE_APPLE_SUBSCRIPTION.SUCCESS,
    };
}

export function createGoogleSubscriptionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CREATE_GOOGLE_SUBSCRIPTION.REQUEST,
    };
}

export function createGoogleSubscriptionSuccess(data) {
    return {
        data,
        type: CREATE_GOOGLE_SUBSCRIPTION.SUCCESS,
    };
}

export function cancelSubscriptionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CANCEL_SUBSCRIPTION.REQUEST,
    };
}

export function cancelSubscriptionSuccess(data) {
    return {
        data,
        type: CANCEL_SUBSCRIPTION.SUCCESS,
    };
}