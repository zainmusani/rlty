import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import general from './general';
import properties from './properties';
import showing from './showing';
import dashboard from './dashboard';
import settings from './settings';
import reports from './reports';
import subscription from './subscription';

export default combineReducers({
  route: navigator,
  user,
  general,
  properties,
  showing,
  dashboard,
  settings,
  reports,
  subscription,
});
