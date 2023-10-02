import React, {useState} from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import {Text, Image, CircularImage, ProfileItem, Loader, NotificationIcon} from '../../components';
import {USER_FIELDS_NAME} from '../../constants';
import {Images, Fonts, AppStyles, Colors} from '../../theme';
import styles from './ProfileStyles';
import {activeOpacity, PROFILE_SCREEN_DATA} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {userSignOutRequest} from '../../actions/UserActions';
import {getSettingsRequest, getFaqsRequest} from '../../actions/settingsActions';
import {useEffect} from 'react';
export default function ProfileView(props) {
  const {userImage, refresh, profile} = props;
  const {agentName: name} = profile;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.user);
  const {settings} = useSelector(state => state.settings);
  const {fcmToken} = useSelector(state => state.general);

  useEffect(() => {
    !settings.length && setLoading(true);
    dispatch(getSettingsRequest({}, res => setLoading(false)));
    dispatch(getFaqsRequest({}, res => setLoading(false)));
  }, [refresh]);

  const onPress = () => util.createTwoButtonAlert(
    "Log Out",
    "are you sure you want to log out?",
    () => {
      setLoading(true);
      dispatch(userSignOutRequest({token: data.access_token, device_token: fcmToken}, res => {
        setLoading(false);
        if (!res) return;
        Actions.reset('login');
      }));
    }
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text size={Fonts.size.xx} type="bold">
          Profile
        </Text>
        <NotificationIcon />
      </View>
      {/* agent profile section */}
      <View>
        <TouchableOpacity
          onPress={() => {
            Actions.profileDetail();
          }}
          activeOpacity={activeOpacity.medium}
          style={styles.agentSection}>
          {/* profile picture */}
          <View style={styles.profilePicParent}>
            <CircularImage
              placeholderStyle={styles.circularPlaceHolder}
              // placeholderSource={Images.user_ph}
              noShadow
              size={56}
              image={userImage}
            />
          </View>
          {/* name section */}
          <View style={[AppStyles.mLeft10, AppStyles.flex]}>
            <Text type="bold" size={Fonts.size.xviii}>
              {name}
            </Text>
            <Text color={Colors.text.secondary} size={Fonts.size.xiii}>
              View Profile
            </Text>
          </View>
          {/* arrow section  */}
          <View>
            <RnImage source={Images.rightArrow} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {[...PROFILE_SCREEN_DATA, {
          label: 'Log Out',
          icon: Images.logout,
          onPress,
        }].map(item => {
          return <ProfileItem item={item} key={util.generateGuid()} />;
        })}
      </ScrollView>
      <Loader loading={loading} disable />
    </View>
  );
}
