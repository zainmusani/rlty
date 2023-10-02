import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, ButtonView} from '../../components';
import styles from './TabbarStyles';
import {Fonts, Colors} from '../../theme';
export default function TabbarView(props) {
  const {tabData, selectedTab, onTabSelect} = props;
  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}>
        {tabData.map((element, index) => {
          let selected = selectedTab === index;

          return (
            <ButtonView
              key={index}
              style={styles.itemWrapper}
              onPress={() => {
                onTabSelect(index);
                element.onPress();
              }}>
              <View style={styles.btn1}>
                <RnImage
                  source={selected ? element.selectedImage : element.image}
                // style={element.name === "Favorite" ? {width: 24} : {}}
                />
              </View>
            </ButtonView>
          );
        })}
      </View>
    </View>
  );
}
