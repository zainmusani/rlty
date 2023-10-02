import {DOWNLOAD_REPORTS, GET_REPORTS_SEARCH} from "./ActionTypes";


export function getReportsSearchRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: GET_REPORTS_SEARCH.REQUEST,
    };
}

export function getReportsSearchSuccess(data) {
    return {
        data,
        type: GET_REPORTS_SEARCH.SUCCESS,
    };
}

export function downloadReportsRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: DOWNLOAD_REPORTS.REQUEST,
    };
}

export function downloadReportsSuccess(data) {
    return {
        data,
        type: DOWNLOAD_REPORTS.SUCCESS,
    };
}