import moment from 'moment';
import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../components';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {activeOpacity, NOTIFICATION_TYPES} from '../../constants';
import styles from './NotificationItemStyles';
import {useDispatch} from 'react-redux';
import {
  getNotificationListRequest,
  notificationOpenRequest,
} from '../../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
export default function NotificationItemView({item, useProfile}) {
  let isPriceUpdateNot =
    item?.notification_type === 'price_update_notification';
  let isShowing = item?.notification_type === 'showings_notification';
  let isPeriodEndSeller =
    item?.notification_type === 'open_period_end_seller_notification';
  let isPeriodEndBuyer =
    item?.notification_type === 'open_period_end_buyer_notification';

  const img = useProfile?.image
    ? {uri: `${useProfile?.image}`}
    : Images.user_ph;
  const time = (formate = 'YYYY-MM-DD') => {
    return moment
      .utc(
        item?.showing_id?.date.replace(
          '00:00:00',
          item?.showing_id?.start_time,
        ),
      )
      .local()
      .format(formate);
  };

  const dispatch = useDispatch();
  console.log({item});

  let item_title = item?.title;
  if (item?.notification_type === NOTIFICATION_TYPES.showing_notification) {
    const date1 = moment(item?.showing_id?.date).format('YYYY-MM-DD');
    const time = moment
      .utc(date1 + ' ' + item?.showing_id?.start_time)
      .local()
      .format('hh:mm A');

    item_title = `You have a showing with ${item?.showing_id?.name} at ${time}`;
  }

  return (
    <>
      {isShowing && (
        <TouchableOpacity
          onPress={() => {
            Actions.showings({redirectDate: time()});
            dispatch(
              notificationOpenRequest({notification_id: item?.id}, res => {
                dispatch(getNotificationListRequest({offset: 0, limit: 15}));
              }),
            );
          }}
          activeOpacity={activeOpacity.medium}
          style={[styles.container, !item?.is_open && styles.containerUnread]}>
          <View style={styles.imageContainer}>
            <RnImage source={img} style={styles.image} />
          </View>
          <View style={{maxWidth: '90%'}}>
            <Text type="semi_bold" style={{width: Metrics.screenWidth - 90}}>
              {item_title}
            </Text>
            <Text color={Colors.accent} size={Fonts.size.xii}>
              {moment(item?.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {isPriceUpdateNot && (
        <TouchableOpacity
          onPress={() => {
            Actions.subscription();
            dispatch(
              notificationOpenRequest({notification_id: item?.id}, res => {
                dispatch(getNotificationListRequest({offset: 0, limit: 15}));
              }),
            );
          }}
          activeOpacity={activeOpacity.medium}
          style={[styles.container, !item?.is_open && styles.containerUnread]}>
          <View style={styles.imageContainer}>
            <RnImage source={img} style={styles.image} />
          </View>
          <View>
            <Text
              style={{width: Metrics.screenWidth - 90}}
              size={Fonts.size.xiv}>
              {isPriceUpdateNot && item.message}
            </Text>
            <Text type="semi_bold">{item?.title}</Text>
            <Text color={Colors.accent} size={Fonts.size.xii}>
              {moment(item?.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {isPeriodEndSeller && (
        <TouchableOpacity
          onPress={() => {
            if (!item.is_open) {
              util.topAlert(item.message, 'succuss');
            }

            Actions.showings({redirectDate: time()});
            dispatch(
              notificationOpenRequest({notification_id: item?.id}, res => {
                dispatch(getNotificationListRequest({offset: 0, limit: 15}));
              }),
            );
          }}
          activeOpacity={activeOpacity.medium}
          style={[styles.container, !item?.is_open && styles.containerUnread]}>
          <View style={styles.imageContainer}>
            <RnImage source={img} style={styles.image} />
          </View>
          <View>
            <Text
              style={{width: Metrics.screenWidth - 90}}
              size={Fonts.size.xiv}>
              {isPeriodEndSeller && item.message}
            </Text>
            <Text type="semi_bold">{item?.title}</Text>
            <Text color={Colors.accent} size={Fonts.size.xii}>
              {moment(item?.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {isPeriodEndBuyer && (
        <TouchableOpacity
          onPress={() => {
            if (!item.is_open) {
              util.topAlert(item.message, 'succuss');
            }
            Actions.showings({redirectDate: time()});
            dispatch(
              notificationOpenRequest({notification_id: item?.id}, res => {
                dispatch(getNotificationListRequest({offset: 0, limit: 15}));
              }),
            );
          }}
          activeOpacity={activeOpacity.medium}
          style={[styles.container, !item?.is_open && styles.containerUnread]}>
          <View style={styles.imageContainer}>
            <RnImage source={img} style={styles.image} />
          </View>
          <View>
            <Text
              style={{width: Metrics.screenWidth - 90}}
              size={Fonts.size.xiv}>
              {isPeriodEndBuyer && item.message}
            </Text>
            <Text type="semi_bold">{item?.title}</Text>
            <Text color={Colors.accent} size={Fonts.size.xii}>
              {moment(item?.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
