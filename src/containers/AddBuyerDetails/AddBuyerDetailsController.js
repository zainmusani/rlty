import React from 'react';
import PropTypes from 'prop-types';
import AddBuyerDetailsView from './AddBuyerDetailsView';
import _ from 'lodash';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {
  addBuyerRequest,
  updateBuyerRequest,
} from '../../actions/propertyActions';
import {connect} from 'react-redux';
import {moreThanCharError} from '../../constants';

class AddBuyerDetailsController extends React.Component {
  constructor(props) {
    const {item} = props || {};
    super(props);
    this.state = {
      name: item?.name ? item?.name : '',
      address: item?.address ? item.address : props.addressFromDetailView,
      amountOfContract: item?.amountOfContract
        ? item?.amountOfContract.toString()?.trim()
        : '',
      earnestMoneyToggle: item
        ? item?.isEarnestMoneyReceived
          ? true
          : false
        : false,
      lenderToggle: item ? (item?.isContractToLender ? true : false) : false,
      describeToggle: true,
      surveyToggle: item ? (item?.isSurveyReceived ? true : false) : false,
      newSurveyToggle: item ? (item?.isNewSurvey ? true : false) : false,
      homeToggle: item ? (item?.isHomeWarranty ? true : false) : false,
      switchToggle: item ? (item?.isSwitchOverutilities ? true : false) : false,
      CDAToggle: true,
      titleCompany: item?.companyName ? item.companyName : '',
      earnestMoneyDate:
        item?.earnestMoneyReceivedDate && item?.earnestMoneyReceivedDate !== '-'
          ? item.earnestMoneyReceivedDate
          : '',
      lenderDate:
        item?.contractToLenderDate && item?.contractToLenderDate !== '-'
          ? item.contractToLenderDate
          : '',
      homeInspectionDate:
        item?.homeInspectionDate && item?.homeInspectionDate !== '-'
          ? item.homeInspectionDate
          : '',
      termiteInspectionDate:
        item?.termiteInspectionDate && item?.termiteInspectionDate !== '-'
          ? item.termiteInspectionDate
          : '',
      optionPeriodEndsDate:
        item?.optionPeriodEndDate && item?.optionPeriodEndDate !== '-'
          ? item.optionPeriodEndDate
          : '',
      appraisalDate:
        item?.appraisalDate && item?.appraisalDate !== '-'
          ? item.appraisalDate
          : '',
      dueDate: '',
      commitmentDate:
        item?.titleCommitmentDate && item?.titleCommitmentDate !== '-'
          ? item.titleCommitmentDate
          : '',
      closingDate: '',
      homeInspectionAdditionalInfo: item?.homeInspectionInfo
        ? item.homeInspectionInfo
        : '',
      termiteInspectionAdditionalInfo: item?.termiteInspectionInfo
        ? item.termiteInspectionInfo
        : '',
      appraisalAdditionalInfo: item?.appraisalAdditionalInfo
        ? item.appraisalAdditionalInfo
        : '',
      surveyAdditionalInfo: item?.surveyInfo ? item.surveyInfo : '',
      additionalInfoEntire: item?.entireAdditionalInfo
        ? item.entireAdditionalInfo
        : '',
      titleCompanyError: '',
      amountOfContractError: '',
      appraisalAdditionalInfoError: '',
      additionalInfoEntireError: '',
      termiteInspectionAdditionalInfoError: '',
      surveyAdditionalInfoError: '',
      nameError: '',
      addressError: '',
      earnestMoneyDateError: '',
      homeInspectionAdditionalInfoError: '',
      lenderDateError: '',
      homeInspectionDateError: '',
      termiteInspectionDateError: '',
      optionPeriodEndsDateError: '',
      appraisalDateError: '',
      dueDateError: '',
      commitmentDateError: '',
      closingDateError: '',
      loading: false,
    };
  }

  isFormEmpty = () => {
    const {
      name,
      amountOfContract,
      earnestMoneyDate,
      homeInspectionDate,
      termiteInspectionDate,
      optionPeriodEndsDate,
      commitmentDate,
      dueDate,
      appraisalDate,
      closingDate,
      lenderDate,
      titleCompany,
      homeInspectionAdditionalInfo,
      termiteInspectionAdditionalInfo,
      appraisalAdditionalInfo,
      surveyAdditionalInfo,
      additionalInfoEntire,
      lenderToggle,
      earnestMoneyToggle,
    } = this.state;

    let isEmpty = true;

    if (
      name ||
      amountOfContract ||
      (earnestMoneyToggle && earnestMoneyDate) ||
      homeInspectionDate ||
      termiteInspectionDate ||
      optionPeriodEndsDate ||
      commitmentDate ||
      dueDate ||
      appraisalDate ||
      closingDate ||
      (lenderToggle && lenderDate) ||
      titleCompany ||
      homeInspectionAdditionalInfo ||
      termiteInspectionAdditionalInfo ||
      appraisalAdditionalInfo ||
      surveyAdditionalInfo ||
      additionalInfoEntire
    ) {
      isEmpty = false;
    }

    console.log('isEmpty form --->>>>', isEmpty, {
      name,
      amountOfContract,
      earnestMoneyDate,
      homeInspectionDate,
      termiteInspectionDate,
      optionPeriodEndsDate,
      commitmentDate,
      dueDate,
      appraisalDate,
      closingDate,
      lenderDate,
      titleCompany,
      homeInspectionAdditionalInfo,
      termiteInspectionAdditionalInfo,
      appraisalAdditionalInfo,
      surveyAdditionalInfo,
      additionalInfoEntire,
    });

    return isEmpty;
  };
  isReqRuntimeError = (value, errorPropertyName, error, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    }
    // else if (_.isEmpty(value))
    //   this.setState({ [errorPropertyName]: `${error} is required` });
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForName = (
    value,
    errorPropertyName,
    error,
    secondError,
    checkLength,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (!util.isValidName(value))
      this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value) && errorPropertyName === 'nameError')
      this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForNumber = (
    value,
    errorPropertyName,
    error,
    secondError,
    checkLength,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (value && !util.isNumber(value))
      this.setState({[errorPropertyName]: secondError});
    // else if (_.isEmpty(value))
    //   this.setState({ [errorPropertyName]: `${error} is required` });
    else this.setState({[errorPropertyName]: ''});
  };

  setToggle = (key, boolean) => {
    this.setState({[key]: boolean});
  };
  setValue = key => {
    this.setState(key);
  };
  addressFocus = () => {
    this.addressRef.focus();
  };
  amountFocus = () => {
    this.amountRef.focus();
  };
  titleCompanyFocus = () => {
    this.titleCompanyRef.focus();
  };
  validate = () => {
    const {
      name,
      address,
      amountOfContract,
      titleCompany,
      earnestMoneyDate,
      lenderDate,
      homeInspectionDate,
      termiteInspectionDate,
      optionPeriodEndsDate,
      appraisalDate,
      dueDate,
      commitmentDate,
      closingDate,
      earnestMoneyToggle,
      homeToggle,
      lenderToggle,
    } = this.state;
    const newErrorState = {
      nameError: '',
      addressError: '',
      amountOfContractError: '',
      titleCompanyError: '',
      earnestMoneyDateError: '',
      lenderDateError: '',
      homeInspectionDateError: '',
      termiteInspectionDateError: '',
      optionPeriodEndsDateError: '',
      appraisalDateError: '',
      dueDateError: '',
      commitmentDateError: '',
      closingDateError: '',
    };

    let hasError = false;
    // if (_.isEmpty(name)) {
    //   newErrorState.nameError = 'Name is required';
    //   if (!hasError) this.nameRef.focus();
    //   hasError = true;
    // }
    if (name && !util.isValidName(name)) {
      newErrorState.nameError = 'Enter valid Name containing alphabets only';
      if (!hasError) this.nameRef.focus();
      hasError = true;
    }
    // if (_.isEmpty(address)) {
    //   newErrorState.addressError = 'Address is required';
    //   if (!hasError) this.addressRef.focus();
    //   hasError = true;
    // }
    // if (_.isEmpty(amountOfContract)) {
    //   newErrorState.amountOfContractError = 'Amount of contract is required';
    //   if (!hasError) this.amountRef.focus();
    //   hasError = true;
    // } else if (!util.isNumber(amountOfContract)) {
    //   newErrorState.amountOfContractError =
    //     'Enter valid amount containing digits only';
    //   if (!hasError) this.amountRef.focus();
    //   hasError = true;
    // }
    if (amountOfContract && !util.isNumber(amountOfContract)) {
      newErrorState.amountOfContractError =
        'Enter valid amount containing digits only';
      if (!hasError) this.amountRef.focus();
      hasError = true;
    }
    // NEW: REMOVE VALIDATION
    // if (_.isEmpty(titleCompany)) {
    //   newErrorState.titleCompanyError = 'Title company is required';
    //   if (!hasError) this.titleCompanyRef.focus();
    //   hasError = true;
    // }

    if (titleCompany && !util.isValidName(titleCompany)) {
      newErrorState.titleCompanyError =
        'Enter valid Title containing alphabets only';
      if (!hasError) this.titleCompanyRef.focus();
      hasError = true;
    }
    // if (earnestMoneyToggle && !!!earnestMoneyDate) {
    //   newErrorState.earnestMoneyDateError = 'Date is required';
    //   hasError = true;
    // }

    // NEW: REMOVE VALIDATION
    // if (lenderToggle && !!!lenderDate) {
    //   newErrorState.lenderDateError = 'Date is required';
    //   hasError = true;
    // }
    // if (!!!homeInspectionDate) {
    //   newErrorState.homeInspectionDateError = 'Date and Time is required';
    //   hasError = true;
    // }
    // if (!!!termiteInspectionDate) {
    //   newErrorState.termiteInspectionDateError = 'Date and Time is required';
    //   hasError = true;
    // }
    // NEW: REMOVE VALIDATION
    // if (!!!optionPeriodEndsDate) {
    //   newErrorState.optionPeriodEndsDateError = 'Date and Time is required';
    //   hasError = true;
    // }
    // if (!!!appraisalDate) {
    //   newErrorState.appraisalDateError = 'Date is required';
    //   hasError = true;
    // }
    // if (homeToggle && !!!dueDate) {
    //   newErrorState.dueDateError = 'Date is required';
    //   hasError = true;
    // }
    // NEW: REMOVE VALIDATION
    // if (!!!commitmentDate) {
    //   newErrorState.commitmentDateError = 'Date is required';
    //   hasError = true;
    // }
    // if (!!!closingDate) {
    //   newErrorState.closingDateError = 'Date is required';
    //   hasError = true;
    // }
    this.setState(newErrorState);
    return !hasError;
  };
  setLoading = boolean => {
    this.setState({loading: boolean});
  };
  onSave = () => {
    const {
      props: {addBuyerRequest, updateBuyerRequest, propertyId},
      state: {
        name,
        address,
        amountOfContract,
        earnestMoneyToggle,
        earnestMoneyDate,
        homeInspectionDate,
        termiteInspectionDate,
        optionPeriodEndsDate,
        commitmentDate,
        surveyToggle,
        newSurveyToggle,
        dueDate,
        appraisalDate,
        closingDate,
        CDAToggle,
        homeToggle,
        switchToggle,
        lenderToggle,
        lenderDate,
        titleCompany,
        homeInspectionAdditionalInfo,
        termiteInspectionAdditionalInfo,
        appraisalAdditionalInfo,
        surveyAdditionalInfo,
        additionalInfoEntire,
      },
      validate,
      setLoading,
    } = this;

    // if (!validate()) return;

    const payload = {
      buyer_name: name?.trim(),
      address: address?.trim(),
      amount_of_contract: amountOfContract?.toString()?.trim(),
      is_earnest_money_received: earnestMoneyToggle ? 1 : 0,
      is_contract_to_lender: lenderToggle ? 1 : 0,
      is_survey_received: surveyToggle ? 1 : 0,
      is_new_survey: newSurveyToggle ? 1 : 0,
      is_home_warranty: homeToggle ? 1 : 0,
      is_switch_over_utilities: switchToggle ? 1 : 0,
      title_company_closer: titleCompany.trim(),
      earnest_money_received_date: util.convertDateIntoUtc(earnestMoneyDate),
      contract_to_lender_date: util.convertDateIntoUtc(lenderDate),
      home_inspection_date: util.convertDateTimeIntoUtc(homeInspectionDate),
      termite_inspection_date: util.convertDateTimeIntoUtc(
        termiteInspectionDate,
      ),
      option_period_end: util.convertDateTimeIntoUtc(optionPeriodEndsDate),
      appraisal_date: util.convertDateIntoUtc(appraisalDate),
      home_warranty_date: util.convertDateIntoUtc(dueDate),
      title_commitment: util.convertDateIntoUtc(commitmentDate),
      home_inspection_info: homeInspectionAdditionalInfo?.trim(),
      termite_inspection_info: termiteInspectionAdditionalInfo?.trim(),
      new_survey_info: surveyAdditionalInfo?.trim(),
      additional_info_entire: additionalInfoEntire?.trim(),
      property_id: propertyId ?? this.props?.item?.propertyId,
      appraisal_additional_info: appraisalAdditionalInfo?.trim(),
    };

    setLoading(true);
    if (this.props?.item?.id) {
      payload.property_buyer_id = this.props?.item?.id;

      console.log({payload, detailItem: this.props});

      updateBuyerRequest(payload, res => {
        setLoading(false);
        if (!res) return;
        util.topAlert('Buyer updated successfully', 'success');
        setTimeout(() => {
          this.props?.fromProperDetail
            ? Actions.pop()
            : Actions.popTo('buyers');
        }, 1000);
      });
    } else {
      addBuyerRequest(payload, res => {
        setLoading(false);
        if (!res) return;
        util.topAlert('Buyer added successfully', 'success');
        setTimeout(() => {
          Actions.pop();
        }, 1000);
      });
    }
  };
  render() {
    const {
      name,
      nameError,
      amountOfContract,
      amountOfContractError,
      address,
      addressError,
      titleCompany,
      titleCompanyError,
      earnestMoneyDate,
      lenderDate,
      homeInspectionDate,
      termiteInspectionDate,
      optionPeriodEndsDate,
      surveyAdditionalInfo,
      appraisalDate,
      dueDate,
      commitmentDate,
      closingDate,
      earnestMoneyToggle,
      lenderToggle,
      describeToggle,
      surveyToggle,
      newSurveyToggle,
      homeToggle,
      switchToggle,
      CDAToggle,
      earnestMoneyDateError,
      lenderDateError,
      homeInspectionDateError,
      termiteInspectionDateError,
      optionPeriodEndsDateError,
      appraisalDateError,
      dueDateError,
      commitmentDateError,
      closingDateError,
      loading,
      homeInspectionAdditionalInfo,
      termiteInspectionAdditionalInfo,
      additionalInfoEntire,
      appraisalAdditionalInfo,
      homeInspectionAdditionalInfoError,
      termiteInspectionAdditionalInfoError,
      surveyAdditionalInfoError,
      appraisalAdditionalInfoError,
      additionalInfoEntireError,
    } = this.state;
    return (
      <AddBuyerDetailsView
        setValue={this.setValue}
        name={name}
        nameError={nameError}
        address={address}
        addressError={addressError}
        amountOfContract={amountOfContract}
        amountOfContractError={amountOfContractError}
        titleCompany={titleCompany}
        titleCompanyError={titleCompanyError}
        nameRef={ref => {
          this.nameRef = ref;
        }}
        addressRef={ref => {
          this.addressRef = ref;
        }}
        amountRef={ref => {
          this.amountRef = ref;
        }}
        titleCompanyRef={ref => {
          this.titleCompanyRef = ref;
        }}
        addressFocus={this.addressFocus}
        amountFocus={this.amountFocus}
        titleCompanyFocus={this.titleCompanyFocus}
        onSave={this.onSave}
        earnestMoneyDate={earnestMoneyDate}
        lenderDate={lenderDate}
        homeInspectionDate={homeInspectionDate}
        termiteInspectionDate={termiteInspectionDate}
        optionPeriodEndsDate={optionPeriodEndsDate}
        surveyAdditionalInfo={surveyAdditionalInfo}
        homeInspectionAdditionalInfoError={homeInspectionAdditionalInfoError}
        termiteInspectionAdditionalInfoError={
          termiteInspectionAdditionalInfoError
        }
        surveyAdditionalInfoError={surveyAdditionalInfoError}
        appraisalAdditionalInfoError={appraisalAdditionalInfoError}
        additionalInfoEntireError={additionalInfoEntireError}
        appraisalDate={appraisalDate}
        dueDate={dueDate}
        commitmentDate={commitmentDate}
        closingDate={closingDate}
        setToggle={this.setToggle}
        earnestMoneyToggle={earnestMoneyToggle}
        lenderToggle={lenderToggle}
        describeToggle={describeToggle}
        surveyToggle={surveyToggle}
        newSurveyToggle={newSurveyToggle}
        homeToggle={homeToggle}
        switchToggle={switchToggle}
        CDAToggle={CDAToggle}
        earnestMoneyDateError={earnestMoneyDateError}
        lenderDateError={lenderDateError}
        homeInspectionDateError={homeInspectionDateError}
        termiteInspectionDateError={termiteInspectionDateError}
        optionPeriodEndsDateError={optionPeriodEndsDateError}
        appraisalDateError={appraisalDateError}
        dueDateError={dueDateError}
        commitmentDateError={commitmentDateError}
        closingDateError={closingDateError}
        loading={loading}
        homeInspectionAdditionalInfo={homeInspectionAdditionalInfo}
        termiteInspectionAdditionalInfo={termiteInspectionAdditionalInfo}
        additionalInfoEntire={additionalInfoEntire}
        appraisalAdditionalInfo={appraisalAdditionalInfo}
        isReqRuntimeError={this.isReqRuntimeError}
        isReqRuntimeErrorForName={this.isReqRuntimeErrorForName}
        isReqRuntimeErrorForNumber={this.isReqRuntimeErrorForNumber}
        isFormEmpty={this.isFormEmpty()}
      />
    );
  }

  static propTypes = {};
  static defaultProps = {};
}

const mapStateToProps = ({}) => ({});

const actions = {
  addBuyerRequest,
  updateBuyerRequest,
};

export default connect(mapStateToProps, actions)(AddBuyerDetailsController);
