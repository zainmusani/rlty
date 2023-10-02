import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import moment from 'moment';
import {Platform} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {Actions} from 'react-native-router-flux';
import {
  deviceNotificationTokenSuccess,
  deviceTokenRequest,
  firebaseNotificationOpenRequest,
  getNotificationListRequest,
  notificationCountRequest,
} from '../actions/GeneralActions';

import {
  NOTIFICATIONS,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  NOTIFICATION_TYPES,
} from '../constants';
import DataHandler from '../services/DataHandler';
import util from '../util';
// import {manipulateNotification} from './notifications';

const LOG = false;

const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};
const updateDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();
  if (!!fcmToken) {
    console.log({fcmToken});
    DataHandler.getStore().dispatch(
      deviceNotificationTokenSuccess({
        device_token: fcmToken,
        device_platform: Platform.OS,
      }),
    );
  }

  if (!!fcmToken && DataHandler?.getStore()?.getState()?.user.data.id) {
    DataHandler.getStore().dispatch(
      deviceTokenRequest({
        device_token: fcmToken,
        device_platform: Platform.OS === 'android' ? 'android' : 'ios',
      }),
    );
  }

  return fcmToken;
};
const setChannelForAndroid = async () => {
  await Notifications.setNotificationChannel({
    channelId: 'NOTIFICATION_CHANNEL.id',
    name: 'NOTIFICATION_CHANNEL.name',
    importance: 5,
    description: 'NOTIFICATION_CHANNEL.name',
    enableLights: true,
    enableVibration: true,
    // lightColor: 'blue',
    // showBadge: false,
    // soundFile: 'default',
  });
};

const showLocalNotification = async data => {
  const {
    title,
    'google.c.a.c_l': title1,
    // 'gcm.notification.body': body,
    body,
    type,
    silent,
    notification_title,
    notification_images,
    notification_message,
    notification_time,
    id,
    notification_room_id,
    notification_flight_number,
    notification_trip_id,
    date,
    extra_data,
    notification_type,
  } = data;
  if (silent === 'true') {
    navigateOnNotificationTap(data);
    return true;
  } else {
    DataHandler.getStore().dispatch(
      getNotificationListRequest({offset: 0, limit: 15}),
    );
    DataHandler.getStore().dispatch(notificationCountRequest({}, res => {}));
    if (title?.includes?.('Price update')) {
      Notifications.postLocalNotification({
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId, sound: 'default', type},
        type,
        body,
      });
      return;
    }
    console.log({data});
    const someId = Math.floor(Math.random() * 10) + '';
    const showingData =
      extra_data ||
      `{"created_at":"2022-09-08T15:21:59.000Z","updated_at":"2022-09-08T11:48:04.000Z","id":1460,"name":"dummy","address":"R 505 sector 14/A shadman town,khi","date":"2022-09-08","start_time":"17:00:00","end_time":"16:45:00","description":"sdsdklfsd klsdlfs sd sffsdklfsd jsd klsdkl","property_id":0,"deleted_at":null,"user_id":1131}`;

    const time = obj => {
      console.log('objobjobjobjobjobjobjobjobj ->>>>>>> ', obj);
      const date1 = moment().format('YYYY-MM-DD');
      console.log('date1date1date1date1date1date1date1 ->>>>>>> ', date1);
      const time = moment
        .utc(date1 + ' ' + obj?.start_time)
        .local()
        .format('hh:mm A');
      console.log('timetimetimetimetimetimetimetimetime ->>>>>>> ', time);

      return time;
    };

    let noti_title = data.body;
    // if (notification_type === NOTIFICATION_TYPES.showing_notification) {
    //   noti_title = `You have a showing with ${
    //     JSON.parse(showingData).name
    //   } at ${time(JSON.parse(showingData))}`;
    // }
    Notifications.postLocalNotification({
      // ...data,
      title,
      sound: 'default',
      silent: false,
      data: {isLocal: true, id: someId, sound: 'default', type},
      type,
      body,
      extra_data:  data?.extra_data
    });
  }
};

const clearAllNotifications = () => {
  //firebase.notifications().removeAllDeliveredNotifications();
};

const navigateOnNotificationTap = data => {
  console.log('Notification tapped --->>>> ', data);
  let isPriceUpdateNot = data?.title?.includes?.('Price update');
  let isPeriodEndSeller =
    data?.notification_type === 'open_period_end_seller_notification';
  let isPeriodEndBuyer =
    data?.notification_type === 'open_period_end_buyer_notification';
  let isShowing = data?.notification_type === 'showings_notification';
  if (isPriceUpdateNot) return Actions.subscription();

  const showingDataJson =
    data.extra_data ||
    `{"created_at":"2022-09-08T15:21:59.000Z","updated_at":"2022-09-08T11:48:04.000Z","id":1460,"name":"Aspen Parsons","address":"R 505 sector 14/A shadman town,khi","date":"2022-09-08","start_time":"17:00:00","end_time":"16:45:00","description":"sdsdklfsd klsdlfs sd sffsdklfsd jsd klsdkl","property_id":0,"deleted_at":null,"user_id":1131}`;

  const showingData = JSON.parse(showingDataJson);

  isPeriodEndSeller && util.topAlert(data.body, 'succuss');
  isPeriodEndBuyer && util.topAlert(data.body, 'succuss');

  DataHandler.getStore().dispatch(
    firebaseNotificationOpenRequest(
      {
        showing_id: showingData?.notification_id,
      },
      res => {
        DataHandler.getStore().dispatch(
          getNotificationListRequest({offset: 0, limit: 15}),
        );
      },
    ),
  );

  Actions.showings({
    redirectDate: isShowing
      ? showingData.date
        ? moment(showingData.date, 'MMM DD, YYYY hh:mm A').format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD'),
  });
};

export {
  navigateOnNotificationTap,
  updateDeviceToken,
  getPermissions,
  showLocalNotification,
  setChannelForAndroid,
};
