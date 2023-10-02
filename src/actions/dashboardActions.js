import {DASHBOARD_COUNT, GET_GRAPH, MONTHLY_REVENUE} from "./ActionTypes";

export function dashboardCountRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: DASHBOARD_COUNT.REQUEST,
    };
}

export function dashboardCountSuccess(data) {
    return {
        data,
        type: DASHBOARD_COUNT.SUCCESS,
    };
}

export function monthlyRevenueRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: MONTHLY_REVENUE.REQUEST,
    };
}

export function monthlyRevenueSuccess(data) {
    return {
        data,
        type: MONTHLY_REVENUE.SUCCESS,
    };
}

export function getGraphRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_GRAPH.REQUEST,
    };
}

export function getGraphSuccess(data) {
    return {
        data,
        type: GET_GRAPH.SUCCESS,
    };
}