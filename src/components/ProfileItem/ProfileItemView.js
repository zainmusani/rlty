import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Switch} from 'react-native';
import {Text, Image} from '../../components';
import {activeOpacity} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './ProfileItemStyles';
export default function ProfileItemView(props) {
  const {item, isEnabled, toggleSwitch} = props;
  const {label, icon, onPress} = item;
  isLine = label === 'line';
  if (isLine) {
    return <View style={styles.line} />;
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity.medium}
        style={styles.container}>
        {/* icon */}
        <View style={styles.iconParent}>
          <RnImage source={icon} />
        </View>
        <Text
          style={[AppStyles.mLeft10, AppStyles.flex]}
          size={Fonts.size.xvi}
          type="semi_bold">
          {label}
        </Text>
        {/* rightArrow */}
        {label !== 'Log Out' && label !== 'Push Notifications' && (
          <View>
            <RnImage source={Images.rightArrow} />
          </View>
        )}
        {label === 'Push Notifications' && (
          <Switch
            trackColor={{false: '#767577', true: '#03B74B'}}
            thumbColor={isEnabled ? Colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
      </TouchableOpacity>
    );
  }
}
