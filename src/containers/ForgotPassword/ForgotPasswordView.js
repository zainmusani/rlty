import React from 'react';
import {Image as RnImage, StatusBar, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  CodeInput,
  Text,
  TextInput,
  CustomNavbar,
  Loader,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './ForgotPasswordStyles';

export default function ForgotPasswordView(props) {
  const {
    email,
    emailError,
    onEmailChange,
    showOtp,
    onSubmitPress,
    onCodeSubmit,
    loading,
    onResendOtp
  } = props;
  return (
    <View style={AppStyles.flex}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background.secondary}
      />
      <CustomNavbar hasBorder={false} style={AppStyles.secondaryBackground} />
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
              {showOtp ? 'OTP verification' : 'Forgot Password'}
            </Text>
            <Text
              type="semi_bold"
              size={Fonts.size.xiv}
              color={Colors.text.secondary}
              style={{...AppStyles.mTop25, textAlign: 'center'}}>
              {showOtp
                ? "We've sent you a 4-digit code on your registered email address"
                : 'Enter the email address associated with your account to receive a 4-digit verification code.'}
            </Text>
            {/* Form */}
            <View style={AppStyles.mTop30}>
              {/* Email */}
              {showOtp ? (
                <CodeInput codeSubmit={onCodeSubmit} onResend={onResendOtp} />
              ) : (
                <TextInput
                  require
                  label="Email Address"
                  type="email"
                  autoFocus
                  keyboardType="email-address"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChangeText={onEmailChange}
                  onSubmitEditing={onSubmitPress}
                  autoCapitalize="none"
                  error={emailError}
                  returnKeyType="done"
                />
              )}
            </View>

            {/* Login Button */}
            <Button
              indicatorColor="white"
              style={styles.loginButton}
              centerIcon
              icon="arrowRightWhite"
              onPress={onSubmitPress}>
              {showOtp ? 'Verify' : ' Submit'}
            </Button>
            {/* SignUpBlock */}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
