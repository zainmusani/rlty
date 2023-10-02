import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  CustomNavbar,
  DatePicker,
  Loader,
  RadioBtnYesAndNo,
  TextInput,
} from '../../components';
import {
  maximumCurrentDate,
  minimumHundredYear,
  moreThanCharError,
} from '../../constants';
import {AppStyles, Images} from '../../theme';
import styles from './AddSellerDetailsStyles';

export default function AddSellerDetailsView(props) {
  const {
    setValue,
    address,
    addressError,
    amountRef,
    amountFocus,
    name,
    nameRef,
    nameError,
    addressRef,
    addressFocus,
    amountOfContract,
    amountOfContractError,
    titleCompanyRef,
    titleCompany,
    titleCompanyError,
    titleCompanyFocus,
    onSave,
    earnestMoneyDate,
    lenderDate,
    homeInspectionDate,
    termiteInspectionDate,
    appraisalDate,
    dueDate,
    commitmentDate,
    closingDate,
    setToggle,
    earnestMoneyToggle,
    lenderToggle,
    surveyToggle,
    newSurveyToggle,
    switchToggle,
    CDAToggle,
    earnestMoneyDateError,
    lenderDateError,
    homeInspectionDateError,
    termiteInspectionDateError,
    appraisalDateError,
    dueDateError,
    commitmentDateError,
    closingDateError,
    loading,
    homeInspectionAdditionalInfo,
    termiteInspectionAdditionalInfo,
    appraisalAdditionalInfo,
    surveyAdditionalInfo,
    additionalInfoEntire,
    optionPeriodEndsDate,
    optionPeriodEndsDateError,
    homeToggle,
    isReqRuntimeError,
    isReqRuntimeErrorForName,
    isReqRuntimeErrorForNumber,
    homeInspectionAdditionalInfoError,
    termiteInspectionAdditionalInfoError,
    surveyAdditionalInfoError,
    appraisalAdditionalInfoError,
    additionalInfoEntireError,
    isFormEmpty,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        leftBtnImage={Images.close}
        hasBack={false}
        title="Add Seller Details"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        alwaysBounceVertical={false}
        // enableOnAndroid={true}
        // keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <>
          <View>
            {/* Name */}
            <TextInput
              autoFocus
              ref={nameRef}
              label="Name"
              placeholder="Enter your full name"
              value={name}
              containerStyle={AppStyles.mTop20}
              onChangeText={name => {
                if (
                  isReqRuntimeErrorForName(
                    name,
                    'nameError',
                    'Name',
                    'Enter valid Name containing alphabets only',
                    72,
                  )
                )
                  return;
                setValue({name});
              }}
              onSubmitEditing={amountFocus}
              returnKeyType="next"
              error={nameError}
            />
            {/* address */}
            <TextInput
              editable={false}
              label="Address"
              type="address"
              ref={addressRef}
              onChangeText={address => {
                // if (isReqRuntimeError(address, "addressError", "Address", 255)) return;
                setValue({address});
              }}
              placeholder="123, Midway Street. South California"
              value={address}
              containerStyle={AppStyles.mTop20}
              onSubmitEditing={amountFocus}
              returnKeyType="next"
              error={addressError}
            />
            {/* Amount of Contract */}
            <TextInput
              // require
              label="Amount of Contract"
              type="address"
              ref={amountRef}
              placeholder="Enter amount of contract"
              value={amountOfContract}
              containerStyle={AppStyles.mTop20}
              onChangeText={amountOfContract => {
                if (
                  isReqRuntimeErrorForNumber(
                    amountOfContract,
                    'amountOfContractError',
                    'Amount of contract',
                    'Enter valid amount containing digits only',
                    30,
                  )
                )
                  return;
                setValue({amountOfContract});
              }}
              keyboardType="numeric"
              onSubmitEditing={titleCompanyFocus}
              returnKeyType="next"
              error={amountOfContractError}
              prefix="$"
            />

            {/* Title Company/Closer */}
            <TextInput
              // require
              label="Title Company/Closer"
              type="address"
              ref={titleCompanyRef}
              placeholder="Enter company title"
              value={titleCompany}
              containerStyle={AppStyles.mTop20}
              onChangeText={titleCompany => {
                if (
                  isReqRuntimeErrorForName(
                    titleCompany,
                    'titleCompanyError',
                    'Title',
                    'Enter valid Title containing alphabets only',
                    72,
                  )
                )
                  return;
                setValue({titleCompany});
              }}
              error={titleCompanyError}
            />
            {/* Earnest Money Received  */}
            <RadioBtnYesAndNo
              value={earnestMoneyToggle}
              setValue={boolean => setToggle('earnestMoneyToggle', boolean)}
              title="Earnest Money Received"
            />

            {/* Date of Receipt */}
            {earnestMoneyToggle && (
              <DatePicker
                dismiss
                error={earnestMoneyDateError}
                // title={'Date of Receipt'}
                minimumDate={minimumHundredYear}
                // maximumDate={maximumCurrentDate}
                title={''}
                style={{marginTop: -15}}
                isDate={true}
                date={earnestMoneyDate}
                onDateChange={date => {
                  setValue({earnestMoneyDate: date});
                  setValue({earnestMoneyDateError: ''});
                }}
              />
            )}
            {/* Contract to Lender */}
            <RadioBtnYesAndNo
              value={lenderToggle}
              setValue={boolean => setToggle('lenderToggle', boolean)}
              title="Contract to Lender"
            />

            {/*  */}
            {lenderToggle && (
              <DatePicker
                dismiss
                minimumDate={minimumHundredYear}
                // maximumDate={maximumCurrentDate}
                error={lenderDateError}
                title={''}
                style={{marginTop: -15}}
                isDate={true}
                date={lenderDate}
                onDateChange={date => {
                  setValue({lenderDate: date});
                  setValue({lenderDateError: ''});
                }}
              />
            )}

            {/*Home Inspection */}
            <DatePicker
              dismiss
              minimumDate={minimumHundredYear}
              // maximumDate={maximumCurrentDate}
              error={homeInspectionDateError}
              title={'Home Inspection'}
              isDateAndTime={true}
              date={homeInspectionDate}
              onDateChange={date => {
                setValue({homeInspectionDate: date});
                setValue({homeInspectionDateError: ''});
              }}
            />
            {/*Home Inspection additional information  */}
            <TextInput
              type="address"
              // placeholder="Add some additional information for "
              placeholder="Add some home inspection additional information"
              value={homeInspectionAdditionalInfo}
              multiline
              containerStyle={AppStyles.mTop20}
              error={homeInspectionAdditionalInfoError}
              onChangeText={text => {
                if (text?.length > 255)
                  return setValue({
                    homeInspectionAdditionalInfoError: moreThanCharError(255),
                  });
                else setValue({homeInspectionAdditionalInfoError: ''});
                setValue({homeInspectionAdditionalInfo: text});
              }}
            />

            {/*Termite Inspection */}
            <DatePicker
              dismiss
              minimumDate={minimumHundredYear}
              // maximumDate={maximumCurrentDate}
              // require
              error={termiteInspectionDateError}
              title={'Termite Inspection'}
              isDateAndTime={true}
              date={termiteInspectionDate}
              onDateChange={date => {
                setValue({termiteInspectionDate: date});
                setValue({termiteInspectionDateError: ''});
              }}
            />

            {/*  */}
            <TextInput
              type="address"
              ref={ref => {}}
              placeholder="Add some termite inspection additional information"
              value={termiteInspectionAdditionalInfo}
              multiline
              containerStyle={AppStyles.mTop20}
              error={termiteInspectionAdditionalInfoError}
              onChangeText={text => {
                if (text?.length > 255)
                  return setValue({
                    termiteInspectionAdditionalInfoError:
                      moreThanCharError(255),
                  });
                else setValue({termiteInspectionAdditionalInfoError: ''});
                setValue({termiteInspectionAdditionalInfo: text});
              }}
            />

            {/* Option period ends  */}
            <DatePicker
              dismiss
              minimumDate={minimumHundredYear}
              // maximumDate={maximumCurrentDate}
              // require
              error={optionPeriodEndsDateError}
              title={'Option period ends'}
              isDateAndTime={true}
              date={optionPeriodEndsDate}
              onDateChange={date => {
                setValue({optionPeriodEndsDate: date});
                setValue({optionPeriodEndsDateError: ''});
              }}
            />

            {/* Survey Received*/}
            <RadioBtnYesAndNo
              value={surveyToggle}
              setValue={boolean => setToggle('surveyToggle', boolean)}
              title="Survey Received"
            />

            {/* Survey Received Text field for information.  */}
            {surveyToggle && (
              <TextInput
                type="address"
                ref={ref => {}}
                placeholder="Add some survey received additional information"
                value={surveyAdditionalInfo}
                multiline
                containerStyle={AppStyles.mTop20}
                error={surveyAdditionalInfoError}
                onChangeText={text => {
                  if (text?.length > 255)
                    return setValue({
                      surveyAdditionalInfoError: moreThanCharError(255),
                    });
                  else setValue({surveyAdditionalInfoError: ''});
                  setValue({surveyAdditionalInfo: text});
                }}
              />
            )}
            {/* New Survey Ordered*/}
            {!surveyToggle && (
              <RadioBtnYesAndNo
                value={newSurveyToggle}
                setValue={boolean => setToggle('newSurveyToggle', boolean)}
                title="New Survey Ordered"
              />
            )}

            {/* Appraisal Date */}
            <DatePicker
              dismiss
              minimumDate={minimumHundredYear}
              // maximumDate={maximumCurrentDate}
              error={appraisalDateError}
              title={'Appraisal Date'}
              isDate={true}
              date={appraisalDate}
              onDateChange={date => {
                setValue({appraisalDate: date});
                setValue({appraisalDateError: ''});
              }}
            />

            {/* Appraisal Date additional info */}
            <TextInput
              type="address"
              ref={ref => {}}
              placeholder="Add some appraisal date additional information"
              value={appraisalAdditionalInfo}
              multiline
              containerStyle={AppStyles.mTop20}
              error={appraisalAdditionalInfoError}
              onChangeText={text => {
                if (text?.length > 255)
                  return setValue({
                    appraisalAdditionalInfoError: moreThanCharError(255),
                  });
                else setValue({appraisalAdditionalInfoError: ''});
                setValue({appraisalAdditionalInfo: text});
              }}
            />

            {/* Title commitment to be received */}
            <DatePicker
              dismiss
              minimumDate={minimumHundredYear}
              // maximumDate={max}
              // require
              error={commitmentDateError}
              title={'Title commitment to be received'}
              isDate={true}
              date={commitmentDate}
              onDateChange={date => {
                setValue({commitmentDate: date});
                setValue({commitmentDateError: ''});
              }}
            />

            {/* Home Warranty  */}
            <RadioBtnYesAndNo
              value={homeToggle}
              setValue={boolean => setToggle('homeToggle', boolean)}
              title="Home Warranty"
            />

            {/*  Due Date */}
            {/* {homeToggle && (
              <DatePicker
                dismiss
                minimumDate={minimumHundredYear}
                maximumDate={maximumCurrentDate}
                require
                error={dueDateError}
                title={'Due Date'}
                isDate={true}
                date={dueDate}
                onDateChange={date => {
                  setValue({ dueDate: date });
                  setValue({ dueDateError: '' });
                }}
              />
            )} */}

            {/* Switch Over Utilities*/}
            <RadioBtnYesAndNo
              value={switchToggle}
              setValue={boolean => setToggle('switchToggle', boolean)}
              title="Switch Over Utilities"
            />

            {/* additional information */}
            <TextInput
              type="address"
              ref={ref => {}}
              placeholder="Add some additional information"
              value={additionalInfoEntire}
              multiline
              error={additionalInfoEntireError}
              containerStyle={AppStyles.mTop20}
              onChangeText={text => {
                if (text?.length > 255)
                  return setValue({
                    additionalInfoEntireError: moreThanCharError(255),
                  });
                else setValue({additionalInfoEntireError: ''});
                setValue({additionalInfoEntire: text});
              }}
            />
            {/* Login Button */}
            <View style={[AppStyles.flex, AppStyles.flexRow]}>
              {/* <View style={AppStyles.flex} /> */}
              <Button
                indicatorColor="white"
                style={styles.SaveButton}
                disabled={isFormEmpty}
                onPress={() => !isFormEmpty && onSave()}>
                Save
              </Button>
            </View>
          </View>
        </>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </View>
  );
}
