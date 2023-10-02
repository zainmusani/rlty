import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {Text, Image, CustomNavbar} from '../../components';
import {lorenIpsum} from '../../constants';
import {AppStyles} from '../../theme';
import styles from './AboutStyles';
import HtmlRender from '../../components/htmlRender';
import {useSelector} from 'react-redux';
export default function AboutView(props) {
  const {about_us} = useSelector(state => state.settings.settings[0]);
  return (
    <View style={styles.container}>
      <CustomNavbar title="About" />
      <ScrollView
        contentContainerStyle={AppStyles.padding20}
        showsVerticalScrollIndicator={false}>
        <HtmlRender source={{html: about_us}} />
      </ScrollView>
    </View>
  );
}
