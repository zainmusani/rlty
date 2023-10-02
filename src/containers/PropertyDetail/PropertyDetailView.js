import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  Button,
  TextInput,
  Loader,
} from '../../components';
import styles from './PropertyDetailStyles';
import {AppStyles, Fonts, Images, Colors, Metrics} from '../../theme';
import util from '../../util';
import Gallery from 'react-native-image-gallery';
import _ from 'lodash';
import {activeOpacity, MY_PROPERTY_ACTIONS, strings} from '../../constants';
import ReadMore from 'react-native-read-more-text';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Modal, ModalContent} from 'react-native-modals';
import {Actions} from 'react-native-router-flux';

export default function PropertyDetailView(props) {
  const {
    property,
    isFavouriteView,
    markPropertyFavouriteRequest,
    galleryVisible,
    toggleGallery,
    bsRef,
    open,
    setOpen,
    copyModalVisible,
    toggleCopyModal,
    deleteModalVisible,
    toggleDeleteModal,
    noteModalVisible,
    toggleNoteModal,
    notes,
    onChangeNotes,
    loading,
    markAsSold,
    deleteProperty,
    markAsSoldHelper,
    MlsCopyAndMarkFavHandler,
    checkPropertyBuyOrSellBeforeMark,
    markSoldModal,
    toggleMarlSoldModal,
    modalTxtForMarkAsSold,
    disableBuyerLink,
    disableSellerLink,
  } = props || {};

  const {
    id,
    propertyId,
    image,
    type,
    saleType,
    title,
    address,
    area,
    price,
    isFav,
    sold,
    photos,
    year,
    description,
    isBuyerAdded,
    isSellerAdded,
    isMlsProperty,
    isNoteAdd,
    isMyProperty,
    buyerDetail,
    sellerDetail,
  } = property || {};


  let tempPhotos = _?.cloneDeep(photos);
  if (tempPhotos && tempPhotos?.length > 6) {
    tempPhotos.length = 6;
  }
  let galleryArray = [];
  photos?.forEach(element => {
    galleryArray?.push({source: {uri: element}});
  });

  const buyerSellerName = [
    buyerDetail?.name && {
      title: 'Buyer',
      disable: disableBuyerLink && 0.5,
      name: buyerDetail?.name,
      action: () =>
        Actions.buyerSellerDetails({
          item: buyerDetail,
          property,
          fromProperDetail: true,
          isBuyer: true,
        }),
    },
    sellerDetail?.name && {
      title: 'Seller',
      disable: disableSellerLink && 0.5,
      name: sellerDetail?.name,
      action: () =>
        Actions.buyerSellerDetails({
          item: sellerDetail,
          property,
          fromProperDetail: true,
          isBuyer: false,
        }),
    },
  ];

  return (
    <View style={styles?.container}>
      <CustomNavbar title={title} />
      <ScrollView
        contentContainerStyle={styles?.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <>
          {/* header image */}
          <View style={styles?.headerImageParent}>
            <Image
              resizeMode="cover"
              source={{uri: image || strings.defaultImage}}
              style={styles?.headerImage}
            />
          </View>

          {/* copy/fav section */}
          <View style={styles?.favSection}>
            <View style={AppStyles?.flex}>
              <Text color="#91929E">{`${type}  |  ${
                sold ? sold !== "For Sale" ? 'Sold' : saleType : saleType
              }`}</Text>
            </View>
            <View style={AppStyles?.flexRow}>
              {isMlsProperty && (
                <TouchableOpacity
                  onPress={() => toggleCopyModal(true)}
                  style={[styles?.iconBg, AppStyles?.mRight5]}>
                  <RnImage style={styles?.icon} source={Images?.copyIcon} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles?.iconBg, isMyProperty && AppStyles?.mRight10]}
                onPress={() => {
                  if (isMlsProperty) {
                    MlsCopyAndMarkFavHandler(property, true);
                    return;
                  }
                  isFavouriteView && Actions.pop();
                  markPropertyFavouriteRequest(
                    {property_id: propertyId},
                    res => {
                      if (res && isFavouriteView)
                        util.topAlert(
                          'Property removed from favourite list',
                          'success',
                        );
                    },
                  );
                }}>
                <RnImage
                  style={styles?.icon}
                  source={isFav ? Images?.starFilled : Images?.star}
                />
              </TouchableOpacity>

              {isMyProperty && (
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}
                  style={[styles?.iconBg, AppStyles?.mRight5]}>
                  <RnImage source={Images?.threeDots} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* title */}
          <Text
            type="bold"
            size={Fonts?.size?.xvi}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title ? title : ''}
          </Text>

          {/* address */}
          <Text color="#7D8592" numberOfLines={1} ellipsizeMode="tail">
            {address ? address : ''}
          </Text>
          {/* bed, beth , price */}
          <View
            style={[
              AppStyles?.flexRow,
              AppStyles?.alignItemsCenter,
              AppStyles?.mTop5,
            ]}>
            <View style={AppStyles?.flexRow}>
              {/* area */}
              <View style={[AppStyles?.flexRow, AppStyles?.alignItemsCenter]}>
                <RnImage source={Images?.area} />
                <Text style={AppStyles?.mLeft5} color={Colors?.text?.secondary}>
                  {area ? area : '' + ' sqft'}
                </Text>
              </View>
            </View>
            {/* amount */}
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text size={Fonts?.size?.xvi} type="semi_bold">
                {'$' + util?.numberWithCommas(price)}
              </Text>
            </View>
          </View>
          {isMlsProperty && (
            <Text style={{marginTop: 5}} color={Colors?.text?.secondary}>
              year built: {year && year.slice(0, 4)}
            </Text>
          )}
          {/* map view */}
          {/* <View style={styles?.mapImageParent}>
            <RnImage
              source={Images?.mapView}
              style={styles?.mapImage}
              resizeMode="cover"
            />
          </View> */}
          {isMyProperty && (
            <Button
              onPress={() => checkPropertyBuyOrSellBeforeMark()}
              indicatorColor="white"
              disabled={saleType === 'sold' ? true : false}
              style={styles.markAsSoldBtn}>
              <Text style={styles.markTxt}>Mark as Sold</Text>
            </Button>
          )}
          {/* photos */}
          <Text
            type="semi_bold"
            size={Fonts?.size?.xviii}
            style={AppStyles?.mTop15}>
            Photos
          </Text>
          <View>
            <FlatList
              style={AppStyles?.mTop10}
              data={tempPhotos}
              numColumns={3}
              renderItem={({item, index}) => {
                if (index === 5) {
                  return (
                    <TouchableOpacity
                      onPress={() => toggleGallery(true)}
                      activeOpacity={activeOpacity?.medium}
                      style={[styles?.photoImageParent]}>
                      <Image
                        resizeMode="cover"
                        style={styles?.photoImage}
                        source={{uri: item}}
                      />
                      <View style={styles?.imageOverly}>
                        <Text
                          type="bold"
                          size={Fonts?.size?.xviii}
                          color="white">
                          {'+' + (photos?.length - 6)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    onPress={() => toggleGallery(true)}
                    activeOpacity={activeOpacity?.medium}
                    style={[styles?.photoImageParent]}>
                    <Image
                      resizeMode="cover"
                      style={styles?.photoImage}
                      source={{uri: item}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* Description */}
          <Text
            type="semi_bold"
            size={Fonts?.size?.xviii}
            style={[AppStyles?.mTop15, AppStyles?.mBottom15]}>
            Description
          </Text>
          <ReadMore
            style={AppStyles?.mTop15}
            numberOfLines={3}
            renderTruncatedFooter={handlePress => {
              return (
                <Text
                  size={Fonts?.size?.xvi}
                  type="semi_bold"
                  onPress={handlePress}>
                  Read more
                </Text>
              );
            }}
            renderRevealedFooter={handlePress => {
              return (
                <Text
                  size={Fonts?.size?.xvi}
                  type="semi_bold"
                  onPress={handlePress}>
                  Show less
                </Text>
              );
            }}>
            <Text size={Fonts?.size?.xvi} color={Colors?.text?.secondary}>
              {description}
            </Text>
          </ReadMore>
          {isMyProperty &&
            buyerSellerName &&
            buyerSellerName?.map((obj, i) => (
              <TouchableOpacity
                style={{alignSelf: 'flex-start'}}
                disabled={obj?.disable}
                onPress={() => obj?.action()}>
                <Text
                  type="semi_bold"
                  size={Fonts?.size?.xviii}
                  style={[
                    AppStyles?.mTop15,
                    styles.borderBottom,
                    {opacity: obj?.disable},
                  ]}>
                  {obj?.title}{' '}
                  <Text size={Fonts?.size?.xvi} color={'blue'}>
                    {obj?.name}
                  </Text>
                </Text>
              </TouchableOpacity>
            ))}

          {isMyProperty && (
            <View style={[styles.buyerSellerBtnWrapper]}>
              <Button
                onPress={() =>
                  Actions.addBuyerDetails({
                    propertyId,
                    addressFromDetailView: address,
                  })
                }
                indicatorColor="white"
                disabled={isBuyerAdded}
                style={[styles.addDetailBtn, AppStyles.mRight10]}>
                <Text style={[styles.markTxt, {color: Colors.text.primary}]}>
                  Add Buyer
                </Text>
              </Button>
              <Button
                onPress={() =>
                  Actions.addSellerDetails({
                    propertyId,
                    addressFromDetailView: address,
                  })
                }
                indicatorColor="white"
                disabled={isSellerAdded}
                style={[styles.addDetailBtn, AppStyles.mLeft10]}>
                <Text style={[styles.markTxt, {color: Colors.text.primary}]}>
                  Add Seller
                </Text>
              </Button>
            </View>
          )}

          {isNoteAdd && (
            <View style={[AppStyles?.flexRow, AppStyles?.mTop30]}>
              {/* <TouchableOpacity
                onPress={() => {
                  Actions?.showingsList();
                }}
                style={[styles?.iconBgBig, AppStyles?.mRight5]}>
                <RnImage style={styles?.icon} source={Images?.showingIcon} />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => toggleNoteModal(false)}
                style={[styles?.iconBgBig, AppStyles?.mRight5]}>
                <RnImage style={styles?.icon} source={Images?.notesIcon} />
              </TouchableOpacity>
            </View>
          )}
        </>
      </ScrollView>
      {galleryVisible && (
        <View style={{position: 'absolute'}}>
          <TouchableOpacity
            onPress={() => {
              toggleGallery(false);
            }}
            activeOpacity={activeOpacity?.medium}
            style={{
              position: 'absolute',
              zIndex: 999,
              backgroundColor: 'white',
              top: 50,
              right: 10,
              padding: 5,
              borderRadius: 20,
            }}>
            <RnImage source={Images?.close} />
          </TouchableOpacity>
          <Gallery
            style={{flex: 1, backgroundColor: 'black'}}
            images={galleryArray}
          />
        </View>
      )}

      <RBSheet
        // height={
        //   (isSellerAdded && isBuyerAdded) ? Metrics?.screenHeight / 4 :
        //     (isSellerAdded || isBuyerAdded) ? Metrics?.screenHeight / 3.5 :
        //       saleType === "sold" ? Metrics?.screenHeight / 2.8 :
        //         Metrics?.screenHeight / 2.3
        // }
        ref={bsRef}
        height={Metrics?.screenHeight / 3.5}
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
            width: Metrics?.screenWidth,
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
              AppStyles?.flexRow,
              AppStyles?.paddingHorizontal30,
              AppStyles?.mTop15,
              {alignItems: 'center'},
            ]}>
            <Text
              color={Colors?.text?.secondary}
              size={Fonts?.size?.xvi}
              style={AppStyles?.flex}
              onPress={() => setOpen(false)}>
              Cancel
            </Text>
            <Text
              size={Fonts?.size?.xviii}
              type="semi_bold"
              textAlign="center"
              style={AppStyles?.flex2}>
              Perform action
            </Text>
            <View style={AppStyles?.flex} />
          </View>
          {/* LIST */}
          <ScrollView contentContainerStyle={AppStyles?.mTop20}>
            {MY_PROPERTY_ACTIONS?.map(item => {
              let disable = false;

              if (item?.label?.includes('Add S') && isSellerAdded)
                disable = true;
              if (item?.label?.includes('Add B') && isBuyerAdded)
                disable = true;
              if (item?.label?.includes('Mark')) return;

              return (
                <TouchableOpacity
                  key={util?.generateGuid()}
                  disabled={disable}
                  onPress={() => {
                    if (item?.label?.includes('Mark '))
                      checkPropertyBuyOrSellBeforeMark();
                    else if (item?.label === 'Delete') toggleDeleteModal(true);
                    else item?.onPress(property);
                    setOpen(false);
                  }}
                  style={[
                    AppStyles?.flexRow,
                    {marginVertical: 15, marginHorizontal: 30},
                  ]}>
                  <Text
                    color={disable ? Colors.alto : '#000'}
                    size={Fonts?.size?.xvi}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
      {/* copy confirmation modal */}
      <Modal
        modalStyle={{borderRadius: 24, marginHorizontal: 25}}
        visible={copyModalVisible}
        onTouchOutside={() => {
          toggleCopyModal(false);
        }}>
        <ModalContent>
          <View style={AppStyles?.padding10}>
            <Text type="bold" size={Fonts?.size?.xviii}>
              Are you sure you want to copy this to My Property?
            </Text>
            <Text style={AppStyles?.mTop15} size={Fonts?.size?.xvi}>
              The property will be copied to your My Properties listing?.
            </Text>
            <View style={[AppStyles?.flexRow, AppStyles?.mTop35]}>
              <Button
                background={Colors?.backgroundAccent}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                onPress={() => {
                  MlsCopyAndMarkFavHandler(property, false);
                  toggleCopyModal(false);
                }}>
                Yes
              </Button>
              <View style={{width: 20}} />
              <Button
                background={Colors?.white}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                color={Colors?.text?.primary}
                raised={false}
                onPress={() => toggleCopyModal(false)}>
                No
              </Button>
            </View>
          </View>
        </ModalContent>
      </Modal>
      {/* note modal */}
      <Modal
        modalStyle={{borderRadius: 24, marginHorizontal: 25}}
        visible={noteModalVisible}
        onTouchOutside={() => {
          toggleNoteModal(false);
        }}>
        <ModalContent>
          <View style={(AppStyles?.padding10, {width: 300})}>
            <View
              style={[
                AppStyles?.flexRow,
                AppStyles?.alignItemsCenter,
                AppStyles?.mBottom30,
              ]}>
              <Text
                style={AppStyles?.flex}
                size={Fonts?.size?.xviii}
                type="bold">
                Add Note
              </Text>
              <TouchableOpacity
                activeOpacity={activeOpacity?.medium}
                onPress={() => toggleNoteModal(false)}>
                <RnImage source={Images?.close} />
              </TouchableOpacity>
            </View>
            <TextInput
              label="Description"
              multiline
              placeholder="Add some description of the request"
              value={notes}
              onChangeText={onChangeNotes}
            />
            <View style={[AppStyles?.flexRow, AppStyles?.mTop40]}>
              <View style={{flex: 1}} />
              <Button
                background={Colors?.backgroundAccent}
                style={styles?.conformationButton}
                onPress={() => toggleNoteModal(false)}>
                Add Note
              </Button>
            </View>
          </View>
        </ModalContent>
      </Modal>
      {/* delete conformation */}
      <Modal
        modalStyle={{borderRadius: 24, marginHorizontal: 25}}
        visible={deleteModalVisible}
        onTouchOutside={() => {
          toggleDeleteModal(false);
        }}>
        <ModalContent>
          <View style={AppStyles?.padding10}>
            <Text type="bold" size={Fonts?.size?.xviii}>
              Are you sure you want to delete this Property?
            </Text>
            <Text style={AppStyles?.mTop15} size={Fonts?.size?.xvi}>
              The property will be deleted from your Properties listing?.
            </Text>
            <View style={[AppStyles?.flexRow, AppStyles?.mTop35]}>
              <Button
                background={Colors?.backgroundAccent}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                onPress={() => {
                  deleteProperty();
                  toggleDeleteModal(false);
                }}>
                Yes
              </Button>
              <View style={{width: 20}} />
              <Button
                background={Colors?.white}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                color={Colors?.text?.primary}
                raised={false}
                onPress={() => toggleDeleteModal(false)}>
                No
              </Button>
            </View>
          </View>
        </ModalContent>
      </Modal>
      {/* Marks As Sold Modal */}
      <Modal
        modalStyle={{borderRadius: 24, marginHorizontal: 25}}
        visible={markSoldModal}
        onTouchOutside={() => {
          toggleMarlSoldModal(false);
        }}>
        <ModalContent>
          <View style={AppStyles?.padding10}>
            <Text size={Fonts?.size?.xvi}>{modalTxtForMarkAsSold()}</Text>
            <View style={[AppStyles?.flexRow, AppStyles?.mTop35]}>
              <Button
                background={Colors?.backgroundAccent}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                onPress={() => {
                  markAsSoldHelper();
                  toggleMarlSoldModal(false);
                }}>
                Yes
              </Button>
              <View style={{width: 20}} />
              <Button
                background={Colors?.white}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                color={Colors?.text?.primary}
                raised={false}
                onPress={() => toggleMarlSoldModal(false)}>
                No
              </Button>
            </View>
          </View>
        </ModalContent>
      </Modal>
      <Loader loading={loading} />
    </View>
  );
}
