import _ from 'lodash';
import Util from '../util';
import qs from 'qs';

// export const BASE_URL = "https://befa-110-39-172-42.ngrok.io/";
export const BASE_URL = 'https://dev.myrlty.com/';
// export const BASE_URL = "https://prod.myrlty.com/";

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

const authVersion = 'v1';
const apiVersion = 'v1';
const preFixAuth = `auth/${authVersion}/`;
const preFixApi = `api/${apiVersion}/`;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

// signup request start

export const SEND_OTP = {
  route: `${preFixAuth}send-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SIGNUP_OTP = {
  route: `${preFixAuth}confirm-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SIGNUP_STEP_THREE = {
  route: `${preFixApi}user/post-registration`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const USER_PROFILE = {
  route: `${preFixApi}user/user-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// signup request end

// login request start
export const USER_LOGIN = {
  route: `${preFixAuth}login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNOUT = {
  route: `${preFixAuth}logout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SOCIAL_LOGIN = {
  route: `${preFixAuth}social-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
// login request end

// forgot-password request start
export const FORGOT_PASSWORD = {
  route: `${preFixAuth}forget-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CONFIRM_OTP = {
  route: `${preFixAuth}forget-password/confirm-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: `${preFixAuth}forget-password/change-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
// forgot-password request end

// reset-password request start
export const RESET_PASSWORD = {
  route: `${preFixAuth}reset-password`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// reset-password request end

// edit-profile request start
export const EDIT_PROFILE = {
  route: `${preFixApi}user/edit-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// edit-profile request end

// property request start
export const ADD_PROPERTY = {
  route: `${preFixApi}user/add-property`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_NOTES = {
  route: `${preFixApi}user/add-notes`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const EDIT_NOTE = {
  route: `${preFixApi}user/edit-notes`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const DELETE_NOTE = {
  route: `${preFixApi}user/delete-notes`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const GET_PROPERTIES = {
  route: `${preFixApi}user/get-property`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_PROPERTY_BY_ID = {
  route: `${preFixApi}user/get-property`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const EDIT_PROPERTY = {
  route: `${preFixApi}user/edit-property`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_PROPERTY = {
  route: `${preFixApi}user/delete-property`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const MARK_PROPERTY_FAVOURITE = {
  route: `${preFixApi}user/mark-favourite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_FAVOURITE_PROPERTIES = {
  route: `${preFixApi}user/get-favourite-properties`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SOLD_PROPERTY = {
  route: `${preFixApi}user/is-sold`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ADD_BUYER = {
  route: `${preFixApi}user/add-buyer`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_BUYER = {
  route: `${preFixApi}user/update-buyer`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_BUYER = {
  route: `${preFixApi}user/delete-buyer`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const ADD_SELLER = {
  route: `${preFixApi}user/add-seller`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_SELLER = {
  route: `${preFixApi}user/delete-seller`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const ADD_SELLER_EDIT = {
  route: `${preFixApi}user/update-seller`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_BUYER_LIST = {
  route: `${preFixApi}user/search-buyer`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_SELLER_LIST = {
  route: `${preFixApi}user/search-seller`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_PROPERTIES_SEARCH = {
  route: `${preFixApi}user/search-property`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_FAV_PROPERTIES_SEARCH = {
  route: `${preFixApi}user/search-favourite-property`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_MLS_PROPERTIES_SEARCH = {
  route: `${preFixApi}user/mls/get`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
// property request end

// showings request end
export const ADD_SHOWING = {
  route: `${preFixApi}user/showings`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_SHOWINGS = {
  route: `${preFixApi}user/showings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const EDIT_SHOWING = {
  route: `${preFixApi}user/showings`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const DELETE_SHOWING = {
  route: `${preFixApi}user/showings`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

// dashboard request end
export const DASHBOARD_COUNT = {
  route: `${preFixApi}user/count-property`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const MONTHLY_REVENUE = {
  route: `${preFixApi}user/monthly-revenue`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_GRAPH = {
  route: `${preFixApi}user/graph-api`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// dashboard request end

// settings request end
export const GET_SETTING = {
  route: `${preFixApi}user/get-setting`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_FAQS = {
  route: `${preFixApi}user/get-faqs`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// settings request end

// general request end
export const DEVICE_TOKEN = {
  route: `${preFixApi}device-token`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SEND_NOTIFICATION = {
  route: `${preFixApi}user/sendnotification`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ALLOW_NOTIFICATION = {
  route: `${preFixApi}allow-notification`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTIFICATION_LIST = {
  route: `${preFixApi}get-notification-list`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const NOTIFICATION_OPEN = {
  route: `${preFixApi}is-open`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const NOTIFICATION_COUNT = {
  route: `${preFixApi}is-open-count`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const FIREBASE_NOTIFICATION_OPEN = {
  route: `${preFixApi}is-notification-open`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
// general request end

// reports request start
export const GET_REPORTS_SEARCH = {
  route: `${preFixApi}report/get`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const DOWNLOAD_REPORTS = {
  route: `${preFixApi}report`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// reports request end

// Subscription request start
export const GET_SUBSCRIPTION_DETAILS = {
  route: `${preFixApi}subscription/get`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const CREATE_FREE_SUBSCRIPTION = {
  route: `${preFixApi}subscription/purchase`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CREATE_APPLE_SUBSCRIPTION = {
  route: `${preFixApi}subscription/apple-purchase`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CREATE_GOOGLE_SUBSCRIPTION = {
  route: `${preFixApi}subscription/google-purchase`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CANCEL_SUBSCRIPTION = {
  route: `${preFixApi}subscription/cancel`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// Subscription request end

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
  cacheBusting = false,
  pathParameter,
) {
  // different from regular gist

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  let _url;
  if (parameter && !_.isEmpty(parameter)) {
    _url = `${url.route}?${
      parameter instanceof Object ? qs.stringify(parameter) : parameter
    }`;
  } else if (pathParameter) {
    _url = `${url.route}/${pathParameter}`;
  } else {
    _url = url.route;
  }

  if (cacheBusting) _url += `?t${Date.now()}`;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
