import React from 'react';
import PropTypes from 'prop-types';
import AddSellerDetailsView from './AddSellerDetailsView';
import _ from 'lodash';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {
  addSellerRequest,
  addSellerEditRequest,
} from '../../actions/propertyActions';
import {connect} from 'react-redux';
import {moreThanCharError} from '../../constants';

// export default class AddSellerDetailsController extends React.Component {
class AddSellerDetailsController extends React.Component {
  constructor(props) {
    const {item} = props || {};
    console.log({item});
    super(props);
    this.state = {
      name: item?.name ? item.name : '',
      nameError: '',
      address: props?.addressFromDetailView ?? item?.address,
      addressError: '',
      amountOfContract: item?.amountOfContract
        ? item?.amountOfContract.toString()?.trim()
        : '',
      amountOfContractError: '',
      titleCompany: item?.companyName ? item.companyName : '',
      titleCompanyError: '',
      loading: false,
      homeToggle: item?.isHomeWarranty
        ? item.isHomeWarranty
          ? true
          : false
        : false,
      earnestMoneyToggle: item?.isEarnestMoneyReceived ? true : false,
      lenderToggle: item?.isContractToLender
        ? item.isContractToLender
          ? true
          : false
        : false,
      surveyToggle: item?.isSurveyReceived
        ? item.isSurveyReceived
          ? true
          : false
        : false,
      newSurveyToggle: item?.isNewSurvey
        ? item.isNewSurvey
          ? true
          : false
        : false,
      switchToggle: item?.isSwitchOverutilities
        ? item.isSwitchOverutilities
          ? true
          : false
        : false,
      CDAToggle: true,
      earnestMoneyDate:
        item?.earnestMoneyReceivedDate && item?.earnestMoneyReceivedDate !== '-'
          ? item.earnestMoneyReceivedDate
          : '',
      lenderDate:
        item?.contractToLenderDate && item?.contractToLenderDate !== '-'
          ? item.contractToLenderDate
          : '',
      optionPeriodEndsDate:
        item?.optionPeriodEndDate && item?.optionPeriodEndDate !== '-'
          ? item.optionPeriodEndDate
          : '',
      homeInspectionDate:
        item?.homeInspectionDate && item?.homeInspectionDate !== '-'
          ? item.homeInspectionDate
          : '',
      termiteInspectionDate:
        item?.termiteInspectionDate && item?.termiteInspectionDate !== '-'
          ? item.termiteInspectionDate
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
      homeInspectionAdditionalInfoError: '',
      termiteInspectionAdditionalInfoError: '',
      surveyAdditionalInfoError: '',
      appraisalAdditionalInfoError: '',
      termiteInspectionAdditionalInfo: '',
      appraisalAdditionalInfo: item?.appraisalAdditionalInfo
        ? item.appraisalAdditionalInfo
        : '',
      surveyAdditionalInfo: item?.surveyInfo ? item.surveyInfo : '',
      additionalInfoEntire: item?.entireAdditionalInfo
        ? item.entireAdditionalInfo
        : '',
      additionalInfoEntireError: '',
      earnestMoneyDateError: '',
      lenderDateError: '',
      homeInspectionDateError: '',
      optionPeriodEndsDateError: '',
      termiteInspectionDateError: '',
      appraisalDateError: '',
      dueDateError: '',
      commitmentDateError: '',
      closingDateError: '',
    };
  }

  isFormEmpty = () => {
    const {
      name,
      amountOfContract,
      earnestMoneyToggle,
      earnestMoneyDate,
      homeInspectionDate,
      termiteInspectionDate,
      optionPeriodEndsDate,
      commitmentDate,
      dueDate,
      appraisalDate,
      closingDate,
      lenderToggle,
      lenderDate,
      titleCompany,
      homeInspectionAdditionalInfo,
      termiteInspectionAdditionalInfo,
      appraisalAdditionalInfo,
      surveyAdditionalInfo,
      additionalInfoEntire,
    } = this.state;

    let isEmpty = true;

    if (
      name ||
      amountOfContract ||
      titleCompany ||
      (earnestMoneyToggle && earnestMoneyDate) ||
      (lenderToggle && lenderDate) ||
      homeInspectionDate ||
      termiteInspectionDate ||
      appraisalDate ||
      dueDate ||
      optionPeriodEndsDate ||
      commitmentDate ||
      closingDate ||
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
      titleCompany,
      earnestMoneyDate,
      lenderDate,
      homeInspectionDate,
      termiteInspectionDate,
      appraisalDate,
      dueDate,
      optionPeriodEndsDate,
      commitmentDate,
      closingDate,
    });

    return isEmpty;
  };

  isReqRuntimeError = (value, errorPropertyName, error, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (_.isEmpty(value))
      this.setState({[errorPropertyName]: `${error} is required`});
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
    } else if (value && !util.isValidName(value))
      this.setState({[errorPropertyName]: secondError});
    // else if (_.isEmpty(value))
    //   this.setState({ [errorPropertyName]: `${error} is required` });
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
      appraisalDate,
      dueDate,
      optionPeriodEndsDate,
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
    // NEW: REMOVE VALIDATION
    // if (_.isEmpty(amountOfContract)) {
    //   newErrorState.amountOfContractError = 'Amount of contract is required';
    //   if (!hasError) this.amountRef.focus();
    //   hasError = true;
    // } else
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
    // if (!!!appraisalDate) {
    //   newErrorState.appraisalDateError = 'Date is required';
    //   hasError = true;
    // }

    // NEW: REMOVE VALIDATION

    // if (!!!optionPeriodEndsDate) {
    //   newErrorState.optionPeriodEndsDateError = 'Date and Time is required';
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
      props: {addSellerRequest, addSellerEditRequest, propertyId},
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
    if (!validate()) return;

    const payload = {
      seller_name: name?.trim(),
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
      appraisal_date: util.convertDateIntoUtc(appraisalDate),
      home_warranty_date: util.convertDateIntoUtc(dueDate),
      home_inspection_info: homeInspectionAdditionalInfo,
      termite_inspection_info: termiteInspectionAdditionalInfo,
      new_survey_info: surveyAdditionalInfo,
      additional_info_entire: additionalInfoEntire,
      property_id: propertyId ?? this?.props?.item?.propertyId,
      appraisal_additional_info: appraisalAdditionalInfo,
      option_period_end_date: util.convertDateTimeIntoUtc(optionPeriodEndsDate),
      title_commit_to_be_rec_date: util.convertDateIntoUtc(commitmentDate),
      // option_period_end: optionPeriodEndsDate,
      // title_commitment: commitmentDate,
    };

    if (this.props?.item?.id) {
      payload.property_seller_id = this.props?.item?.id;
      console.log({payload});
      setLoading(true);
      addSellerEditRequest(payload, res => {
        setLoading(false);
        if (!res) return;
        util.topAlert('Seller update successfully', 'success');
        setTimeout(() => {
          this.props?.fromProperDetail
            ? Actions.pop()
            : Actions.popTo('sellers');
        }, 1000);
      });
    } else {
      setLoading(true);
      addSellerRequest(payload, res => {
        setLoading(false);
        if (!res) return;
        util.topAlert('Seller added successfully', 'success');
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
      appraisalDate,
      dueDate,
      commitmentDate,
      closingDate,
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
      homeInspectionAdditionalInfoError,
      termiteInspectionAdditionalInfoError,
      surveyAdditionalInfoError,
      appraisalAdditionalInfoError,
      additionalInfoEntireError,
    } = this.state;
    return (
      <AddSellerDetailsView
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
        appraisalDate={appraisalDate}
        dueDate={dueDate}
        commitmentDate={commitmentDate}
        closingDate={closingDate}
        setToggle={this.setToggle}
        earnestMoneyToggle={earnestMoneyToggle}
        lenderToggle={lenderToggle}
        surveyToggle={surveyToggle}
        newSurveyToggle={newSurveyToggle}
        switchToggle={switchToggle}
        CDAToggle={CDAToggle}
        earnestMoneyDateError={earnestMoneyDateError}
        lenderDateError={lenderDateError}
        homeInspectionDateError={homeInspectionDateError}
        termiteInspectionDateError={termiteInspectionDateError}
        appraisalDateError={appraisalDateError}
        dueDateError={dueDateError}
        commitmentDateError={commitmentDateError}
        closingDateError={closingDateError}
        homeToggle={homeToggle}
        loading={loading}
        homeInspectionAdditionalInfo={homeInspectionAdditionalInfo}
        termiteInspectionAdditionalInfo={termiteInspectionAdditionalInfo}
        appraisalAdditionalInfo={appraisalAdditionalInfo}
        surveyAdditionalInfo={surveyAdditionalInfo}
        additionalInfoEntire={additionalInfoEntire}
        optionPeriodEndsDate={optionPeriodEndsDate}
        optionPeriodEndsDateError={optionPeriodEndsDateError}
        isReqRuntimeError={this.isReqRuntimeError}
        isReqRuntimeErrorForName={this.isReqRuntimeErrorForName}
        isReqRuntimeErrorForNumber={this.isReqRuntimeErrorForNumber}
        homeInspectionAdditionalInfoError={homeInspectionAdditionalInfoError}
        termiteInspectionAdditionalInfoError={
          termiteInspectionAdditionalInfoError
        }
        surveyAdditionalInfoError={surveyAdditionalInfoError}
        appraisalAdditionalInfoError={appraisalAdditionalInfoError}
        additionalInfoEntireError={additionalInfoEntireError}
        isFormEmpty={this.isFormEmpty()}
      />
    );
  }

  static propTypes = {};
  static defaultProps = {};
}

const mapStateToProps = ({}) => ({});

const actions = {
  addSellerRequest,
  addSellerEditRequest,
};

export default connect(mapStateToProps, actions)(AddSellerDetailsController);
