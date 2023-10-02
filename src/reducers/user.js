// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  CONFIRM_OTP,
  CREATE_APPLE_SUBSCRIPTION,
  CREATE_FREE_SUBSCRIPTION,
  CREATE_GOOGLE_SUBSCRIPTION,
  REFRESH_TOKEN,
  REMEMBER_CREDENTIAL,
  REMOVE_CREDENTIAL,
  SIGNUP_OTP,
  SIGNUP_STEP_THREE,
  SOCIAL_LOGIN,
  USER_LOGIN,
  USER_PROFILE,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {lorenIpsum} from '../constants';

const initialState = Immutable({
  data: {},
  profileSections: [],
  credential: {},
  userProfile: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FREE_SUBSCRIPTION.SUCCESS: {
      return Immutable.merge(state, {
        userProfile: {...state.userProfile, isUserFillSubscriptionForm: true},
      });
    }
    case CREATE_APPLE_SUBSCRIPTION.SUCCESS: {
      return Immutable.merge(state, {
        userProfile: {...state.userProfile, isUserFillSubscriptionForm: true},
      });
    }
    case CREATE_GOOGLE_SUBSCRIPTION.SUCCESS: {
      return Immutable.merge(state, {
        userProfile: {...state.userProfile, isUserFillSubscriptionForm: true},
      });
    }
    case SIGNUP_STEP_THREE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, agency_name: 'third step is filled'},
      });
    }
    case USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        userProfile: action.data,
        data: {
          ...state.data,
          agency_name:
            (action?.data?.email && action?.data?.agency) ||
            'third step not filled',
        },
      });
    }
    case SIGNUP_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: {...action.data, agency_name: 'third step not filled'},
      });
    }
    case CONFIRM_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_LOGIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case SOCIAL_LOGIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case REMEMBER_CREDENTIAL.SUCCESS: {
      return Immutable.merge(state, {
        credential: action.data,
      });
    }
    case REMOVE_CREDENTIAL.SUCCESS: {
      return Immutable.merge(state, {
        credential: action.data,
      });
    }
    case REFRESH_TOKEN: {
      let newData = _.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        ...initialState,
        credential: state.credential,
      });
    }
    default:
      return state;
  }
};
