import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';
import React from 'react';
import {
  Image as RnImage,
  Keyboard,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {
  socialLoginRequest,
  userProfileRequest,
} from '../../actions/UserActions';
import {Button, Loader, Text, TextInput} from '../../components';
import {activeOpacity} from '../../constants';
import {appleSignIn} from '../../helpers/AppleLoginHelper';
import {FBLogin} from '../../helpers/FBLoginHelper';
import {GoogleLogin} from '../../helpers/googleLoginHelper';
import LinkedinLoginHelper from '../../helpers/LinkedinLoginHelper';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './LoginStyles';

export default function LoginView(props) {
  const {
    email,
    emailError,
    password,
    passwordError,
    remember,
    onPasswordChange,
    onEmailChange,
    onRememberChange,
    onEmailSubmit,
    signIn,
    loading,
    setLoading,
  } = props;

  const dispatch = useDispatch();

  const socialLoginHandler = payload => {
    Keyboard.dismiss();
    setLoading(true);
    dispatch(
      socialLoginRequest(payload, res => {
        if (!res) return setLoading(false);
        dispatch(
          userProfileRequest({}, res => {
            setLoading(false);
            if (!res?.agency_name) Actions.reset('register', {step: 3});
            else if (!res.is_checked) Actions.reset('subscription');
            else Actions.reset('dashboard');
          }),
        );
      }),
    );
  };

  const loginWithIOS = details => {
    const {data, token, token_type} = details;
    const {name, email} = data;
    const payload = {
      name,
      email,
      token,
      tokenType: token_type,
    };
    socialLoginHandler(payload);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background.secondary}
      />
      <KeyboardAwareScrollView
        style={[AppStyles.secondaryBackground]}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        // enableOnAndroid={true}
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.content}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <RnImage
            source={Images.logo}
            resizeMode="contain"
            style={styles.headerImage}
          />
          <View style={styles.contentInner}>
            <Text
              style={AppStyles.alignSelfCenter}
              type="bold"
              color={Colors.text.primary}
              size={Fonts.size.xviii}>
              Sign In to MyRlty
            </Text>
            {/* socail login section  */}
            <View style={styles.socialLoginContainer}>
              {/* facebook */}
              <TouchableOpacity
                onPress={() => FBLogin(socialLoginHandler)}
                activeOpacity={activeOpacity.medium}
                style={[styles.socialLoginItem, AppStyles.facebookBackground]}>
                <RnImage
                  source={Images.facebook_f}
                  resizeMode="contain"
                  style={styles.socialLoginItemImage}
                />
              </TouchableOpacity>
              {/* apple */}
              {Platform.OS == 'ios' && (
                <TouchableOpacity
                  onPress={() => appleSignIn(loginWithIOS)}
                  // onPress={() => Actions.reset('dashboard')}
                  activeOpacity={activeOpacity.medium}
                  style={styles.socialLoginItem}>
                  <RnImage
                    source={Images.apple_small}
                    resizeMode="contain"
                    style={styles.socialLoginItemImage}
                  />
                </TouchableOpacity>
              )}
              {/* <LinkedinLoginHelper socialLoginHandler={socialLoginHandler} /> */}
              <TouchableOpacity
                onPress={() => GoogleLogin(socialLoginHandler)}
                activeOpacity={activeOpacity.medium}
                style={styles.socialLoginItem}>
                <RnImage
                  source={Images.google_small}
                  resizeMode="contain"
                  style={styles.socialLoginItemImage}
                />
              </TouchableOpacity>
            </View>
            {/* or section */}
            <View style={styles.orParent}>
              <View style={styles.line} />
              <Text
                size={Fonts.size.xx}
                color={Colors.text.secondary}
                style={[AppStyles.paddingHorizontalBase, AppStyles.lHeight22]}>
                or
              </Text>
              <View style={styles.line} />
            </View>
            {/* Form */}
            <View style={AppStyles.mTop20}>
              {/* Email */}
              <TextInput
                require
                label="Email Address"
                type="email"
                // autoFocus
                error={emailError}
                placeholder="youremail@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={email => onEmailChange(email)}
                onSubmitEditing={() => onEmailSubmit()}
                returnKeyType="next"
              />
              {/* Password */}
              <TextInput
                require
                label="Password"
                type="password"
                error={passwordError}
                containerStyle={AppStyles.mTop15}
                ref={ref => {
                  props.passRef(ref);
                }}
                autoCapitalize="none"
                placeholder="Password"
                value={password}
                onChangeText={onPasswordChange}
                onSubmitEditing={() => signIn()}
                returnKeyType="done"
              />
            </View>
            {/* Forgot password Block */}
            <View style={styles.forgotParent}>
              <View style={[AppStyles.flexRow, AppStyles.centerInner]}>
                <CheckBox
                  value={remember}
                  onValueChange={newValue => onRememberChange(newValue)}
                  tintColors={{true: '#0D1D36'}}
                  boxType="square"
                  style={{height: 20, width: 20}}
                  onCheckColor={'white'}
                  onFillColor={'#0D1D36'}
                  onTintColor={'#0D1D36'}
                />
                <Text style={AppStyles.mLeft15}>Remember me</Text>
              </View>
              <TouchableOpacity
                activeOpacity={activeOpacity.medium}
                style={AppStyles.centerInner}>
                <Text
                  onPress={() => {
                    Actions.forgotPassword();
                  }}
                  color="#7D8593">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            {/* Login Button */}
            <Button
              backgroundColor={Colors.backgroundAccent}
              indicatorColor="white"
              style={styles.loginButton}
              centerIcon
              icon="arrowRightWhite"
              onPress={() => signIn()}>
              Sign In
            </Button>
            {/* SignUpBlock */}
            <View style={[AppStyles.mTop20, AppStyles.alignSelfCenter]}>
              <Text>
                Don’t have an account?
                <Text
                  onPress={() => {
                    Actions.register();
                  }}
                  type="semi_bold">
                  {' Sign Up now'}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </>
  );
}
