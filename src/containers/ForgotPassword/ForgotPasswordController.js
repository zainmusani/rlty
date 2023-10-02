import React from 'react';
import PropTypes from 'prop-types';
import {Keyboard} from 'react-native';
import ForgotPasswordView from './ForgotPasswordView';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import util from '../../util';
import {forgotPasswordRequest, confirmOtpRequest} from "../../actions/UserActions";
import {connect} from 'react-redux';


class ForgotPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      showOtp: false,
      email: '',
      emailError: '',
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  isReqRuntimeErrorForEmail = (propertyName, errorPropertyName, error, secondError) => {
    if (_.isEmpty(propertyName)) this.setState({[errorPropertyName]: `${error} is required`});
    else if (!util.isEmailValid(propertyName)) this.setState({[errorPropertyName]: secondError});
    else this.setState({[errorPropertyName]: ''});
  };

  onEmailChange = email => {
    this.isReqRuntimeErrorForEmail(email, "emailError", "Email", 'Invalid Email!');
    this.setState({email});
  };

  onResendOtp = () => {
    this.sendOtp(true);
  };

  setLoading = boolean => {
    this.setState({loading: boolean});
  };

  sendOtp = (topALert) => {
    const {
      state: {email},
      props: {forgotPasswordRequest},
      setLoading,
    } = this;

    setLoading(true);
    forgotPasswordRequest({email: email?.trim()}, (res, err) => {
      setLoading(false);
      if (!res) return;
      topALert && util.topAlert('OTP Resend successfully', 'success');
      this.setState({showOtp: true});
    });
  };

  onSubmitPress = () => {
    Keyboard.dismiss();
    const {
      state: {showOtp, email},
      validateForm,
      sendOtp
    } = this;

    if (showOtp) return util.topAlert('Code is required!');
    if (!validateForm()) return;
    sendOtp();
  };

  onCodeSubmit = (code, ref) => {
    const {
      state: {email},
      props: {confirmOtpRequest},
      setLoading,
    } = this;

    setLoading(true);
    confirmOtpRequest({email: email?.trim(), otp: code}, res => {
      setLoading(false);
      if (!res) return ref.current.clear();
      Actions.reset('resetPassword');
    });
  };
  validateForm = () => {
    const {email} = this.state;
    const newErrorState = {emailError: ''};
    let hasError = false;
    if (!util.isEmailValid(email)) {
      newErrorState.emailError = 'Invalid Email!';
      hasError = true;
    }
    if (_.isEmpty(email)) {
      newErrorState.emailError = 'Email is required';
      hasError = true;
    }
    this.setState(newErrorState);

    return !hasError;
  };
  render() {
    const {showOtp, emailError, email, loading} = this.state;
    return (
      <ForgotPasswordView
        email={email}
        emailError={emailError}
        onSubmitPress={this.onSubmitPress}
        onCodeSubmit={this.onCodeSubmit}
        onResendOtp={this.onResendOtp}
        showOtp={showOtp}
        onEmailChange={this.onEmailChange}
        loading={loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({
});

const actions = {
  forgotPasswordRequest,
  confirmOtpRequest
};

export default connect(mapStateToProps, actions)(ForgotPasswordController);