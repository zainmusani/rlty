// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export const DEVICE_NOTIFICATION_TOKEN = createRequestTypes(
  'DEVICE_NOTIFICATION_TOKEN',
);

//! beta work start

// signup actions start
export const SEND_OTP = createRequestTypes('SEND_OTP');

export const SIGNUP_OTP = createRequestTypes('SIGNUP_OTP');

export const SIGNUP_STEP_THREE = createRequestTypes('SIGNUP_STEP_THREE');

export const USER_PROFILE = createRequestTypes('USER_PROFILE');

// signup actions end

// login actions start
export const USER_LOGIN = createRequestTypes('USER_LOGIN');
export const REMEMBER_CREDENTIAL = createRequestTypes('REMEMBER_CREDENTIAL');
export const REMOVE_CREDENTIAL = createRequestTypes('REMEMBER_CREDENTIAL');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const REFRESH_TOKEN = createRequestTypes('REFRESH_TOKEN');
// login actions end

// forgot-password actions start
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');

export const CONFIRM_OTP = createRequestTypes('CONFIRM_OTP');

export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
// forgot-password actions end

// reset-password actions start
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
// reset-password actions end

// general actions start
export const DEVICE_TOKEN = createRequestTypes('DEVICE_TOKEN');

export const SEND_NOTIFICATION = createRequestTypes('SEND_NOTIFICATION');

export const ALLOW_NOTIFICATION = createRequestTypes('ALLOW_NOTIFICATION');

export const GET_NOTIFICATION_LIST = createRequestTypes(
  'GET_NOTIFICATION_LIST',
);

export const NOTIFICATION_OPEN = createRequestTypes('NOTIFICATION_OPEN');

export const NOTIFICATION_COUNT = createRequestTypes('NOTIFICATION_COUNT');

export const FIREBASE_NOTIFICATION_OPEN = createRequestTypes(
  'FIREBASE_NOTIFICATION_OPEN',
);
// general actions end

// profile actions start
export const EDIT_PROFILE = createRequestTypes('EDIT_PROFILE');
// profile actions end

// property actions start
export const ADD_PROPERTY = createRequestTypes('ADD_PROPERTY');

export const ADD_NOTES = createRequestTypes('ADD_NOTES');

export const EDIT_NOTE = createRequestTypes('EDIT_NOTE');

export const DELETE_NOTE = createRequestTypes('DELETE_NOTE');

export const GET_PROPERTIES = createRequestTypes('GET_PROPERTIES');

export const GET_PROPERTY_BY_ID = createRequestTypes('GET_PROPERTY_BY_ID');

export const EDIT_PROPERTY = createRequestTypes('EDIT_PROPERTY');

export const DELETE_PROPERTY = createRequestTypes('DELETE_PROPERTY');

export const MARK_PROPERTY_FAVOURITE = createRequestTypes(
  'MARK_PROPERTY_FAVOURITE',
);

export const GET_FAVOURITE_PROPERTIES = createRequestTypes(
  'GET_FAVOURITE_PROPERTIES',
);

export const SOLD_PROPERTY = createRequestTypes('SOLD_PROPERTY');

export const ADD_BUYER = createRequestTypes('ADD_BUYER');
export const UPDATE_BUYER = createRequestTypes('UPDATE_BUYER');
export const DELETE_BUYER = createRequestTypes('DELETE_BUYER');

export const ADD_SELLER = createRequestTypes('ADD_SELLER');
export const DELETE_SELLER = createRequestTypes('DELETE_SELLER');
export const ADD_SELLER_EDIT = createRequestTypes('ADD_SELLER_EDIT');

export const GET_BUYER_LIST = createRequestTypes('GET_BUYER_LIST');

export const GET_SELLER_LIST = createRequestTypes('GET_SELLER_LIST');

export const GET_PROPERTIES_SEARCH = createRequestTypes(
  'GET_PROPERTIES_SEARCH',
);

export const GET_MLS_PROPERTIES_SEARCH = createRequestTypes(
  'GET_MLS_PROPERTIES_SEARCH',
);

export const GET_FAV_PROPERTIES_SEARCH = createRequestTypes(
  'GET_FAV_PROPERTIES_SEARCH',
);
// property actions end

// showings actions start
export const ADD_SHOWING = createRequestTypes('ADD_SHOWINGS');

export const GET_SHOWINGS = createRequestTypes('GET_SHOWINGS');

export const EDIT_SHOWING = createRequestTypes('EDIT_SHOWING');

export const DELETE_SHOWING = createRequestTypes('DELETE_SHOWING');
// showings actions end

// dashboard actions start
export const DASHBOARD_COUNT = createRequestTypes('DASHBOARD_COUNT');

export const MONTHLY_REVENUE = createRequestTypes('MONTHLY_REVENUE');

export const GET_GRAPH = createRequestTypes('GET_GRAPH');
// dashboard actions end

// settings actions start
export const GET_SETTING = createRequestTypes('GET_SETTING');

export const GET_FAQS = createRequestTypes('GET_FAQS');
// settings actions end

// Reports actions start
export const GET_REPORTS_SEARCH = createRequestTypes('GET_REPORTS_SEARCH');

export const DOWNLOAD_REPORTS = createRequestTypes('DOWNLOAD_REPORTS');
// Reports actions end

// Subscription actions start
export const GET_SUBSCRIPTION_DETAILS = createRequestTypes(
  'GET_SUBSCRIPTION_DETAILS',
);

export const CREATE_FREE_SUBSCRIPTION = createRequestTypes(
  'CREATE_FREE_SUBSCRIPTION',
);

export const CREATE_APPLE_SUBSCRIPTION = createRequestTypes(
  'CREATE_APPLE_SUBSCRIPTION',
);

export const CREATE_GOOGLE_SUBSCRIPTION = createRequestTypes(
  'CREATE_GOOGLE_SUBSCRIPTION',
);

export const CANCEL_SUBSCRIPTION = createRequestTypes('CANCEL_SUBSCRIPTION');
// Subscription actions end
//! beta work end
