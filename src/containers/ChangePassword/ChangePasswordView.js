import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, CustomNavbar, Loader, TextInput} from '../../components';
import {AppStyles} from '../../theme';
import styles from './ChangePasswordStyles';
export default function ChangePasswordView(props) {
  const {
    oldPassword,
    oldPasswordError,
    newPassword,
    newPasswordError,
    onOldPasswordChange,
    oldPasswordSubmit,
    confirmPassword,
    confirmPasswordError,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSubmitPress,
    cnfPasRef,
    newPasRef,
    newPasswordSubmit,
    loading
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar title="Change Password" />
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        // enableOnAndroid={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentInner}>
          {/* Form */}
          <View>
            <TextInput
              require
              label="Old Password"
              type="password"
              placeholder="OldPassword"
              value={oldPassword}
              onChangeText={onOldPasswordChange}
              onSubmitEditing={oldPasswordSubmit}
              error={oldPasswordError}
              returnKeyType="next"
            />
            <TextInput
              ref={ref => {
                newPasRef(ref);
              }}
              require
              label="New Password"
              type="password"
              placeholder="Password"
              value={newPassword}
              containerStyle={AppStyles.mTop15}
              onChangeText={onNewPasswordChange}
              onSubmitEditing={newPasswordSubmit}
              error={newPasswordError}
              returnKeyType="next"
            />
            <TextInput
              ref={ref => {
                cnfPasRef(ref);
              }}
              require
              label="Confirm New Password"
              type="password"
              containerStyle={AppStyles.mTop15}
              placeholder="Password"
              value={confirmPassword}
              onChangeText={onConfirmPasswordChange}
              onSubmitEditing={onSubmitPress}
              error={confirmPasswordError}
              returnKeyType="done"
            />
          </View>

          {/* Login Button */}
          <View style={[AppStyles.flex, AppStyles.flexRow]}>
            <View style={AppStyles.flex} />
            <Button
              indicatorColor="white"
              style={styles.loginButton}
              onPress={onSubmitPress}>
              Update
            </Button>
          </View>

          {/* SignUpBlock */}
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
