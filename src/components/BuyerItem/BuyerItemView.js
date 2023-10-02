import React, { useEffect } from 'react';
import { View, Image as RnImage, TouchableOpacity } from 'react-native';
import { Text, Image } from '../../components';
import { AppStyles, Colors, Fonts } from '../../theme';
import styles from './BuyerItemStyles';
import { activeOpacity, defaultImage } from '../../constants';
import util from '../../util';
import { Actions } from 'react-native-router-flux';
import DropShadow from 'react-native-drop-shadow';
import { getPropertyByIdRequest } from '../../actions/propertyActions';
import { useDispatch } from 'react-redux';
Actions;

export default function BuyerSellerItemView(props) {
  const { item, disableBuyerLink, disableSellerLink, isBuyer } = props;
  const { name, amountOfContract, companyName, address, propertyId, image
    //  closingDate,type, title,
  } = item;
  const dispatch = useDispatch();
  console.log({ buyerItem: item, props });

  const getPropertyData = () => dispatch(getPropertyByIdRequest(propertyId));
  const redirectToDetail = () => Actions.buyerSellerDetails({ item: item, disableBuyerLink, disableSellerLink, isBuyer });

  return (
    <DropShadow
      style={{
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: Platform.OS === 'android' ? 0.1 : 0.4,
        shadowRadius: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          getPropertyData();
          redirectToDetail();
        }}
        activeOpacity={activeOpacity.medium}
        style={styles.container}>

        <View style={{ flexDirection: 'row' }}>

          {/* todo */}
          <RnImage style={{
            height: 84,
            width: 84,
            borderRadius: 10
          }}
            source={{ uri: image?.length > 0 ? image : defaultImage }} />


          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={{
              flexDirection: 'row',
              flex: 1, justifyContent: 'space-between',
            }}>
              <View style={{}}>
                <Text type="bold">{name}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color={Colors.text.secondary}>
                  {companyName}
                </Text>
              </View>
              <Text type="bold">{`$ ${util.numberWithCommas(amountOfContract)}`}</Text>
            </View>
            <View style={styles.line} />
            <View>
              {/* <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color={Colors.text.secondary}
            type="bold"
            size={Fonts.size.xii}>
            {address}
          </Text> */}
              {/* {`${type}  |  ${title}`} */}
              <Text
                style={AppStyles.mTop5}
                numberOfLines={1}
                ellipsizeMode="tail"
                size={Fonts.size.xii}
                color={Colors.accent}>
                {address}
              </Text>
              {/* {isSeller && (
            <Text
              type="bold"
              size={Fonts.size.xii}
              style={AppStyles.mTop5}
              color={Colors.text.secondary}>
              Closing Date :
              <Text
                size={Fonts.size.xii}
                color={Colors.text.secondary}>{`${closingDate}`}</Text>
            </Text>
          )} */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
}
