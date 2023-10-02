import {GET_FAQS, GET_SETTING} from "./ActionTypes";

export function getSettingsRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_SETTING.REQUEST,
    };
}

export function getSettingsSuccess(data) {
    return {
        data,
        type: GET_SETTING.SUCCESS,
    };
}

export function getFaqsRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_FAQS.REQUEST,
    };
}

export function getFaqsSuccess(data) {
    return {
        data,
        type: GET_FAQS.SUCCESS,
    };
}