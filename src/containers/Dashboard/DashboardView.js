import React, {useEffect} from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  DateRangePicker,
  PropertyItem,
  Button,
  Loader,
  NotificationIcon,
} from '../../components';
import {Fonts, AppStyles, Images, Colors, Metrics} from '../../theme';
import {activeOpacity} from '../../constants';
import styles from './DashboardStyles';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import {Actions} from 'react-native-router-flux';
import {useMemo} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import _ from 'lodash';
import {setSelectedTab} from '../../actions/GeneralActions';
import {useDispatch} from 'react-redux';
import {Notifications} from 'react-native-notifications';

import {
  getPermissions,
  navigateOnNotificationTap,
  setChannelForAndroid,
  showLocalNotification,
  updateDeviceToken,
} from '../../helpers/firebaseHelper';

let notificationForeground = {};
export default function DashboardView(props) {
  const {
    userData,
    propertiesList,
    dashboardCount,
    graphData,
    monthlyRevenue: {curMonthRevenue, difference},
    loading,
    setLoading,
  } = props;
  const {name} = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    _fcmInit();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     Notifications.events().registerNotificationReceivedForeground().remove();
  //     Notifications.events()
  //       .registerRemoteNotificationsRegistrationFailed()
  //       .remove();
  //     Notifications.events().registerNotificationOpened().remove();
  //     Notifications.events().registerNotificationReceivedBackground().remove();
  //     Notifications.events().registerRemoteNotificationsRegistered().remove();

  //   };
  // }, [Notifications]);

  // const _fcmInit = async () => {
  //   // ------------- CHANNEL INIT --------------
  //   if (util.isPlatformAndroid()) setChannelForAndroid();

  //   // ------------- iOS Permission --------------
  //   if (!util.isPlatformAndroid()) getPermissions();

  //   // ------------- TOKEN INIT --------------
  //   updateDeviceToken();

  //   // Request permissions on iOS, refresh token on Android
  //   Notifications.registerRemoteNotifications();

  //   Notifications.getInitialNotification()
  //     .then(notification => {
  //       if (!_.isNil(notification)) {
  //         navigateOnNotificationTap(notification.payload);
  //       }
  //     })
  //     .catch(err => {
  //       console.error('getInitialNotifiation() failed', err);
  //     });

  //   Notifications.events().registerRemoteNotificationsRegistered(event => { });
  //   Notifications.events().registerRemoteNotificationsRegistrationFailed(
  //     event => {
  //       console.error({ event });
  //     },
  //   );

  //   this.registerNotificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
  //     (notification, completion) => {
  //       if (
  //         notification &&
  //         notification.payload &&
  //         notification.payload.data &&
  //         notification.payload.data.isLocal
  //       ) {
  //         // return;
  //       } else {

  //         notificationForeground = notification?.payload;
  //         console.log('notification.payload ', JSON.parse(notification.payload.extra_data));
  //         console.log('notification -> ', notification);

  //         showLocalNotification(notification.payload);
  //         // dispatch(notificationCountIncDec(1));
  //       }

  //       // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
  //       completion({ alert: true, sound: true, badge: false });
  //     },
  //   );

  //   this.registerNotificationOpened = Notifications.events().registerNotificationOpened(
  //     (notification, completion, action) => {
  //       if (
  //         notification &&
  //         notification.payload &&
  //         notification.payload.data &&
  //         notification.payload.data.isLocal
  //       ) {
  //         navigateOnNotificationTap(notificationForeground);
  //       } else {
  //         navigateOnNotificationTap(notification.payload);
  //       }

  //       completion({ alert: true, sound: true, badge: false });
  //     },
  //   );

  //   Notifications.events().registerNotificationReceivedBackground(
  //     (notification, completion) => {
  //       !util.isPlatformAndroid() && Notifications?.ios?.setBadgesCount(0);
  //       Notifications?.ios?.getBadgeCount(count =>
  //         Notifications?.ios?.setBadgeCount(count + 1),
  //       );
  //       // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
  //       completion({ alert: true, sound: true, badge: false });
  //     },
  //   );
  // };

  useEffect(() => {
    return () => {
      Notifications.events().registerNotificationReceivedForeground().remove();
      Notifications.events()
        .registerRemoteNotificationsRegistrationFailed()
        .remove();
      Notifications.events().registerNotificationOpened().remove();
      Notifications.events().registerNotificationReceivedBackground().remove();
      Notifications.events().registerRemoteNotificationsRegistered().remove();
    };
  }, [Notifications]);

  const _fcmInit = async () => {
    console.log('_fcmInit');
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    Notifications.getInitialNotification()
      .then(notification => {
        console.log({NOTIFICATIONs: notification});

        if (!_.isNil(notification)) {
          navigateOnNotificationTap(notification.payload);
        }
      })
      .catch(err => {
        console.error('getInitialNotifiation() failed', err);
      });

    Notifications.events().registerRemoteNotificationsRegistered(event => {});
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error({event});
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log({ReceivedForeground: notification});

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          notificationForeground = notification?.payload;
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification, action);

        navigateOnNotificationTap(notification.payload);
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);
        !util.isPlatformAndroid() && Notifications?.ios?.setBadgesCount(0);
        Notifications?.ios?.getBadgeCount(count =>
          Notifications?.ios?.setBadgeCount(count + 1),
        );
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  console.log({graphData});

  const barData = useMemo(
    () => [
      {
        value: graphData[0]?.seller ?? 0,
        label: 'Jan',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[0]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[1]?.seller ?? 0,
        label: 'Feb',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[1]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},

      {
        value: graphData[2]?.seller ?? 0,
        label: 'Mar',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[2]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[3]?.seller ?? 0,
        label: 'Apr',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[3]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[4]?.buyer ?? 0,
        label: 'May',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[4]?.seller ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[5]?.seller ?? 0,
        label: 'June',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[5]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[6]?.seller ?? 0,
        label: 'July',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[6]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[7]?.seller ?? 0,
        label: 'Aug',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[7]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[8]?.seller ?? 0,
        label: 'Sep',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[8]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[9]?.seller ?? 0,
        label: 'Oct',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[9]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[10]?.seller ?? 0,
        label: 'Nov',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[10]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
      {
        value: graphData[11]?.seller ?? 0,
        label: 'Dec',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: {color: 'gray'},
        frontColor: 'rgba(222, 230, 237, 1)',
      },
      {value: graphData[11]?.buyer ?? 0, frontColor: 'rgba(13, 29, 54, 1)'},
    ],
    [graphData],
  );

  const graphMaxValue = useMemo(
    () =>
      !!graphData?.length ? graphData?.map(a => a?.totalProperties) : [100],
    [graphData],
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0, 0.5, 0.8]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E4EEFF', '#EFF5FF', '#D6E6FF']}
        style={{
          height: getStatusBarHeight(),
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        //j  keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.parentScrollView}>
        <>
          <View style={styles.smallHeader}>
            <View style={AppStyles.flex}>
              <Text
                type="semi_bold"
                size={Fonts.size.xx}
                color={Colors.text.primary}>
                Hello,
                <Text
                  type="bold"
                  size={Fonts.size.xx}
                  color={Colors.text.primary}>
                  {` ${name}`}
                </Text>
              </Text>
            </View>
            <NotificationIcon />
          </View>
          <View style={styles.centerText}>
            <Text type="semi_bold" size={Fonts.size.xiv}>
              This Month Revenue
            </Text>

            <Text
              type="extra_bold"
              size={Fonts.size.xxiv}
              style={AppStyles.mTop10}>
              {'$ '}
              <Text type="extra_bold" size={Fonts.size.xxxvi}>
                {util.numberWithCommas(+curMonthRevenue) || 0}
              </Text>
              <Text type="extra_bold" size={Fonts.size.xxiv}>
                {` .00`}
              </Text>
            </Text>
            {difference == 0 ? (
              <Text
                color="#03B74B"
                type="bold"
                size={Fonts.size.xvi}
                style={AppStyles.mTop10}>
                <Text type="semi_bold" size={Fonts.size.xvi}>
                  there is no revenue{'\n'} for the last month
                </Text>
              </Text>
            ) : (
              <Text
                color="#03B74B"
                type="bold"
                size={Fonts.size.xvi}
                style={AppStyles.mTop10}>
                {`${difference || '+0% '}`}
                <Text type="semi_bold" size={Fonts.size.xvi}>
                  than last month
                </Text>
              </Text>
            )}
          </View>
          <View style={styles.headerImageContainer}>
            <RnImage
              source={Images.dashboardBackground}
              style={styles.headerImage}
            />
          </View>
          <View style={styles.propertiesBoxParentStyle}>
            <TouchableOpacity
              onPress={() => Actions.myProperties()}
              activeOpacity={activeOpacity.low}>
              <LinearGradient
                style={styles.propertiesBoxStyle}
                colors={Colors.homeGradientOne}>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  My
                </Text>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  Properties
                </Text>
                <Text
                  type="semi_bold"
                  color={Colors.text.white}
                  size={Fonts.size.xxxvi}>
                  {dashboardCount?.properties || 0}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Actions.jump('msl_tab');
                dispatch(setSelectedTab(1));
              }}
              activeOpacity={activeOpacity.low}>
              <LinearGradient
                style={styles.propertiesBoxStyle}
                colors={Colors.homeGradientTwo}>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  MLS
                </Text>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  Properties
                </Text>
                <Text
                  type="semi_bold"
                  color={Colors.text.white}
                  size={Fonts.size.xxxvi}>
                  {(dashboardCount?.mls > 999 ? 999 : dashboardCount?.mls) || 0}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.myProperties({
                  filter: {value: 'Sold Properties', key: 'sold'},
                })
              }
              activeOpacity={activeOpacity.low}>
              <LinearGradient
                style={styles.propertiesBoxStyle}
                colors={Colors.homeGradientThree}>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  Sold
                </Text>
                <Text color={Colors.text.white} size={Fonts.size.xv}>
                  Properties
                </Text>
                <Text
                  type="semi_bold"
                  color={Colors.text.white}
                  size={Fonts.size.xxxvi}>
                  {dashboardCount?.sold || 0}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.chartParent}>
            <View style={styles.titleParent}>
              <Text type="bold" size={Fonts.size.xvi} style={AppStyles.flex}>
                Buyers vs. Sellers
              </Text>
            </View>
            <BarChart
              data={barData}
              barWidth={10}
              spacing={50}
              barBorderRadius={4}
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{color: 'gray'}}
              noOfSections={3}
              maxValue={Math.max(...[graphMaxValue])}
              height={130}
              // stepHeight={37}
              stepValue={0}
            />
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.centerInner,
                AppStyles.mTop35,
              ]}>
              <View
                style={[
                  AppStyles.flexRow,
                  AppStyles.centerInner,
                  AppStyles.mRight10,
                ]}>
                <View style={styles.chartKeyItem} />
                <Text
                  color={Colors.text.secondary}
                  size={Fonts.size.xiii}
                  type="semi_bold">
                  Buyers
                </Text>
              </View>
              <View style={[AppStyles.flexRow, AppStyles.centerInner]}>
                <View
                  style={[
                    styles.chartKeyItem,
                    {backgroundColor: 'rgba(222, 230, 237, 1)'},
                  ]}
                />
                <Text
                  color={Colors.text.secondary}
                  size={Fonts.size.xiii}
                  type="semi_bold">
                  Sellers
                </Text>
              </View>

              <View />
            </View>
          </View>
          <View style={AppStyles.mTop15}>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.spaceBetween,
                AppStyles.mRight20,
                AppStyles.mLeft20,
              ]}>
              <Text type="bold" size={Fonts.size.xviii}>
                Recent Listings
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Actions.jump('msl_tab');
                  dispatch(setSelectedTab(1));
                }}
                style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                <Text
                  color={Colors.accent}
                  style={AppStyles.mRight5}
                  size={Fonts.size.xiv}>
                  View all
                </Text>
                <RnImage source={Images.rightArrow} />
              </TouchableOpacity>
            </View>
            {propertiesList.map((item, i) => {
              return (
                <PropertyItem
                  key={i}
                  item={item}
                  MslPropertiesView
                  setMlsLoading={setLoading}
                />
              );
            })}
          </View>
        </>
      </ScrollView>
      <Loader loading={loading} />
    </View>
  );
}
