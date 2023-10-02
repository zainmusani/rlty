import {fork} from "redux-saga/effects";
import init from "./init";
import user from "./user";
import property from "./property";
import showing from "./showing";
import dashboard from "./dashboard";
import general from "./general";
import settings from "./settings";
import reports from "./reports";
import subscription from "./subscription";

export default function* root() {
  yield fork(init);
  yield fork(user);
  yield fork(property);
  yield fork(showing);
  yield fork(dashboard);
  yield fork(general);
  yield fork(settings);
  yield fork(reports);
  yield fork(subscription);
}
