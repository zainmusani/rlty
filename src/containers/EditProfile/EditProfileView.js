import _ from 'lodash';
import React from 'react';
import {
  ActivityIndicator, Image as RnImage, Keyboard, ScrollView, TouchableOpacity, View
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Button, CircularImage, ContactInput, CustomNavbar, Loader, Text, TextInput
} from '../../components';
import {activeOpacity, USER_FIELDS_NAME} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import styles from './EditProfileStyles';

export default function EditProfileView(props) {
  const {
    user,
    loading,
    agencyName,
    agencyNameError,
    agencyRef,
    onAgencyChange,
    onAgencySubmit,
    bio,
    bioRef,
    onBioChange,
    preferences,
    onPreferencePress,
    locationRef,
    location,
    locationError,
    onLocationChange,
    onLocationSubmit,
    to,
    from,
    onTimerPress,
    onTimerModalSubmit,
    showTimerModal,
    onTimeModalCancel,
    update,
    setOpen,
    bsRef,
    onCamPress,
    onGalleryPress,
    timeError,
    spinnerLoading,
    profileImage,
    number,
    onNumberChange,
    numRef,
    numberError,
    bioError,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar title="Edit Profile" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      // enableOnAndroid={true}
      // keyboardShouldPersistTaps={'always'}
      >
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          {/* profile picture */}
          <View style={styles.profilePicParent}>
            <CircularImage
              placeholderStyle={styles.circularPlaceHolder}
              // placeholderSource={Images.user_ph}
              noShadow
              size={56}
              image={profileImage?.path}
            />
            <TouchableOpacity
              onPress={() => {
                if (!loading) setOpen(true);
              }}
              style={styles.camIconParent}>
              {!loading && (
                <RnImage source={Images.pencilIcon} style={styles.camIcon} />
              )}
              {loading && (
                <ActivityIndicator size="small" color={Colors.white} />
              )}
            </TouchableOpacity>
          </View>
          {/* user name */}
          <Text type="bold" size={Fonts.size.xviii} style={AppStyles.mLeft10}>
            {user[USER_FIELDS_NAME.NAME]}
          </Text>
        </View>
        {/* Form */}
        <View style={[AppStyles.mTop20, AppStyles.pBottom20]}>
          {/* Agency Name */}
          <TextInput
            autoFocus
            require
            ref={ref => {
              agencyRef(ref);
            }}
            label="Agency Name"
            type="name"
            placeholder="Andrew Estate Agency"
            value={agencyName}
            onChangeText={onAgencyChange}
            onSubmitEditing={onAgencySubmit}
            error={agencyNameError}
            returnKeyType="next"
          />
          {/* bio */}
          <TextInput
            label="Bio"
            type="bio"
            ref={ref => {
              bioRef(ref);
            }}
            placeholder="6595 Collier Rd, Florida 32092,"
            value={bio}
            error={bioError}
            multiline
            containerStyle={AppStyles.mTop20}
            onChangeText={onBioChange}
            returnKeyType="next"
          />

          {/* Preferences */}
          {/* <Text
            type="bold"
            color={Colors.text.secondary}
            style={[AppStyles.mTop20, AppStyles.mLeft5]}>
            Preferences
          </Text> */}
          {/* <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
            {preferences?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onPreferencePress(item.id);
                  }}
                  activeOpacity={activeOpacity.medium}
                  style={[
                    styles.preferencesItem,
                    index === 1 && {marginHorizontal: 6},
                    index === preferences?.length - 1 && {flex: 8},
                    item.selected && {backgroundColor: Colors.backgroundAccent},
                  ]}>
                  <Text color={item.selected ? 'white' : Colors.text.secondary}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View> */}

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
            onSubmitEditing={() => { }}
            // onSubmitEditing={onNumberSubmit}
            onClickFlag={true}
            containerStyle={AppStyles.mTop15}
            error={numberError}
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
            containerStyle={{...AppStyles.mTop20, ...AppStyles.mBottom20}}
            onChangeText={onLocationChange}
            onSubmitEditing={onLocationSubmit}
            error={locationError}
            returnKeyType="done"
          />
          {/* availability section */}
          <View style={[AppStyles.mTop20]}>
            <Text
              size={Fonts.size.xiv}
              type="semi_bold"
              style={AppStyles.mLeft5}
              color={Colors.text.secondary}>
              Please Mark Your Availability
            </Text>
            <View style={[AppStyles.mTop10, AppStyles.flexRow]}>
              {/* from view */}
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
                <RnImage source={Images.arrowDown} resizeMode="contain" />
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
                  style={AppStyles.flex}
                  color="#999999"
                  size={Fonts.size.xiv}>
                  To
                </Text>
                <Text type="bold" style={AppStyles.flex3}>
                  {to.format('hh:mm a')}
                </Text>
                <RnImage source={Images.arrowDown} resizeMode="contain" />
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
          {/* update button */}

          <View style={[AppStyles.flex, AppStyles.flexRow]}>
            <View style={AppStyles.flex} />
            <Button
              onPress={update}
              indicatorColor="white"
              textAlign="center"
              style={styles.updateButton}>
              Update
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={showTimerModal}
        mode="time"
        onCancel={onTimeModalCancel}
        onConfirm={onTimerModalSubmit}
      />
      <RBSheet
        ref={bsRef}
        height={Metrics.screenHeight / 3}
        openDuration={350}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View
          style={{
            flex: 1,
            width: Metrics.screenWidth,
          }}>
          <View
            style={{
              backgroundColor: '#D8DDE6',
              height: 4,
              width: 54,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
          <View
            style={[
              AppStyles.flexRow,
              AppStyles.paddingHorizontal30,
              AppStyles.mTop15,
              {alignItems: "center"}
            ]}>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.xvi}
              style={AppStyles.flex}
              onPress={() => setOpen(false)}>
              Cancel
            </Text>
            <Text
              size={Fonts.size.xviii}
              type="semi_bold"
              textAlign="center"
              style={AppStyles.flex2}>
              Select Option
            </Text>
            <View style={AppStyles.flex} />
          </View>
          {/* LIST */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={AppStyles.mTop15}>
            <TouchableOpacity
              onPress={onCamPress}
              activeOpacity={activeOpacity.medium}
              style={styles.camSheetItemParent}>
              <Text size={Fonts.size.xviii}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onGalleryPress}
              activeOpacity={activeOpacity.medium}
              style={styles.camSheetItemParent}>
              <Text size={Fonts.size.xviii}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpen(false)}
              activeOpacity={activeOpacity.medium}
              style={styles.camSheetItemParent}>
              <Text size={Fonts.size.xviii}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </RBSheet>
      <Loader loading={spinnerLoading} />
    </View>
  );
}
