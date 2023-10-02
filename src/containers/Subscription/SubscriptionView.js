import { confirmApplePayPayment, StripeProvider, useApplePay, useGooglePay, usePlatformPay } from '@stripe/stripe-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscriptionRequest, createAppleSubscriptionRequest, createFreeSubscriptionRequest, createGoogleSubscriptionRequest, getSubscriptionDetailsRequest } from "../../actions/SubscriptionActions";
import { userProfileRequest, userSignOutRequest } from '../../actions/UserActions';
import { Button, CustomNavbar, Loader, Text } from '../../components';
import { activeOpacity, merchant_id, stripeKeys, subscriptionTabs } from '../../constants';
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import util from '../../util';
import styles from './SubscriptionStyles';

export default function SubscriptionView(props) {
  const [selected, setSelected] = useState(() => 1);
  const [selectedTab, setSelectedTab] = useState(() => ({ id: 2, label: 'Monthly' }));
  const [loading, setLoading] = useState(false);
  const { fcmToken } = useSelector(state => state.general);
  const { freeConsumed, subscriptionId, isUserFillSubscriptionForm, subscriptionCanceled, subscriptionEndTime } = useSelector(state => state.user.userProfile);
  // const subscriptionEndTime = new Date();
  // const subscriptionCanceled = false;
  // const freeConsumed = false;
  // const subscriptionId = null;
  // const isUserFillSubscriptionForm = false;
  const details = useSelector(state => state.subscription.subscriptionDetails);
  const dispatch = useDispatch();
  const price = (selectedTab.id == 2 ? details?.month?.price : details?.year?.price) || 0;
  const subscriptionEndDate = util.convertUtcDateTimeIntoLocale(subscriptionEndTime, 'YYYY-MM-DD hh:mm a');
  const disabledPremPackage = subscriptionId == selectedTab.id;
  const userProfileRequestHandler = () => dispatch(userProfileRequest());
  const { initGooglePay, createGooglePayPaymentMethod } = useGooglePay();
  console.log({ initGooglePay });


  const googlePayInitialize = async () => {
    try {

      const { error } = await initGooglePay({
        testEnv: true,
        merchantName: 'myRlty',
        countryCode: 'US',
        billingAddressConfig: {
          format: 'FULL',
          isPhoneNumberRequired: true,
          isRequired: false,
        },
        existingPaymentMethodRequired: false,
        isEmailRequired: true,
      });
      if (error) return console.log(error.code, error.message);
    } catch (error) {
      console.log('~ googlePayInitialize error', error);
    }
  };

  useEffect(() => {
    util.isPlatformAndroid() && googlePayInitialize();

  }, []);

  useEffect(() => {
    setLoading(true);
    userProfileRequestHandler();
    dispatch(getSubscriptionDetailsRequest({}, res => setLoading(false)));
  }, []);

  const data = useMemo(() => [
    {
      title: "Free",
      price: details?.free?.price || 0,
      description: "Stream Live Matches View Scorecards",
      disabled: freeConsumed,
    },
    {
      title: "Premium Package",
      price,
      description: "Stream Live Matches View Scorecards Create and Manage Games Place Bets",
      disabled: disabledPremPackage,
    },
  ], [details, selectedTab.id, freeConsumed, disabledPremPackage]);

  const packagesTabs = subscriptionTabs.map(item => {
    const selected = item.id === selectedTab.id;
    return (
      <TouchableOpacity
        key={item.label}
        onPress={() => setSelectedTab(item)}
        style={[
          styles.selectedTab,
          !selected && styles.tabTransparent,
        ]}>
        <Text
          color={selected ? 'white' : Colors.text.primary}
          type={selected ? 'bold' : 'base'}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  });

  const packages = data.map((obj, i) => <SubscriptionPackage
    key={i}
    data={obj}
    selected={selected === i}
    disabled={obj.disabled}
    setSelected={() => setSelected(i)}
  />);

  const freeSubscriptionHandler = () => {
    setLoading(true);
    dispatch(createFreeSubscriptionRequest({ subscription_id: 1 }, (res) => {
      if (!res) return setLoading(false);
      setLoading(false);
      userProfileRequestHandler();
      Actions.reset('dashboard');
      util.topAlert('Trail period start.', 'success');
    }));
  };

  const appleSubscriptionHandler = (token) => {
    setLoading(true);
    const payload = { payment_method_id: token, subscription_id: selectedTab.id };
    dispatch(createAppleSubscriptionRequest(payload, async res => {
      if (!res.status) return setLoading(false);
      const clientSecret = res.data.client_secret;
      const { error: confirmError } = await confirmApplePayPayment(clientSecret);
      if (confirmError) return util.topAlert(confirmError);
      setLoading(false);
      util.topAlert('Successfully Subscribed.', 'success');
      userProfileRequestHandler();
      Actions.reset('dashboard');
    }));
  };

  const googleSubscriptionHandler = (token) => {
    setLoading(true);
    const payload = { payment_method_id: token, subscription_id: selectedTab.id };
    dispatch(createGoogleSubscriptionRequest(payload, res => {
      if (!res.status) return setLoading(true);
      setLoading(false);
      userProfileRequestHandler();
      util.topAlert('Successfully Subscribed.', 'success');
      Actions.reset('dashboard');
    }));
  };

  const createPaymentMethod = async () => {
    const { error, paymentMethod } = await createGooglePayPaymentMethod({ amount: price, currencyCode: 'USD' });
    if (error) return console.log(error.code, error.message);
    googleSubscriptionHandler(paymentMethod.id);
  };

  const cancelSubsCriptionHandler = () => {
    setLoading(true);
    dispatch(cancelSubscriptionRequest({}, res => {
      if (!res) return setLoading(false);
      setLoading(false);
      userProfileRequestHandler();
      util.topAlert('Subscription successfully canceled.', 'success');
      Actions.reset('dashboard');
    }));
  };

  const createAlert = (text, onPress, title = "Log Out") => util.createTwoButtonAlert(
    title,
    `Are you sure you want to ${text}?`,
    onPress
  );

  const logoutAlert = () => createAlert("Log out", () => {
    setLoading(true);
    dispatch(userSignOutRequest({ device_token: fcmToken, device_platform: Platform.OS }, res => {
      setLoading(false);
      if (!res) return;
      Actions.reset('login');
    }));
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <CustomNavbar title="Subscription" leftBtnPress={isUserFillSubscriptionForm ? () => Actions.pop() : logoutAlert} />
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Text
            color={Colors.text.primary}
            type="semi_bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            size={Fonts.size.xx}>
            Subscription Plans
          </Text>
          <Text
            textAlign="center"
            color={Colors.text.primary}
            type="semi_bold"
            numberOfLines={2}
            ellipsizeMode="tail"
            size={Fonts.size.xxSmall12}
            style={{ marginTop: 5 }}
          >
            {subscriptionCanceled ?
              `your subscription will remain till ${subscriptionEndDate}` :
              // true ? `updated price will be applied from ${subscriptionEndDate}` : 
              "Choose a plan that works best for you."}
          </Text>
        </View>
        <View style={styles.header}>
          {packagesTabs}
        </View>
        {packages}
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={AppStyles.flex} />

          {/* free subscription button */}
          {selected == 0 && <SubscriptionBtn
            onClick={freeSubscriptionHandler}
            text={"Subscribe"}
          />}

          {/* cancel subscription button */}
          {disabledPremPackage && <SubscriptionBtn
            disabled={subscriptionCanceled}
            onClick={() => createAlert("Cancel Subscription", cancelSubsCriptionHandler, 'Cancel Subscription')}
            text={subscriptionCanceled ? "Subscription Canceled" : "Cancel Subscription"}
          />}

          {/* create subscription button */}
          {!disabledPremPackage && !!selected && !(subscriptionId > 1) &&
            <StripeProvider
              publishableKey={stripeKeys.publishableKey}
              merchantIdentifier={merchant_id}>
              <ApplePayButton
                subscribe={appleSubscriptionHandler}
                price={price}
                label={selectedTab.label}
              />
              <GooglePayButton
                createPaymentMethod={createPaymentMethod}
              />
            </StripeProvider>}
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}

const ApplePayButton = ({ subscribe, price, label }) => {
  const request = {
    cartItems: [{ label: label, amount: (price).toString(), paymentType: 'Immediate' }],
    requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
    requiredBillingContactFields: ['phoneNumber', 'name'],
    country: 'US',
    currency: 'USD',
  };
  const { presentApplePay, isApplePaySupported } = useApplePay();
  if (!util.isPlatformIos() && !isApplePaySupported) return null;

  const pay = async () => {
    if (!isApplePaySupported) return util.topAlert('Apple Pay is not supported.');
    const { error, paymentMethod } = await presentApplePay(request);
    if (error) return console.log(error);;
    subscribe(paymentMethod.id);
  };

  return (<SubscriptionBtn onClick={pay} text={"Subscribe"} />);
};

const GooglePayButton = ({ createPaymentMethod }) => {
  if (!util.isPlatformAndroid()) return null;

  return (<SubscriptionBtn onClick={createPaymentMethod} text={"Subscribe"} />);
};

const SubscriptionBtn = (props) => {
  return (
    <Button
      {...props}
      indicatorColor="white"
      style={styles.loginButton}
      onPress={props.onClick}>
      {props.text}
    </Button>
  );
};

const SubscriptionPackage = ({ data, selected, setSelected, disabled }) => (
  <View>
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity.medium}
      style={[
        styles.boxContainer,
        !disabled && selected && styles.selected,
        disabled && styles.halfOpacity,
        selected ? styles.selectedBorder : styles.unselectedBorder
      ]}
      onPress={setSelected}>
      <View style={[AppStyles.flexRow, { justifyContent: "space-between", alignItems: "flex-start" }]}>
        <View style={[AppStyles.flexRow, AppStyles.centerInner]}>
          <View
            style={[,
              styles.radioButton,
              !selected && styles.radioButtonUnSelected,
              { backgroundColor: selected ? Colors.text.primary : "#fff", },
            ]}>
            {selected && (
              <Image source={Images.check} size={styles.radioImageStyle} />
            )}
          </View>
        </View>
        <View style={{ width: 200 }}>
          <Text size={Fonts.size.xSmall} type="bold">{data?.title}</Text>
          <Text
            color={Colors.text.primary}
            ellipsizeMode="tail"
            style={{ marginTop: 5 }}
            type="semi_bold"
            size={Fonts.size.xSmall}>
            {data?.description}
          </Text>
        </View>
        <View style={{ minWidth: 50, alignItems: "flex-end" }}>
          <Text color={Colors.text.primary}
            type="semi_bold"
            numberOfLines={1}
            ellipsizeMode="tail">{`$${data?.price}`}</Text>
        </View>
      </View>
    </TouchableOpacity >
  </View>
);
