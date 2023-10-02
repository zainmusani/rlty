import React from 'react';
import {
  Image as RnImage, StatusBar, View
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Loader, Text, TextInput} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './ResetPasswordStyles';
export default function ResetPasswordView(props) {
  const {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSubmitPress,
    cnfPasRef,
    newPasswordSubmit,
    loading
  } = props;
  return (
    <View style={AppStyles.flex}>
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
              Reset Password
            </Text>
            <Text
              type="semi_bold"
              size={Fonts.size.xiv}
              color={Colors.text.secondary}
              style={AppStyles.mTop25}>
              Please create a new password
            </Text>
            {/* Form */}
            <View style={AppStyles.mTop30}>
              <TextInput
                require
                label="New Password"
                type="password"
                placeholder="Password"
                value={newPassword}
                onChangeText={onNewPasswordChange}
                onSubmitEditing={newPasswordSubmit}
                error={newPasswordError}
                returnKeyType="next"
              />
              <TextInput
                require
                ref={ref => {
                  cnfPasRef(ref);
                }}
                label="Confirm New Password"
                type="password"
                containerStyle={AppStyles.mTop25}
                placeholder="Password"
                value={confirmPassword}
                onChangeText={onConfirmPasswordChange}
                onSubmitEditing={onSubmitPress}
                error={confirmPasswordError}
                returnKeyType="done"
              />
            </View>

            {/* Login Button */}
            <Button
              indicatorColor="white"
              style={styles.loginButton}
              centerIcon
              icon="arrowRightWhite"
              onPress={onSubmitPress}>
              Update
            </Button>
            {/* SignUpBlock */}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
