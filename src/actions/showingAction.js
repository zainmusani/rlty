import {ADD_SHOWING, DELETE_SHOWING, EDIT_SHOWING, GET_SHOWINGS} from "./ActionTypes";


export function addShowingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: ADD_SHOWING.REQUEST,
    };
}

export function addShowingSuccess(data) {
    return {
        data,
        type: ADD_SHOWING.SUCCESS,
    };
}

export function getShowingsRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_SHOWINGS.REQUEST,
    };
}

export function getShowingsSuccess(data) {
    return {
        data,
        type: GET_SHOWINGS.SUCCESS,
    };
}

export function editShowingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: EDIT_SHOWING.REQUEST,
    };
}

export function editShowingSuccess(data) {
    return {
        data,
        type: EDIT_SHOWING.SUCCESS,
    };
}

export function deleteShowingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: DELETE_SHOWING.REQUEST,
    };
}

export function deleteShowingSuccess(data) {
    return {
        data,
        type: DELETE_SHOWING.SUCCESS,
    };
}