// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_PROPERTIES,
  MARK_PROPERTY_FAVOURITE,
  DELETE_PROPERTY,
  GET_FAVOURITE_PROPERTIES,
  SOLD_PROPERTY,
  GET_SELLER_LIST,
  GET_BUYER_LIST,
  GET_PROPERTIES_SEARCH,
  GET_FAV_PROPERTIES_SEARCH,
  USER_SIGNOUT,
  ADD_BUYER,
  ADD_SELLER,
  ADD_NOTES,
  DELETE_NOTE,
  EDIT_NOTE,
  GET_MLS_PROPERTIES_SEARCH,
  EDIT_PROPERTY,
  GET_PROPERTY_BY_ID,
  UPDATE_BUYER,
  DELETE_BUYER,
  ADD_SELLER_EDIT,
  DELETE_SELLER,
} from '../actions/ActionTypes';
import {Images} from '../theme';
import util from '../util';
import {lorenIpsum, PROPERTY_TYPE_NAMES} from '../constants';
import moment from 'moment';
import {
  manipulatePropertyBuyerListData,
  manipulatePropertySellerListData,
} from '../helpers/PropertyHelper';

const initialState = Immutable({
  properties: [],
  mlsProperties: [],
  propertyById: [],
  favProperties: [],
  buyersList: [],
  sellersList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROPERTY_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        propertyById: action.data,
      });
    }
    case GET_PROPERTIES.SUCCESS: {
      return Immutable.merge(state, {
        properties: action.data,
      });
    }
    case GET_PROPERTIES_SEARCH.SUCCESS: {
      const list =
        action.parameter.offset === 0
          ? action.data
          : [...state.properties, ...action.data];
      return Immutable.merge(state, {
        properties: list,
      });
    }
    case GET_MLS_PROPERTIES_SEARCH.SUCCESS: {
      const list =
        action.parameter.offset === 0
          ? action.data
          : [...state.mlsProperties, ...action.data];
      return Immutable.merge(state, {
        mlsProperties: list,
      });
    }
    case GET_FAV_PROPERTIES_SEARCH.SUCCESS: {
      const list =
        action.parameter.offset === 0
          ? action.data
          : [...state.favProperties, ...action.data];
      return Immutable.merge(state, {
        favProperties: list,
      });
    }
    case GET_FAVOURITE_PROPERTIES.SUCCESS: {
      return Immutable.merge(state, {
        favProperties: action.data,
      });
    }
    case ADD_NOTES.SUCCESS: {
      const proTempList = _.cloneDeep(state.properties);
      const favProTempList = _.cloneDeep(state.favProperties);
      const indexOfProperty = _.findIndex(proTempList, {
        id: action?.data?.property_id,
      });
      const indexOfFavProperty = _.findIndex(favProTempList, {
        id: action?.data?.property_id,
      });
      if (indexOfProperty !== -1) {
        proTempList[indexOfProperty].notes.push({
          note: action?.data?.description,
          id: action?.data?.id,
          date: moment().format('MMM D, YYYY'),
        });
      }
      if (indexOfFavProperty !== -1) {
        favProTempList[indexOfFavProperty]?.notes.push({
          note: action?.data?.description,
          id: action?.data?.id,
          date: moment().format('MMM D, YYYY'),
        });
      }
      return Immutable.merge(state, {
        properties: proTempList,
        favProperties: favProTempList,
      });
    }
    case EDIT_NOTE.SUCCESS: {
      const proTempList = _.cloneDeep(state.properties);
      const favProTempList = _.cloneDeep(state.favProperties);
      const indexOfProperty = _.findIndex(proTempList, {
        id: action?.data?.property_id,
      });
      const indexOfFavProperty = _.findIndex(favProTempList, {
        id: action?.data?.property_id,
      });

      if (indexOfProperty !== -1) {
        proTempList[indexOfProperty].notes[
          proTempList[indexOfProperty].notes.findIndex(
            obj => obj.id === action?.data?.id,
          )
        ].note = action?.data?.description;
        proTempList[indexOfProperty].notes[
          proTempList[indexOfProperty].notes.findIndex(
            obj => obj.id === action?.data?.id,
          )
        ].date = moment().format('MMM D, YYYY | hh:mm A');
      }
      if (indexOfFavProperty !== -1) {
        favProTempList[indexOfFavProperty].notes[
          favProTempList[indexOfFavProperty].notes.findIndex(
            obj => obj.id === action?.data?.id,
          )
        ].note = action?.data?.description;
        favProTempList[indexOfFavProperty].notes[
          favProTempList[indexOfFavProperty].notes.findIndex(
            obj => obj.id === action?.data?.id,
          )
        ].date = moment().format('MMM D, YYYY | hh:mm A');
      }
      return Immutable.merge(state, {
        properties: proTempList,
        favProperties: favProTempList,
      });
    }
    case DELETE_NOTE.SUCCESS: {
      const proTempList = _.cloneDeep(state.properties);
      const favProTempList = _.cloneDeep(state.favProperties);
      const indexOfProperty = _.findIndex(proTempList, {
        id: action?.data?.property_id,
      });
      const indexOfFavProperty = _.findIndex(favProTempList, {
        id: action?.data?.property_id,
      });
      if (indexOfProperty !== -1) {
        proTempList[indexOfProperty].notes.splice(
          proTempList[indexOfProperty].notes.findIndex(
            obj => obj.id == action?.data?.id,
          ),
          1,
        );
      }
      if (indexOfFavProperty !== -1) {
        favProTempList[indexOfFavProperty]?.notes.splice(
          favProTempList[indexOfFavProperty].notes.findIndex(
            obj => obj.id == action?.data?.id,
          ),
          1,
        );
      }

      return Immutable.merge(state, {
        properties: proTempList,
        favProperties: favProTempList,
      });
    }
    case EDIT_PROPERTY.SUCCESS: {
      const tempList = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(tempList, {
        propertyId: action.payload.propertyId,
      });
      if (indexOfProperty === -1) return;
      tempList[indexOfProperty].type =
        PROPERTY_TYPE_NAMES[+action.payload.propertyType - 1];
      tempList[indexOfProperty].price = action.payload.propertyPrice;
      tempList[indexOfProperty].year = action.payload.propertyYear;
      tempList[indexOfProperty].title = action.payload.propertyTitle;
      tempList[indexOfProperty].address = action.payload.propertyAddress;
      tempList[indexOfProperty].squareFeet = action.payload.propertySquarefeet;
      tempList[indexOfProperty].description =
        action.payload.propertyDescription;
      tempList[indexOfProperty].area = action.payload.propertyArea;
      tempList[indexOfProperty].photos = action.payload.property_images;
      tempList[indexOfProperty].image = action.payload.property_images[0];

      return Immutable.merge(state, {
        properties: tempList,
      });
    }
    case MARK_PROPERTY_FAVOURITE.REQUEST: {
      const tempList = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(tempList, {
        propertyId: action.payload.property_id,
      });
      if (indexOfProperty !== -1) {
        tempList[indexOfProperty].isFav = !tempList[indexOfProperty].isFav;
      }

      return Immutable.merge(state, {
        properties: tempList,
      });
    }
    case MARK_PROPERTY_FAVOURITE.FAILURE: {
      const tempList = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(tempList, {
        propertyId: action.data.property_id,
      });
      if (indexOfProperty !== -1) {
        tempList[indexOfProperty].isFavourite =
          !tempList[indexOfProperty].isFavourite;
      }
      return Immutable.merge(state, {
        properties: tempList,
      });
    }
    case MARK_PROPERTY_FAVOURITE.SUCCESS: {
      const favPropertiesClone = _.cloneDeep(state.favProperties);
      const indexOfProperty = _.findIndex(favPropertiesClone, {
        propertyId: action.data.property_id,
      });
      if (indexOfProperty !== -1) {
        favPropertiesClone?.splice(indexOfProperty, 1);
      }

      return Immutable.merge(state, {
        favProperties: favPropertiesClone,
      });
    }
    case ADD_SELLER.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.property_id,
      });
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isSellerAdded = true;
        propertiesClone[indexOfProperty].sellerDetail =
          manipulatePropertySellerListData([action.data])[0];
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
      });
    }

    case ADD_SELLER_EDIT.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const sellersList = _.cloneDeep(state.sellersList);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.property_id,
      });

      const indexOfSeller = sellersList?.findIndex(
        item => item?.id === action?.data?.id,
      );

      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isSellerAdded = true;
        propertiesClone[indexOfProperty].sellerDetail =
          manipulatePropertySellerListData([action.data])[0];
      }

      if (indexOfSeller !== -1) {
        sellersList[indexOfSeller] = manipulatePropertySellerListData([
          action.data,
        ])[0];
      }

      return Immutable.merge(state, {
        properties: propertiesClone,
        sellersList,
      });
    }
    case ADD_BUYER.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.property_id,
      });
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isBuyerAdded = true;
        propertiesClone[indexOfProperty].buyerDetail =
          manipulatePropertyBuyerListData([action.data])[0];
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
      });
    }
    case DELETE_BUYER.SUCCESS: {
      let propertiesClone = _.cloneDeep(state.properties);
      let buyerClone = _.cloneDeep(state.buyersList);

      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.id,
      });

      buyerClone = buyerClone?.filter(item => item?.id !== action?.data?.id);
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isBuyerAdded = false;
        propertiesClone[indexOfProperty].buyerDetail = {};
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
        buyersList: buyerClone,
      });
    }

    case DELETE_SELLER.SUCCESS: {
      let propertiesClone = _.cloneDeep(state.properties);
      let sellerClone = _.cloneDeep(state.sellersList);

      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.id,
      });

      sellerClone = sellerClone?.filter(item => item?.id !== action?.data?.id);
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isSellerAdded = false;
        propertiesClone[indexOfProperty].sellerDetail = {};
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
        sellersList: sellerClone,
      });
    }

    case UPDATE_BUYER.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const buyersList = _.cloneDeep(state.buyersList);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.property_id,
      });

      const indexOfBuyer = buyersList?.findIndex(
        item => item?.id === action?.data?.id,
      );
      //  _.findIndex(buyersList, {
      //   id: action.data.id,
      // });
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].isBuyerAdded = true;
        propertiesClone[indexOfProperty].buyerDetail =
          manipulatePropertyBuyerListData([action.data])[0];
      }

      if (indexOfBuyer !== -1) {
        buyersList[indexOfBuyer] = manipulatePropertyBuyerListData([
          action.data,
        ])[0];
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
        buyersList,
      });
    }
    case SOLD_PROPERTY.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data[0].property_id,
      });
      if (indexOfProperty !== -1) {
        propertiesClone[indexOfProperty].saleType = 'sold';
      }
      return Immutable.merge(state, {
        properties: propertiesClone,
      });
    }
    case GET_SELLER_LIST.SUCCESS: {
      const list =
        action.parameter.offset === 0
          ? action.data
          : [...state.sellersList, ...action.data];
      return Immutable.merge(state, {
        sellersList: list,
      });
    }
    case GET_BUYER_LIST.SUCCESS: {
      const list =
        action.parameter.offset === 0
          ? action.data
          : [...state.buyersList, ...action.data];
      return Immutable.merge(state, {
        buyersList: list,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case DELETE_PROPERTY.SUCCESS: {
      const propertiesClone = _.cloneDeep(state.properties);
      const indexOfProperty = _.findIndex(propertiesClone, {
        propertyId: action.data.property_id,
      });

      if (indexOfProperty !== -1) {
        propertiesClone?.splice(indexOfProperty, 1);
      }

      return Immutable.merge(state, {
        properties: propertiesClone,
      });
    }
    default:
      return state;
  }
};
