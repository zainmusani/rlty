import {call, fork, put, take, takeLatest} from 'redux-saga/effects';
import {
  ADD_BUYER,
  ADD_NOTES,
  ADD_PROPERTY,
  ADD_SELLER,
  ADD_SELLER_EDIT,
  DELETE_BUYER,
  DELETE_NOTE,
  DELETE_PROPERTY,
  DELETE_SELLER,
  EDIT_NOTE,
  EDIT_PROPERTY,
  GET_BUYER_LIST,
  GET_FAVOURITE_PROPERTIES,
  GET_FAV_PROPERTIES_SEARCH,
  GET_MLS_PROPERTIES_SEARCH,
  GET_PROPERTIES,
  GET_PROPERTIES_SEARCH,
  GET_PROPERTY_BY_ID,
  GET_SELLER_LIST,
  MARK_PROPERTY_FAVOURITE,
  SOLD_PROPERTY,
  UPDATE_BUYER,
} from '../actions/ActionTypes';
import {
  addBuyerSuccess,
  addNotesSuccess,
  addPropertySuccess,
  addSellerEditSuccess,
  addSellerSuccess,
  deleteBuyerSuccess,
  deleteNoteSuccess,
  deletePropertySuccess,
  deleteSellerSuccess,
  editNoteSuccess,
  editPropertySuccess,
  getBuyerListSuccess,
  getFavouritePropertiesSuccess,
  getFavPropertiesSearchSuccess,
  getMlsPropertiesSearchSuccess,
  getPropertiesSearchSuccess,
  getPropertiesSuccess,
  getPropertyByIdSuccess,
  getSellerListSuccess,
  markPropertyFavouriteFailure,
  markPropertyFavouriteSuccess,
  soldPropertySuccess,
  updateBuyerSuccess,
} from '../actions/propertyActions';
import {
  callRequest,
  ADD_PROPERTY as ADD_PROPERTY_URL,
  ADD_SELLER_EDIT as ADD_SELLER_EDIT_URL,
  ADD_NOTES as ADD_NOTES_URL,
  EDIT_NOTE as EDIT_NOTE_URL,
  DELETE_NOTE as DELETE_NOTE_URL,
  GET_PROPERTIES as GET_PROPERTIES_URL,
  MARK_PROPERTY_FAVOURITE as MARK_PROPERTY_FAVOURITE_URL,
  GET_PROPERTY_BY_ID as GET_PROPERTY_BY_ID_URL,
  ADD_SELLER as ADD_SELLER_URL,
  EDIT_PROPERTY as EDIT_PROPERTY_URL,
  DELETE_PROPERTY as DELETE_PROPERTY_URL,
  GET_FAVOURITE_PROPERTIES as GET_FAVOURITE_PROPERTIES_URL,
  ADD_BUYER as ADD_BUYER_URL,
  UPDATE_BUYER as UPDATE_BUYER_URL,
  DELETE_BUYER as DELETE_BUYER_URL,
  SOLD_PROPERTY as SOLD_PROPERTY_URL,
  GET_BUYER_LIST as GET_BUYER_LIST_URL,
  GET_SELLER_LIST as GET_SELLER_LIST_URL,
  GET_PROPERTIES_SEARCH as GET_PROPERTIES_SEARCH_URL,
  GET_MLS_PROPERTIES_SEARCH as GET_MLS_PROPERTIES_SEARCH_URL,
  GET_FAV_PROPERTIES_SEARCH as GET_FAV_PROPERTIES_SEARCH_URL,
  DELETE_SELLER as DELETE_SELLER_URL,
  BASE_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  manipulateFavPropertyListData,
  manipulateMlsPropertyListData,
  manipulateMyPropertyListData,
  manipulatePropertyBuyerListData,
  manipulatePropertySellerListData,
} from '../helpers/PropertyHelper';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addProperty() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_PROPERTY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_PROPERTY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addPropertySuccess(response.data));
        if (responseCallback) responseCallback(response.status, response.data);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* editNote() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_NOTE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_NOTE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editNoteSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* deleteNote() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_NOTE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_NOTE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteNoteSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* addNotes() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_NOTES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_NOTES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addNotesSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* getProperties() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PROPERTIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROPERTIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPropertiesSuccess(manipulateMyPropertyListData(response.data)),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* getPropertiesSearch(action) {
  const {parameter, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_PROPERTIES_SEARCH_URL,
      '',
      parameter,
      {},
      ApiSauce,
    );
    if (response.status) {
      yield put(
        getPropertiesSearchSuccess(
          manipulateMyPropertyListData(response.data),
          parameter,
        ),
      );
      if (responseCallback) responseCallback(response.data);
    } else {
      if (responseCallback) responseCallback(false);
      alert(response.message);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err.message);
  }
}

function* getMlsPropertiesSearch(action) {
  const {parameter, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_MLS_PROPERTIES_SEARCH_URL,
      '',
      parameter,
      {},
      ApiSauce,
    );
    if (response.status) {
      yield put(
        getMlsPropertiesSearchSuccess(
          manipulateMlsPropertyListData(response.data),
          parameter,
        ),
      );
      if (responseCallback) responseCallback(response.data);
    } else {
      if (responseCallback) responseCallback(false);
      alert(response.message);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err.message);
  }
}

function* getFavPropertiesSearch(action) {
  const {parameter, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_FAV_PROPERTIES_SEARCH_URL,
      '',
      parameter,
      {},
      ApiSauce,
    );
    if (response.status) {
      yield put(
        getFavPropertiesSearchSuccess(
          manipulateFavPropertyListData(response.data),
          parameter,
        ),
      );
      if (responseCallback) responseCallback(response.data);
    } else {
      if (responseCallback) responseCallback(false);
      alert(response.message);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err.message);
  }
}

function* getPropertyById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      GET_PROPERTY_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_PROPERTY_BY_ID_URL,
        '',
        '',
        {},
        ApiSauce,
        BASE_URL,
        false,
        parameter,
      );
      if (response.status) {
        yield put(
          getPropertyByIdSuccess(manipulateMyPropertyListData(response.data)),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* editProperty() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_PROPERTY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_PROPERTY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editPropertySuccess(response.data, payload));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* deleteProperty() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_PROPERTY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_PROPERTY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deletePropertySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* markPropertyFavourite() {
  while (true) {
    const {payload, responseCallback} = yield take(
      MARK_PROPERTY_FAVOURITE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        MARK_PROPERTY_FAVOURITE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(markPropertyFavouriteSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(markPropertyFavouriteFailure(payload));
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      yield put(markPropertyFavouriteFailure(payload));
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* getFavouriteProperties() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_FAVOURITE_PROPERTIES.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_FAVOURITE_PROPERTIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getFavouritePropertiesSuccess(
            manipulateFavPropertyListData(response.data),
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* soldProperty() {
  while (true) {
    const {payload, responseCallback} = yield take(SOLD_PROPERTY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOLD_PROPERTY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(soldPropertySuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* addBuyer() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_BUYER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_BUYER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addBuyerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* updateBuyer() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_BUYER.REQUEST);
    console.log('updateBuyer --->>>>', payload);
    try {
      const response = yield call(
        callRequest,
        UPDATE_BUYER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateBuyerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* deleteBuyer() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_BUYER.REQUEST);
    console.log('deleteBuyer --->>>>', payload);
    try {
      const response = yield call(
        callRequest,
        DELETE_BUYER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteBuyerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* addSeller() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_SELLER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_SELLER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addSellerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* deleteSeller() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_SELLER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_SELLER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteSellerSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* addEditSeller() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_SELLER_EDIT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_SELLER_EDIT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addSellerEditSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}

function* getBuyerList(action) {
  const {parameter, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_BUYER_LIST_URL,
      '',
      parameter,
      {},
      ApiSauce,
    );
    if (response.status) {
      yield put(
        getBuyerListSuccess(
          manipulatePropertyBuyerListData(response.data),
          parameter,
        ),
      );
      if (responseCallback) responseCallback(response.data);
    } else {
      if (responseCallback) responseCallback(false);
      alert(response.message || SOMETHING_WRONG);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err.message);
  }
}

function* getSellerList(action) {
  const {parameter, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_SELLER_LIST_URL,
      '',
      parameter,
      {},
      ApiSauce,
    );
    if (response.status) {
      yield put(
        getSellerListSuccess(
          manipulatePropertySellerListData(response.data),
          parameter,
        ),
      );
      if (responseCallback) responseCallback(response.data);
    } else {
      if (responseCallback) responseCallback(false);
      alert(response.message || SOMETHING_WRONG);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alert(err.message);
  }
}

export default function* root() {
  yield fork(addProperty);
  yield fork(addNotes);
  yield fork(editNote);
  yield fork(deleteNote);
  yield fork(getProperties);
  yield fork(getPropertyById);
  yield fork(editProperty);
  yield fork(deleteProperty);
  yield fork(markPropertyFavourite);
  yield fork(getFavouriteProperties);
  yield fork(soldProperty);
  yield fork(addBuyer);
  yield fork(addSeller);
  yield fork(addEditSeller);
  yield fork(updateBuyer);
  yield fork(deleteBuyer);
  yield fork(deleteSeller);
  yield takeLatest(GET_PROPERTIES_SEARCH.REQUEST, getPropertiesSearch);
  yield takeLatest(GET_MLS_PROPERTIES_SEARCH.REQUEST, getMlsPropertiesSearch);
  yield takeLatest(GET_FAV_PROPERTIES_SEARCH.REQUEST, getFavPropertiesSearch);
  yield takeLatest(GET_BUYER_LIST.REQUEST, getBuyerList);
  yield takeLatest(GET_SELLER_LIST.REQUEST, getSellerList);
}
