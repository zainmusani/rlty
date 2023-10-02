import React from 'react';
import { View, Image as RnImage, ScrollView } from 'react-native';
import { Text, Image, CustomNavbar } from '../../components';
import { AppStyles, Colors, Fonts } from '../../theme';
import styles from './ShowingsStyles';
export default function ShowingsView(props) {
  return (
    <View style={styles.container}>
      <CustomNavbar title={'Showings'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].map(
          () => {
            return (
              <View style={styles.showingParent}>
                <Text color="#7D8592">Dec 16, 2021 | 5:00 PM</Text>
                <Text
                  style={AppStyles.mTop10}
                  size={Fonts.size.xvi}
                  type="semi_bold">
                  Shawn Silva
                </Text>
                <Text color="#7D8592">
                  6595 Collier Rd, Florida 32092, United States
                </Text>
                <Text style={AppStyles.mTop10}>
                  This is dummy copy. It is not meant to be read. It has been
                  placed here solely to demonstrate the look and feel of
                  finished, typeset text. Only for show.
                </Text>
              </View>
            );
          },
        )}
      </ScrollView>
    </View>
  );
}
