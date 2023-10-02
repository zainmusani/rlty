// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Stack, Scene, Router, Actions, Tabs } from 'react-native-router-flux';

import styles from './styles';
import { Colors } from '../theme';

import {
  Login,
  Welcome,
  Register,
  RegisterSuccess,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  MslProperties,
  Favorite,
  Profile,
  ProfileDetail,
  Notifications,
  Buyers,
  Sellers,
  BuyerSellerDetails,
  MyProperties,
  PropertyDetail,
  About,
  Information,
  EditProfile,
  ChangePassword,
  AddProperty,
  AddBuyerDetails,
  AddSellerDetails,
  ShowingCalendar,
  Showings,
  Notes,
  Reports,
  Subscription,
} from '../containers';
import { Tabbar } from '../components';
import { showAlert } from 'react-native-message-bar/MessageBarManager';

function onBackPress() {
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Tabs
      initial
      key="dashboard"
      swipeEnabled={false}
      tabBarComponent={() => <Tabbar />}
      hideNavBar>
      <Stack key="home_tab" title="Home tab" initial>
        <Scene key="home" component={Dashboard} hideNavBar />
        <Scene key="myProperties" component={MyProperties} hideNavBar />
      </Stack>
      <Stack key="msl_tab" title="Msl tab">
        <Scene key="msl" component={MslProperties} hideNavBar />
      </Stack>
      <Stack key="fav_tab" title="Favorite tab">
        <Scene key="fav" component={Favorite} hideNavBar />
      </Stack>
      <Stack key="profile_tab" title="Profile tab">
        <Scene key="profile" component={Profile} hideNavBar />
      </Stack>
    </Tabs>
    <Scene key="profileDetail" component={ProfileDetail} hideNavBar />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="registerSuccess" component={RegisterSuccess} hideNavBar />
    <Scene key="register" component={Register} hideNavBar />
    <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />
    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
    <Scene key="notifications" component={Notifications} hideNavBar />
    <Scene key="buyers" component={Buyers} hideNavBar />
    <Scene key="sellers" component={Sellers} hideNavBar />
    <Scene key="reports" component={Reports} hideNavBar />
    <Scene key="subscription" component={Subscription} hideNavBar />
    <Scene key="buyerSellerDetails" component={BuyerSellerDetails} hideNavBar />
    <Scene key="myPropertiesSecondStack" component={MyProperties} hideNavBar />
    <Scene key="propertyDetail" component={PropertyDetail} hideNavBar />
    <Scene key="about" component={About} hideNavBar />
    <Scene key="information" component={Information} hideNavBar />
    <Scene key="editProfile" component={EditProfile} hideNavBar />
    <Scene key="changePassword" component={ChangePassword} hideNavBar />
    <Scene key="addProperty" component={AddProperty} hideNavBar />
    <Scene key="addBuyerDetails" component={AddBuyerDetails} hideNavBar />
    <Scene key="addSellerDetails" component={AddSellerDetails} hideNavBar />
    <Scene key="showings" component={ShowingCalendar} hideNavBar />
    <Scene key="showingsList" component={Showings} hideNavBar />
    <Scene key="notes" component={Notes} hideNavBar />
    <Scene key="welcome" component={Welcome} hideNavBar initial />
  </Stack>,
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
