import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Image as RnImage, ScrollView, TextInput, TouchableOpacity, View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Text} from '../../components';
import {FILTER_ITEMS} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './SearchBoxStyles';

export default function SearchBoxView(props) {
  const {
    isBuyerView,
    onChangeSearchText,
    searchText,
    setOpen,
    selectedValue,
    setSelectedValue,
    searchLoader,
    bsRef,
    isMlsView,
    isReportsView,
    setDatePickerVisibility,
    reportsFilterDate,
  } = props;
  return (
    <View style={styles.search}>
      <RnImage source={Images.search} style={styles.searchICon} />
      <TextInput
        onChangeText={searchText => onChangeSearchText(searchText)}
        placeholder="Search..."
        value={searchText}
        style={{flex: 3}}
        selectionColor={Colors.text.primary}
      />
      {searchLoader &&
        <ActivityIndicator style={{marginRight: 5}} color={Colors.accent} animating size="small" />
      }
      <Text
        style={[{marginBottom: 3}, searchLoader ? {} : {marginLeft: 25}]}
        color={Colors.accent}
        size={Fonts.size.xx}>
        |
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (isReportsView) {
            setDatePickerVisibility(true);
          } else {
            setOpen(true);
          }
        }}
        style={{
          flex: 2,
          zIndex: 900,
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          color={Colors.accent}
          size={Fonts.size.xiv}
          style={[AppStyles.mRight10, AppStyles.flex]}>
          {isReportsView ? reportsFilterDate.format('MMM, YYYY') :
            (selectedValue ? selectedValue.value : 'Select')
          }
        </Text>
        <RnImage source={Images.downArrowSmall} />
      </TouchableOpacity>
      <RBSheet
        ref={bsRef}
        height={Metrics.screenHeight / 2}
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
              Sort Properties
            </Text>
            <View style={AppStyles.flex} />
          </View>
          {/* LIST */}
          <ScrollView
            contentContainerStyle={[AppStyles.mTop20, AppStyles.pBottom20]}>
            {FILTER_ITEMS.map((item, index) => {
              let isSelected = selectedValue?.key === item?.key;
              if (item?.key?.toString().includes('sold') && isBuyerView) return false;
              if (item?.key?.toString().includes('sold') && isMlsView) return false;
              return (
                <TouchableOpacity
                  key={util.generateGuid()}
                  onPress={() => setSelectedValue(item)}
                  style={[
                    AppStyles.flexRow,
                    AppStyles.alignItemsCenter,
                    {marginVertical: 15, marginHorizontal: 30},
                  ]}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: Colors.text.primary,
                      marginRight: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {isSelected && (
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                          backgroundColor: '#3F8CFF',
                        }}
                      />
                    )}
                  </View>
                  <Text style={{marginBottom: 2}} size={Fonts.size.xvi}>{item?.value}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </View >
  );
}
