// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {DEVICE_NOTIFICATION_TOKEN, GET_NOTIFICATION_LIST, NOTIFICATION_COUNT, SET_SELECTED_TAB, USER_SIGNOUT} from '../actions/ActionTypes';
import moment from 'moment';

const initialState = Immutable({
  fcmToken: '',
  selectedTab: 0,
  notificationCount: 0,
  notificationList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TAB: {
      return Immutable.merge(state, {
        selectedTab: action.selectedTab,
      });
    }
    case NOTIFICATION_COUNT.SUCCESS: {
      return Immutable.merge(state, {
        notificationCount: action.data,
      });
    }
    case GET_NOTIFICATION_LIST.SUCCESS: {
      const list = (action.parameter.offset === 0) ? action.data : [...state.notificationList, ...action.data];
      return Immutable.merge(state, {
        notificationList: list,
      });
    }
    case DEVICE_NOTIFICATION_TOKEN.SUCCESS: {
      return Immutable.merge(state, {
        fcmToken: action.data.device_token,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
