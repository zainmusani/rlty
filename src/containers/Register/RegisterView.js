import _ from 'lodash';
import React from 'react';
import {
  Image as RnImage,
  StatusBar,
  TouchableOpacity, View
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
import {
  Button, CodeInput, ContactInput, Loader, Text, TextInput
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import {activeOpacity} from './../../constants';
import styles from './RegisterStyles';

export default function RegisterView(props) {
  const {
    name,
    nameError,
    number,
    numberError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    onPasswordChange,
    onConfirmPasswordChange,
    onNameChange,
    step,
    propStep,
    nameRef,
    numRef,
    passRef,
    cnfPasRef,
    emailRef,
    agencyRef,
    locationRef,
    bioRef,
    onNumberChange,
    email,
    emailError,
    onEmailChange,
    changeStep,
    onTimerPress,
    showTimerModal,
    agencyName,
    agencyNameError,
    location,
    locationError,
    bio,
    bioError,
    onAgencyChange,
    onLocationChange,
    onBioChange,
    from,
    to,
    onTimerModalSubmit,
    onTimeModalCancel,
    onNameSubmit,
    onNumberSubmit,
    onEmailSubmit,
    onPassSubmit,
    onAgencySubmit,
    onLocationSubmit,
    onCodeSubmit,
    timeError,
    loading,
    nextStepHandler,
    onResendOtp,
    selected
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
            {/* heading part */}
            <>
              {!propStep && <Text
                color={Colors.text.secondary}
                style={AppStyles.alignSelfCenter}
                type="bold">
                {`STEP ${step}/3`}
              </Text>}
              <Text
                style={AppStyles.alignSelfCenter}
                type="bold"
                color={Colors.text.primary}
                size={Fonts.size.xviii}>
                {step === 1
                  ? 'Create an account'
                  : step === 2
                    ? 'OTP verification'
                    : 'Set your account'}
              </Text>
            </>

            {/* Form */}
            <View style={styles.formParent}>
              {/* step 1 info */}
              {step === 1 && (
                <>
                  {/*Full Name */}
                  <TextInput
                    require
                    label="Full Name"
                    type="name"
                    autoFocus
                    placeholder="James Oliver"
                    value={name}
                    ref={ref => {
                      nameRef(ref);
                    }}
                    onSubmitEditing={onNameSubmit}
                    onChangeText={name => onNameChange(util.capitalizeFirstLetter(name))}
                    error={nameError}
                    returnKeyType="next"
                  />
                  {/* Mobile Number */}
                  <ContactInput
                    require
                    returnKeyType="done"
                    keyboardType="phone-pad"
                    value={number !== 'invalid' ? number : ''}
                    onNumberChange={(num, ref) => {
                      onNumberChange(num, ref.isValidNumber());
                    }}
                    ref={ref => {
                      numRef(ref);
                    }}
                    onSubmitEditing={onNumberSubmit}
                    onClickFlag={true}
                    containerStyle={AppStyles.mTop15}
                    error={numberError}
                  />
                  {/* Email */}
                  <TextInput
                    require
                    label="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={AppStyles.mTop15}
                    placeholder="youremail@gmail.com"
                    value={email}
                    ref={ref => {
                      emailRef(ref);
                    }}
                    onChangeText={email => onEmailChange(email)}
                    onSubmitEditing={onEmailSubmit}
                    error={emailError}
                    returnKeyType="next"
                  />
                  {/* Password */}
                  <TextInput
                    require
                    label="Create Password"
                    type="password"
                    containerStyle={AppStyles.mTop15}
                    ref={ref => {
                      passRef(ref);
                    }}
                    placeholder="Password"
                    value={password}
                    autoCapitalize="none"
                    onChangeText={pass => onPasswordChange(pass)}
                    onSubmitEditing={onPassSubmit}
                    error={passwordError}
                    returnKeyType="done"
                  />
                  <TextInput
                    require
                    ref={ref => {
                      cnfPasRef(ref);
                    }}
                    label="Confirm Password"
                    type="password"
                    containerStyle={AppStyles.mTop15}
                    placeholder="Password"
                    value={confirmPassword}
                    onChangeText={pass => onConfirmPasswordChange(pass)}
                    onSubmitEditing={() => changeStep(true)}
                    error={confirmPasswordError}
                    returnKeyType="done"
                  />
                </>
              )}
              {/* step 2 OTP */}
              {step === 2 && (
                <>
                  <View style={AppStyles.paddingHorizontalBase}>
                    <Text
                      size={Fonts.size.xiv}
                      color={Colors.text.secondary}
                      style={{textAlign: "center"}}
                      type="semi_bold">
                      We've sent you a 4-digit code on your registered email
                      address
                    </Text>
                  </View>
                  <CodeInput codeSubmit={onCodeSubmit} onResend={onResendOtp} />
                </>
              )}
              {/* step 3 Set your account */}
              {step === 3 && (
                <>
                  {/* Agency Name */}
                  <TextInput
                    require
                    ref={ref => {
                      agencyRef(ref);
                    }}
                    label="Agency Name"
                    autoFocus
                    type="name"
                    placeholder="Andrew Estate Agency"
                    value={agencyName}
                    onChangeText={onAgencyChange}
                    onSubmitEditing={onAgencySubmit}
                    error={agencyNameError}
                    returnKeyType="next"
                  />
                  {/* Location */}
                  <TextInput
                    require
                    label="Location"
                    type="name"
                    ref={ref => {
                      locationRef(ref);
                    }}
                    placeholder="6595 Collier Rd, Florida 32092,"
                    value={location}
                    containerStyle={AppStyles.mTop20}
                    onChangeText={onLocationChange}
                    onSubmitEditing={onLocationSubmit}
                    error={locationError}
                    returnKeyType="next"
                  />
                  {/* availability section */}
                  <View style={[AppStyles.mTop20]}>
                    <Text
                      size={Fonts.size.xiv}
                      type="semi_bold"
                      color={Colors.text.secondary}>
                      Please Mark Your Availability
                    </Text>
                    {/* <View
                      style={[
                        AppStyles.flex,
                        AppStyles.mTop10,
                        AppStyles.flexRow,
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          onTimerPress('from');
                        }}
                        activeOpacity={activeOpacity.medium}
                        style={styles.timeFrom}>
                        <Text
                          style={[AppStyles.flex, {marginRight: 5}]}
                          color="#999999"
                          size={Fonts.size.xiv}>
                          From
                        </Text>
                        <Text type="bold" style={AppStyles.flex2}>
                          {from.format('hh:mm a')}
                        </Text>
                        <RnImage
                          source={Images.arrowDown}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <View style={{width: 10}} />
                      <TouchableOpacity
                        onPress={() => {
                          onTimerPress('to');
                        }}
                        activeOpacity={activeOpacity.medium}
                        style={styles.timeFrom}>
                        <Text
                          style={AppStyles.flex}
                          color="#999999"
                          size={Fonts.size.xiv}>
                          To
                        </Text>
                        <Text type="bold" style={AppStyles.flex3}>
                          {to.format('hh:mm a')}
                        </Text>
                        <RnImage
                          source={Images.arrowDown}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View> */}
                    <View
                      style={[
                        AppStyles.flex,
                        AppStyles.mTop10,
                        // AppStyles.flexRow,
                      ]}>
                      {/* from view */}
                      <TouchableOpacity
                        onPress={() => {
                          onTimerPress('from');
                        }}
                        activeOpacity={activeOpacity.medium}
                        style={[styles.timeFrom, {marginBottom: 10}]}>
                        <Text
                          // style={[AppStyles.flex]}
                          style={{flex: 1}}
                          color="#999999"
                          size={Fonts.size.xiv}>
                          From
                        </Text>
                        <Text type="bold"
                          style={{flex: 1.5}}
                        // style={AppStyles.flex2}
                        >
                          {from.format('hh:mm a')}
                        </Text>
                        <RnImage
                          source={Images.arrowDown}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <View style={{width: 10}} />
                      {/* to view */}
                      <TouchableOpacity
                        onPress={() => {
                          onTimerPress('to');
                        }}
                        activeOpacity={activeOpacity.medium}
                        style={styles.timeFrom}>
                        <Text
                          // style={AppStyles.flex}
                          style={{flex: 1}}
                          color="#999999"
                          size={Fonts.size.xiv}>
                          To
                        </Text>
                        <Text type="bold"
                          style={{flex: 1.5}}
                        // style={AppStyles.flex3}
                        >
                          {to.format('hh:mm a')}
                        </Text>
                        <RnImage
                          source={Images.arrowDown}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    {!_.isEmpty(timeError) && (
                      <View>
                        <Text
                          type="semi_bold"
                          size={Fonts.size.xii}
                          color={Colors.red}
                          style={[AppStyles.mTop5]}>
                          {timeError}
                        </Text>
                      </View>
                    )}
                  </View>

                  <TextInput
                    label="Bio"
                    type="bio"
                    ref={ref => {
                      bioRef(ref);
                    }}
                    placeholder="6595 Collier Rd, Florida 32092,"
                    value={bio}
                    multiline
                    containerStyle={AppStyles.mTop20}
                    onChangeText={onBioChange}
                    error={bioError}
                    returnKeyType="done"
                  />
                </>
              )}
            </View>
          </View>
          {/* next button  */}
          <View
            style={[
              AppStyles.mTop20,
              AppStyles.mBottom20,
              AppStyles.flex,
              AppStyles.flexRow,
              AppStyles.centerInner,
            ]}>
            <View style={AppStyles.flex}>
              {step > 1 ? (
                step === 3 ? null : (
                  <Text
                    onPress={() => changeStep(false)}
                    color={Colors.text.secondary}
                    type="semi_bold"
                    size={Fonts.size.xvi}>
                    Previous
                  </Text>
                )
              ) : (
                <Text
                  onPress={() => Actions.pop()}
                  color={Colors.text.secondary}
                  type="semi_bold"
                  size={Fonts.size.xvi}>
                  Go back
                </Text>
              )}
            </View>
            <Button
              onPress={() => nextStepHandler()}
              indicatorColor="white"
              iconRight
              textAlign="center"
              centerIcon={false}
              style={styles.nextButton}
              icon="arrowRightWhite">
              Next Step
            </Button>
            <DateTimePickerModal
              isVisible={showTimerModal}
              mode="time"
              onCancel={onTimeModalCancel}
              onConfirm={onTimerModalSubmit}
              date={selected === "from" ? new Date(from?.format()) : selected == null ? new Date() : new Date(to?.format())}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
