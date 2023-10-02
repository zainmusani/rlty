import {call, fork, put, take} from 'redux-saga/effects';
import {
  CHANGE_PASSWORD, CONFIRM_OTP, EDIT_PROFILE, FORGOT_PASSWORD, RESET_PASSWORD, SEND_OTP, SIGNUP_OTP, SIGNUP_STEP_THREE, SOCIAL_LOGIN, USER_LOGIN, USER_PROFILE, USER_SIGNOUT
} from '../actions/ActionTypes';
import {
  confirmOtpSuccess, editProfileSuccess, forgotPasswordSuccess, resetPasswordSuccess, sendOtpSuccess, signupOtpSuccess, signupStepThreeSuccess, socialLoginSuccess, userLoginSuccess, userProfileSuccess, userSignOutSuccess,
} from '../actions/UserActions';
import {
  RESET_PASSWORD as RESET_PASSWORD_URL, SEND_OTP as SEND_OTP_URL, SIGNUP_STEP_THREE as SIGNUP_STEP_THREE_URL, SOCIAL_LOGIN as SOCIAL_LOGIN_URL, USER_LOGIN as USER_LOGIN_URL, USER_SIGNOUT as USER_SIGNOUT_URL,
  SIGNUP_OTP as SIGNUP_OTP_URL,
  USER_PROFILE as USER_PROFILE_URL,
  EDIT_PROFILE as EDIT_PROFILE_URL,
  FORGOT_PASSWORD as FORGOT_PASSWORD_URL,
  CONFIRM_OTP as CONFIRM_OTP_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  BASE_URL,
  callRequest,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {manipulateProfileData} from '../helpers/userHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error', position) {
  setTimeout(() => {
    Util.topAlert(message, type, position);
  }, SAGA_ALERT_TIMEOUT);
}

// signup saga start

function* sendOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(SEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(sendOtpSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}


function* signupOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(SIGNUP_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SIGNUP_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(signupOtpSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* signupStepThree() {
  while (true) {
    const {payload, responseCallback} = yield take(SIGNUP_STEP_THREE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SIGNUP_STEP_THREE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(signupStepThreeSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
// signup saga end

// login saga start
function* userLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userLoginSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message, 'error', 'bottom');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
function* userSignOut() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSignOutSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* userProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
        BASE_URL,
        true
      );
      if (response.status) {
        yield put(userProfileSuccess(manipulateProfileData(response.data)));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}


function* socialLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCIAL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCIAL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(socialLoginSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
// login saga end

// forgot-password saga start
function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(FORGOT_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(forgotPasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* confirmOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(CONFIRM_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(confirmOtpSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* changePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(confirmOtpSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
// forgot-password saga end

// reset-password saga start
function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(resetPasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
// reset-password saga end

// profile saga start
function* editProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editProfileSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}
// profile saga end

export default function* root() {
  yield fork(sendOtp);
  yield fork(signupOtp);
  yield fork(signupStepThree);
  yield fork(userLogin);
  yield fork(userSignOut);
  yield fork(userProfile);
  yield fork(socialLogin);
  yield fork(forgotPassword);
  yield fork(confirmOtp);
  yield fork(changePassword);
  yield fork(resetPassword);
  yield fork(editProfile);
}
