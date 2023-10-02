import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Share} from 'react-native';
import {Text, Imagel, CustomNavbar, CircularImage, Loader} from '../../components';
import {Images, AppStyles, Fonts, Colors} from '../../theme';
import styles from './ProfileDetailStyles';
import {activeOpacity, USER_FIELDS_NAME} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {useMemo} from 'react';
export default function ProfileDetailView(props) {
  const profile = props?.profile;

  const VIEW_PROFILE_ITEMS = useMemo(() => [
    {
      label: 'Agency',
      data: profile?.agency,
      icon: Images.agencyIcon,
    },
    {
      label: 'Availability',
      data: profile?.availability,
      icon: Images.time,
    },
    {
      label: 'Email',
      data: profile?.email,
      icon: Images.emailIcon,
    },
    {
      label: 'Contact No,',
      data: profile?.contactNo,
      icon: Images.contact,
    },
  ], [profile]);


  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Agent Name: ${profile?.agentName}  \nLocation: ${profile?.location} \nAgency: ${profile?.agency} \nAvailability: ${profile?.availability} \nEmail: ${profile?.email} \nContact No: ${profile?.contactNo} \nDescription: ${profile?.description}`,
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <View style={styles.container}>
      <CustomNavbar hasBack title="Agent Profile" />

      <View style={{paddingHorizontal: 20}}>
        <View style={styles.agentSection}>
          {/* profile picture */}
          <View style={styles.profilePicParent}>
            <CircularImage
              placeholderStyle={styles.circularPlaceHolder}
              placeholderSource={Images.user_ph}
              noShadow
              size={56}
              image={props?.userImage}
            />
          </View>
          {/* name section */}
          <View style={[AppStyles.mLeft10, AppStyles.flex]}>
            <Text type="bold" size={Fonts.size.xviii}>
              {profile?.agentName}
            </Text>
            <Text color={Colors.text.secondary} size={Fonts.size.xiii}>
              {profile?.location}
            </Text>
          </View>
          {/* arrow section  */}
          <TouchableOpacity
            activeOpacity={activeOpacity.medium}
            onPress={() => onShare()}
            style={[styles.iconBg, AppStyles.mRight10]}>
            <RnImage source={Images.share} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.editProfile({profile})}
            activeOpacity={activeOpacity.medium}
            style={styles.iconBg}>
            <RnImage source={Images.about} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text type="semi_bold" size={Fonts.size.xviii} style={AppStyles.mTop20}>
          Information
        </Text>
        <View>
          {VIEW_PROFILE_ITEMS.map(item => {
            return (
              <View
                key={util.generateGuid()}
                style={{flexDirection: 'row', marginTop: 15}}>
                <View style={styles.iconBg}>
                  <RnImage source={item.icon} style={[styles.icon]} />
                </View>
                <View style={[AppStyles.mTop5, AppStyles.mLeft10]}>
                  <Text
                    type="semi_bold"
                    size={Fonts.size.xiv}
                    color={Colors.text.secondary}>
                    {item.label}
                  </Text>
                  {/* {Array.isArray(user[item.data]) ? (
                    <Text size={Fonts.size.xiv}>
                      {user[item.data][0] + ' - ' + user[item.data][1]}
                    </Text>
                  ) : (
                    <Text size={Fonts.size.xiv}>{user[item.data]}</Text>
                  )} */}
                  <Text size={Fonts.size.xiv}>{item.data}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <Text type="semi_bold" size={Fonts.size.xviii} style={AppStyles.mTop20}>
          Bio
        </Text>
        <Text size={Fonts.size.xiv} color={Colors.text.secondary}>
          {profile?.description}
        </Text>
      </View>
      <Loader loading={props.loading} />
    </View>
  );
}
