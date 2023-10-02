// @flow

import {
  // beta work
  CHANGE_PASSWORD,
  CONFIRM_OTP,
  EDIT_PROFILE,
  FORGOT_PASSWORD,
  REFRESH_TOKEN, REMEMBER_CREDENTIAL,
  REMOVE_CREDENTIAL, RESET_PASSWORD, SEND_OTP, SIGNUP_OTP, SIGNUP_STEP_THREE, SOCIAL_LOGIN, USER_LOGIN, USER_PROFILE,
  USER_SIGNOUT
} from "./ActionTypes";

export function sendOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEND_OTP.REQUEST
  };
}

export function sendOtpSuccess(data) {
  return {
    data,
    type: SEND_OTP.SUCCESS
  };
}

export function signupOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SIGNUP_OTP.REQUEST
  };
}

export function signupOtpSuccess(data) {
  return {
    data,
    type: SIGNUP_OTP.SUCCESS
  };
}

export function signupStepThreeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SIGNUP_STEP_THREE.REQUEST
  };
}

export function signupStepThreeSuccess(data) {
  return {
    data,
    type: SIGNUP_STEP_THREE.SUCCESS
  };
}

export function userProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_PROFILE.REQUEST
  };
}

export function userProfileSuccess(data) {
  return {
    data,
    type: USER_PROFILE.SUCCESS
  };
}

// signup actions end

// login actions start
export function userLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_LOGIN.REQUEST
  };
}

export function userLoginSuccess(data) {
  return {
    data,
    type: USER_LOGIN.SUCCESS
  };
}

export function rememberCreDentialSuccess(data) {
  return {
    data,
    type: REMEMBER_CREDENTIAL.SUCCESS
  };
}

export function removeCreDentialSuccess(data) {
  return {
    data,
    type: REMOVE_CREDENTIAL.SUCCESS
  };
}

export function userSignOutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNOUT.REQUEST
  };
}

export function userSignOutSuccess(data) {
  return {
    data,
    type: USER_SIGNOUT.SUCCESS
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN.SUCCESS
  };
}


export function socialLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCIAL_LOGIN.REQUEST,
  };
}

export function socialLoginSuccess(data) {
  return {
    data,
    type: SOCIAL_LOGIN.SUCCESS,
  };
}
// login actions end

// forgot-password actions start
export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FORGOT_PASSWORD.REQUEST,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    data,
    type: FORGOT_PASSWORD.SUCCESS,
  };
}

export function confirmOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONFIRM_OTP.REQUEST
  };
}

export function confirmOtpSuccess(data) {
  return {
    data,
    type: CONFIRM_OTP.SUCCESS
  };
}

export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}

export function changePasswordSuccess(data) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}
// forgot-password actions end

// reset-password actions start
export function resetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESET_PASSWORD.REQUEST,
  };
}

export function resetPasswordSuccess(data) {
  return {
    data,
    type: RESET_PASSWORD.SUCCESS,
  };
}
// reset-password actions end

// profile actions start
export function editProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_PROFILE.REQUEST,
  };
}

export function editProfileSuccess(data) {
  return {
    data,
    type: EDIT_PROFILE.SUCCESS,
  };
}
// profile actions end