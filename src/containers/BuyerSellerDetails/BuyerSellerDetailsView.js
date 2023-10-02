import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  PropertyItem,
  Button,
  Loader,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './BuyerSellerDetailsStyles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {
  deleteBuyerRequest,
  deleteSellerRequest,
  getPropertiesSearchRequest,
} from '../../actions/propertyActions';
import Modal, {ModalContent} from 'react-native-modals';

export default function BuyerSellerDetailsView(props) {
  const dispatch = useDispatch();
  const {
    isBuyer,
    item,
    property,
    fromProperDetail,
    disableBuyerLink,
    disableSellerLink,
  } = props || {};
  const {
    name,
    address,
    amountOfContract,
    companyName,
    isEarnestMoneyReceived,
    earnestMoneyReceivedDate,
    isContractToLender,
    contractToLenderDate,
    homeInspectionDate,
    homeInspectionInfo,
    termiteInspectionDate,
    termiteInspectionInfo,
    optionPeriodEndDate,
    isSurveyReceived,
    surveyInfo,
    isNewSurvey,
    appraisalDate,
    appraisalAdditionalInfo,
    titleCommitmentDate,
    isHomeWarranty,
    homeWarrantyDate,
    isSwitchOverUtilities,
    entireAdditionalInfo,
  } = item;
  console.log({buyerItem2: item, isBuyer});
  const {propertyById} = useSelector(state => state.properties);
  const propertyItem = property ? property : propertyById[0];
  console.log('buyerSellerDetalView --->>> ', {props});
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bsRef = useRef(null);

  const detailItem = (heading = 'heading', content = 'content') => {
    return (
      <View style={AppStyles.mBottom25}>
        <Text
          size={Fonts.size.xiv}
          type="semi_bold"
          color={Colors.text.secondary}>
          {heading}
        </Text>
        <Text style={AppStyles.mTop5}>{content}</Text>
      </View>
    );
  };

  const formateDate = date => {
    const formattedDate = moment(date).format('MMM DD,YYYY');
    return formattedDate === 'Invalid date' ? '-' : formattedDate;
  };

  const formateDateTime = date => {
    const formattedDate = moment(date).format('MMM DD,YYYY hh:mm a');
    return formattedDate === 'Invalid date' ? '-' : formattedDate;
  };

  const handleShowAlert = () => {
    // Alert.alert(
    //   `Delete ${isBuyer ? 'Buyer' : 'Seller'}`,
    //   'are you sure you want to delete ?',
    //   [
    //     {
    //       text: 'Yes',
    //       onPress: () => {
    //         handleDelete();
    //       },
    //     },
    //     {
    //       text: 'Cancel',
    //       // onPress: () => {handleDelete()}
    //     },
    //   ],
    // );
  };

  const handleDelete = () => {
    setLoading(true);
    // return;
    if (isBuyer) {
      const payload = {
        property_buyer_id: item?.id,
      };

      dispatch(
        deleteBuyerRequest(payload, res => {
          setLoading(false);
          if (res) {
            bsRef.current.close();
            util.topAlert('Buyer deleted successfully.', 'success');
            dispatch(
              getPropertiesSearchRequest({
                filter: '',
                keyword: '',
                offset: 0,
                limit: 15,
              }),
            );
            setTimeout(() => {
              Actions.pop();
            }, 500);
          }
        }),
      );
    } else {
      const payload = {
        id: item?.id,
      };

      dispatch(
        deleteSellerRequest(payload, res => {
          setLoading(false);
          if (res) {
            bsRef.current.close();
            util.topAlert('Seller deleted successfully.', 'success');
            dispatch(
              getPropertiesSearchRequest({
                filter: '',
                keyword: '',
                offset: 0,
                limit: 15,
              }),
            );
            setTimeout(() => {
              Actions.pop();
            }, 500);
          }
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={name}
        rightBtnImage={Images.threeDots}
        rightBtnPress={() => {
          bsRef.current.open();
        }}
      />
      <ScrollView
        contentContainerStyle={AppStyles.padding20}
        showsVerticalScrollIndicator={false}>
        {propertyItem && (
          <PropertyItem
            item={propertyItem}
            myProperty
            buyerSellerView
            disableOnPress={fromProperDetail}
            disableBuyerLink={disableBuyerLink}
            disableSellerLink={disableSellerLink}
          />
        )}
        {detailItem('Name', name)}
        {detailItem('Address', address)}
        {detailItem(
          'Amount of Contract',
          `$${util.numberWithCommas(amountOfContract)}`,
        )}
        {detailItem('Title Company/Closer', companyName)}
        {detailItem(
          'Earnest Money Received',
          +isEarnestMoneyReceived
            ? formateDate(earnestMoneyReceivedDate)
            : 'No',
        )}
        {detailItem(
          'Contract to Lender',
          +isContractToLender ? formateDate(contractToLenderDate) : 'No',
        )}
        {detailItem('Home Inspection', formateDateTime(homeInspectionDate))}
        {!!homeInspectionInfo &&
          detailItem(
            'Home Inspection Additional Information',
            homeInspectionInfo,
          )}
        {detailItem(
          'Termite Inspection',
          formateDateTime(termiteInspectionDate),
        )}
        {!!termiteInspectionInfo &&
          detailItem(
            'Termite Inspection Additional Information',
            termiteInspectionInfo,
          )}
        {detailItem('Option Period Ends', formateDateTime(optionPeriodEndDate))}
        {detailItem('Survey Received?', +isSurveyReceived ? 'Yes' : 'No')}
        {!!surveyInfo &&
          detailItem('Survey Received Additional Information', surveyInfo)}
        {detailItem('New Survey Ordered?', +isNewSurvey ? 'Yes' : 'No')}
        {detailItem('Appraisal Date', formateDate(appraisalDate))}
        {!!appraisalAdditionalInfo &&
          detailItem(
            'Appraisal Date Additional Information',
            appraisalAdditionalInfo,
          )}
        {detailItem(
          'Title Commitment to be Received',
          formateDate(titleCommitmentDate),
        )}
        {detailItem('Home Warranty', +isHomeWarranty ? 'Yes' : 'No')}
        {homeWarrantyDate !== 'Invalid date' &&
          detailItem('Due Date', formateDate(homeWarrantyDate))}
        {detailItem(
          'Switch Over Utilities',
          +isSwitchOverUtilities ? 'Yes' : 'No',
        )}
        {!!entireAdditionalInfo &&
          detailItem('Additional Information', entireAdditionalInfo)}
      </ScrollView>

      <RBSheet
        ref={bsRef}
        height={Metrics?.screenHeight / 4}
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
              onPress={() => {
                !isLoading && bsRef.current.close();
              }}>
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
          <View
            style={[
              AppStyles?.paddingHorizontal30,
              {justifyContent: 'center', marginTop: 20},
            ]}>
            <Text
              color={Colors?.text?.black}
              size={Fonts?.size?.xvi}
              style={{height: 50}}
              onPress={() => {
                bsRef.current.close();
                isBuyer
                  ? Actions.addBuyerDetails({
                      item: {
                        ...item,
                        propertyId: property?.id ?? item?.propertyId,
                      },
                      fromProperDetail,
                    })
                  : Actions.addSellerDetails({
                      item: {
                        ...item,
                        propertyId: property?.id ?? item?.propertyId,
                      },
                      fromProperDetail,
                    });
              }}>
              Edit
            </Text>

            <Text
              color={Colors?.text?.black}
              size={Fonts?.size?.xvi}
              style={{}}
              onPress={() => {
                setIsOpen(true);
                bsRef.current.close();
              }}>
              Delete
              {/* {isLoading && <ActivityIndicator style={{marginLeft: 20}} />} */}
            </Text>
          </View>
        </View>
      </RBSheet>

      <Modal
        modalStyle={{borderRadius: 24, marginHorizontal: 25}}
        visible={isOpen}
        onTouchOutside={() => {
          setIsOpen(false);
        }}>
        <ModalContent>
          <View style={AppStyles?.padding10}>
            <Text type="bold" size={Fonts?.size?.xviii}>
              Remove {isBuyer ? 'Buyer' : 'Seller'} ?
            </Text>
            <Text style={AppStyles?.mTop15} size={Fonts?.size?.xvi}>
              are you sure you want to remove ?
            </Text>
            <View style={[AppStyles?.flexRow, AppStyles?.mTop35]}>
              <Button
                background={Colors?.backgroundAccent}
                indicatorColor="white"
                style={styles?.conformationButton}
                centerIcon
                onPress={() => {
                  handleDelete();
                  setIsOpen(false);
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
                onPress={() => setIsOpen(false)}>
                No
              </Button>
            </View>
          </View>
        </ModalContent>
      </Modal>

      <Loader loading={isLoading} />
    </View>
  );
}
