import React from 'react';
import {
  FlatList,
  Image as RnImage, TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  CustomNavbar,
  DatePicker,
  Image,
  Loader,
  Text,
  TextInput
} from '../../components';
import { activeOpacity, maximumCurrentDate, minimumHundredYear } from '../../constants';
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import styles from './AddPropertyStyles';

export default function AddPropertyView(props) {
  const {
    type,
    typeItemClick,
    addressRef,
    address,
    addressError,
    onAddressChange,
    onAddressSubmit,
    titleRef,
    title,
    titleError,
    onTitleChange,
    onTitleSubmit,
    descriptionRef,
    description,
    descriptionError,
    onDescriptionChange,
    onDescriptionSubmit,
    priceRef,
    price,
    priceError,
    onPriceChange,
    onPriceSubmit,
    squareRef,
    square,
    squareError,
    onSquareChange,
    onSquareSubmit,
    areaRef,
    area,
    areaError,
    onAreaChange,
    onAreaSubmit,
    propertyImages,
    onGalleryPress,
    removeImage,
    propertyOnPressHandler,
    date,
    onDateChange,
    imageError,
    loading,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        leftBtnImage={Images.close}
        hasBack={false}
        title={
          props.item ? 'Update Property for Sale' : 'Add Property for Sale'
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        alwaysBounceVertical={false}
        // enableOnAndroid={true}
        // keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <>
          <Text>Property Type & Location</Text>
          <View style={AppStyles.mTop20}>
            <Text
              style={AppStyles.mLeft10}
              color={Colors.text.secondary}
              type="bold">
              Type
              <Text color={Colors.red}>*</Text>
            </Text>
            <View style={styles.typeParent}>
              {type.map(item => (
                <TouchableOpacity
                  activeOpacity={activeOpacity.medium}
                  onPress={() => typeItemClick(item.id)}
                  style={styles.typeItem}>
                  <View style={styles.outerCheck}>
                    {item.selected && <View style={styles.innerCheck} />}
                  </View>
                  <Text size={Fonts.size.xvi}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Address */}
            <TextInput
              require
              autoFocus
              label="Address"
              type="name"
              ref={ref => {
                addressRef(ref);
              }}
              placeholder="6595 Collier Rd, Florida 32092,"
              value={address}
              containerStyle={AppStyles.mTop20}
              onChangeText={onAddressChange}
              onSubmitEditing={onAddressSubmit}
              error={addressError}
              returnKeyType="next"
            />
            <Text style={AppStyles.mTop25}>Property Details</Text>
            {/* Property Title*/}
            <TextInput
              require
              label="Property Title"
              type="propertyTitle"
              ref={ref => {
                titleRef(ref);
              }}
              placeholder="Springfield Villas"
              value={title}
              containerStyle={AppStyles.mTop20}
              onChangeText={onTitleChange}
              error={titleError}
              onSubmitEditing={onTitleSubmit}
              returnKeyType="next"
            />
            {/* description */}
            <TextInput
              // require
              label="Property Description"
              type="propertyDescription"
              ref={ref => {
                descriptionRef(ref);
              }}
              placeholder="6595 Collier Rd, Florida 32092,"
              value={description}
              multiline
              containerStyle={AppStyles.mTop20}
              onChangeText={onDescriptionChange}
              error={descriptionError}
              onSubmitEditing={onDescriptionSubmit}
              returnKeyType="next"
            />
            {/* price */}
            <View>
              {/* <View style={styles.priceContainer}> */}
              <TextInput
                require
                label="Price (USD)"
                type="price"
                ref={ref => {
                  priceRef(ref);
                }}
                placeholder="140"
                prefix="$"
                value={price}
                containerStyle={{ ...AppStyles.mTop20, overflow: 'hidden' }}
                onChangeText={onPriceChange}
                onSubmitEditing={onPriceSubmit}
                keyboardType="numeric"
                error={priceError}
                returnKeyType="next"
              />
              {/* </View> */}
              {/*Area*/}
              <TextInput
                label="Area"
                type="aarea"
                ref={ref => {
                  areaRef(ref);
                }}
                placeholder="1400"
                value={area}
                containerStyle={AppStyles.mTop20}
                onChangeText={onAreaChange}
                error={areaError}
                onSubmitEditing={onAreaSubmit}
                // keyboardType="numeric"
                returnKeyType="next"
              />
              {/* Square feet*/}
              <TextInput
                // require
                label="Square Feet"
                type="Square Feet"
                ref={ref => {
                  squareRef(ref);
                }}
                placeholder="Square Feet"
                value={square}
                containerStyle={AppStyles.mTop20}
                onChangeText={onSquareChange}
                error={squareError}
                onSubmitEditing={onSquareSubmit}
                // keyboardType="numeric"
                returnKeyType="next"
              />

              <DatePicker
                dismiss
                // require
                title={'Year Built'}
                isDate
                dateFormat={'YYYY'}
                date={date}
                onDateChange={onDateChange}
              />
              {/* property images */}
              <View style={styles.imageContainer}>
                <Text type="semi_bold" size={Fonts.size.xviii}>
                  Add Images
                </Text>
                <Text style={AppStyles.mTop10} size={Fonts.size.xvi}>
                  Upload images for the property
                </Text>
                <FlatList
                  data={propertyImages}
                  numColumns={4}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        {item.icon ? (
                          <>
                            {index == 0 ? (
                              <TouchableOpacity
                                activeOpacity={activeOpacity.medium}
                                onPress={onGalleryPress}
                                style={[
                                  styles.uploadContainer,
                                  styles.borderOne,
                                ]}>
                                <RnImage source={item.icon} />
                              </TouchableOpacity>
                            ) : (
                              <View style={AppStyles.mRight25}>
                                <TouchableOpacity
                                  onPress={() => removeImage(item.id)}
                                  activeOpacity={activeOpacity.medium}
                                  style={styles.removeImageParent}>
                                  <View style={styles.line} />
                                </TouchableOpacity>
                                <View
                                  style={[
                                    styles.uploadContainer,
                                    AppStyles.mRight0,
                                  ]}>
                                  <Image
                                    style={{ height: 47, width: 47 }}
                                    source={{ uri: item.icon }}
                                  />
                                </View>
                              </View>
                            )}
                          </>
                        ) : (
                          <View
                            style={[
                              styles.uploadContainer,
                              styles.backgroundGrey,
                            ]}
                          />
                        )}
                      </>
                    );
                  }}
                />
              </View>
              {true && (
                <Text
                  type="semi_bold"
                  size={Fonts.size.xii}
                  color={Colors.red}
                  style={[AppStyles.mTop5]}>
                  {imageError}
                </Text>
              )}
              {/* Button */}
              <View style={[AppStyles.flex, AppStyles.flexRow]}>
                {/* <View style={AppStyles.flex} /> */}
                <Button
                  onPress={propertyOnPressHandler}
                  indicatorColor="white"
                  textAlign="center"
                  style={styles.updateButton}>
                  {props.item ? 'Update Property' : 'Add Property'}
                </Button>
              </View>
            </View>
          </View>
        </>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
