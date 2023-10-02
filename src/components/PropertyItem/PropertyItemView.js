import React from 'react';
import { Image as RnImage, TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { addPropertyRequest } from '../../actions/propertyActions';
import { Text } from '../../components';
import {
  activeOpacity, defaultImage, PROPERTY_TYPE_NAMES,
  strings
} from '../../constants';
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import util from '../../util';
import styles from './PropertyItemStyles';

export default function PropertyItemView(props) {
  const {
    item,
    markPropertyFavouriteRequest,
    isFavouriteView,
    MslPropertiesView,
    setMlsLoading,
    buyerSellerView,
    disableOnPress,
    disableBuyerLink,
    disableSellerLink
  } = props;

  const {
    id,
    propertyId,
    image,
    type,
    saleType,
    title,
    address,
    price,
    isFav,
    squareFeet,
    isMlsProperty,
    isUserProperty,
    sold,
  } = item;


  const dispatch = useDispatch();

  const MlsCopyAndMarkFavHandler = (data, markFavAsWell) => {
    const {
      type,
      price,
      year,
      address,
      squareFeet,
      description,
      area,
      photos,
      latitude,
      longitude,
      title,
    } = data;
    const payload = {
      propertyType: PROPERTY_TYPE_NAMES.findIndex(a => a === type) + 1,
      propertyAddress: address,
      propertyTitle: title,
      propertyDescription: description,
      propertyPrice: price,
      propertyArea: area,
      propertySquarefeet: squareFeet,
      propertyYear: year,
      property_images: photos,
      latitude,
      longitude,
    };
    setMlsLoading(true);
    dispatch(
      addPropertyRequest(payload, (res, data) => {
        if (!res) return setMlsLoading(false);
        setMlsLoading(false);
        if (markFavAsWell) {
          dispatch(
            markPropertyFavouriteRequest(
              { property_id: data.property_id },
              res => {
                if (!res) return;
                util.topAlert(
                  'Property Copied and added to Favourite',
                  'success',
                );
              },
            ),
          );
        }
        if (!markFavAsWell) {
          util.topAlert('Property Copied', 'success');
        }
      }),
    );
  };

  return (
    <DropShadow
      style={[!buyerSellerView && styles.dropShadowStyles]}>
      <TouchableOpacity
        onPress={() =>
          disableOnPress ? {} : Actions.propertyDetail({
            propertyId: id,
            isFavouriteView,
            MslPropertiesView,
            MlsCopyAndMarkFavHandler,
            propertyItem: buyerSellerView ? item : {},
            disableBuyerLink,
            disableSellerLink,
          })
        }
        activeOpacity={disableOnPress ? activeOpacity.off : activeOpacity.medium}
        style={[
          styles.container,
          !buyerSellerView && styles.containerOtherStyles,
          buyerSellerView && AppStyles.mBottom20
        ]}>
        <View style={styles.imageParent}>
          {!buyerSellerView && saleType === 'sold' && (
            <View style={styles.soldLabel}>
              <Text size={Fonts.size.xi} type="semi_bold" color="white">
                SOLD
              </Text>
            </View>
          )}
          {/* <Text>{image}</Text> */}
          <RnImage
            source={{ uri: image ?? defaultImage }}
            style={styles.imageStyle}
            resizeMode="stretch"
          />
        </View>
        <View style={[AppStyles.flexRow, AppStyles.flex]}>
          <View style={[AppStyles.mLeft10, AppStyles.flex8]}>
            <Text size={Fonts.size.xii} color={Colors.text.secondary}>
              {type + '  |  ' + saleType}
            </Text>
            <View style={AppStyles.mTop5}>
              <Text
                type="semi_bold"
                size={Fonts.size.xiii}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {title}
              </Text>
              <Text
                size={Fonts.size.xii}
                color={Colors.text.secondary}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {address}
              </Text>
            </View>
            <View style={[AppStyles.mTop10, AppStyles.flexRow]}>
              <View
                style={[
                  AppStyles.flexRow,
                  AppStyles.alignItemsCenter,
                  // AppStyles.mLeft10,
                ]}>
                <RnImage source={Images.area} />
                <Text
                  style={AppStyles.mLeft5}
                  size={Fonts.size.xii}
                  color={Colors.text.secondary}>
                  {squareFeet + ' sqft'}
                  {/* {util.numberWithCommas(area.toFixed(2)) + ' sqft'} */}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              AppStyles.flex7,
              AppStyles.alignItemsFlexEnd,
              AppStyles.spaceBetween,
            ]}>
            {buyerSellerView ? <View></View> : <TouchableOpacity
              style={styles.starParent}
              onPress={() => {
                if (isMlsProperty) {
                  MlsCopyAndMarkFavHandler(item, true);
                  return;
                }
                markPropertyFavouriteRequest({ property_id: propertyId }, res => {
                  if (res && isFavouriteView)
                    util.topAlert(
                      'Property removed from favourite list',
                      'success',
                    );
                });
              }}>
              <RnImage source={isFav ? Images.starFilled : Images.star} />
            </TouchableOpacity>}
            <View style={{ marginBottom: 2 }}>
              <Text
                type="semi_bold"
                size={Fonts.size.xiii}>{`$ ${util.numberWithCommas(
                  price,
                )}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
}
