import React from 'react';
import {
  Image as RnImage, StatusBar, View
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {Button, Text} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './RegisterSuccessStyles';
export default function RegisterSuccessView(props) {
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
        keyboardShouldPersistTaps={'always'}
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
            <RnImage
              source={Images.start}
              resizeMode="cover"
              style={styles.mainImage}
            />
            <View style={AppStyles.mBottom50}>
              <View style={[AppStyles.mTop20, AppStyles.alignSelfCenter]}>
                <Text color={Colors.text.primary} size={Fonts.size.xviii}>
                  You are successfully registered!
                </Text>
              </View>
              <View style={{paddingHorizontal: 80}}>
                <Button
                  indicatorColor="white"
                  style={styles.loginButton}
                  centerIcon
                  icon="arrowRightWhite"
                  onPress={() => {
                    if (!util.isUserFillSubscriptionForm()) Actions.reset('subscription');
                    else Actions.reset('dashboard');
                  }}>
                  Let's Start
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
