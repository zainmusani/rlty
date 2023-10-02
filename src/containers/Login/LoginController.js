import React from 'react';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import { Keyboard } from 'react-native';
import util from '../../util';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { StatusBar } from 'react-native';
import { INVALID_PASSWORD_ERROR, moreThanCharError } from '../../constants';
import { rememberCreDentialSuccess, removeCreDentialSuccess, userLoginRequest, userProfileRequest } from "../../actions/UserActions";
import { deviceTokenRequest } from "../../actions/GeneralActions";
import { connect } from 'react-redux';
import { Platform } from 'react-native';

let timeOut;

class LoginController extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: props?.credential?.email ? props?.credential?.email : '',
      emailError: '',
      password: props?.credential?.password ? props?.credential?.password : "",
      passwordError: '',
      remember: props?.credential?.email ? true : false,
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};
  componentDidMount() {
    if (Platform.OS == 'ios') {
      StatusBar.setBarStyle('dark-content', true); //<<--- add this
    }
  }

  isReqRuntimeErrorForEmail = (propertyName, errorPropertyName, error, secondError) => {
    if (_.isEmpty(propertyName)) this.setState({ [errorPropertyName]: `${error} is required` });
    else if (!util.isEmailValid(propertyName)) this.setState({ [errorPropertyName]: secondError });
    else this.setState({ [errorPropertyName]: '' });
  };

  isReqRuntimeErrorForPass = (propertyName, errorPropertyName, error) => {
    if (_.isEmpty(propertyName)) this.setState({ [errorPropertyName]: `${error} is required` });
    else if (!util.isPasswordValid(propertyName)) this.setState({ [errorPropertyName]: INVALID_PASSWORD_ERROR });
    else this.setState({ [errorPropertyName]: '' });
  };

  onPasswordChange = password => {
    // this.isReqRuntimeErrorForPass(password, "passwordError", "Password");
    // if (util.checkLength(password, 10)) {
    //   clearTimeout(timeOut);
    //   this.setState({ passwordError: moreThanCharError(10) }, () => {
    //     timeOut = setTimeout(() => this.isReqRuntimeErrorForPass(password, "passwordError", "Password"), 1000);
    //   });
    //   return;
    // }
    this.setState({ password });
  };
  onEmailChange = email => {
    this.isReqRuntimeErrorForEmail(email, "emailError", "Email", 'Invalid Email!');
    this.setState({ email });
  };
  onRememberChange = remember => {
    this.setState({ remember });
  };
  onEmailSubmit = () => {
    this.passRef.focus();
  };

  setLoading = boolean => {
    this.setState({ loading: boolean });
  };

  signIn = () => {
    Keyboard.dismiss();
    if (!this._validateForm()) return;
    const {
      props: { userLoginRequest, fcmToken, deviceTokenRequest, rememberCreDentialSuccess, removeCreDentialSuccess, userProfileRequest },
      state: { email, password, remember },
      setLoading
    } = this;

    setLoading(true);
    const payload = { email: email?.trim(), password };
    userLoginRequest(payload, res => {
      if (!res) return setLoading(false);
      userProfileRequest({}, res => {
        setLoading(false);
        fcmToken && deviceTokenRequest({ device_token: fcmToken, device_platform: Platform.OS === 'android' ? 'android' : 'ios' });
        if (res?.is_checked) Actions.reset('dashboard');
        else Actions.reset('subscription');
        if (remember) rememberCreDentialSuccess(payload);
        else removeCreDentialSuccess();
      });
    });
  };

  _validateForm() {
    const { email, password } = this.state;
    let newErrorState = { emailError: '', passwordError: '' };

    let hasError = false;
    if (!util.isEmailValid(email)) {
      newErrorState.emailError = 'Invalid email!';
      hasError = true;
    }
    if (_.isEmpty(email)) {
      // Number is required
      newErrorState.emailError = 'Email is required';
      hasError = true;
    }
    if (_.isEmpty(password)) {
      // password is required
      newErrorState.passwordError = 'Password is required';
      hasError = true;
    }
    // else if (!util.isPasswordValid(password)) {
    //   newErrorState.passwordError = INVALID_PASSWORD_ERROR;
    //   hasError = true;
    // };


    this.setState(newErrorState);

    return !hasError;
  }
  render() {
    const { email, emailError, password, passwordError, remember, loading } = this.state;
    return (
      <LoginView
        {...this.props}
        passRef={ref => {
          this.passRef = ref;
        }}
        emailRef={ref => {
          this.emailRef = ref;
        }}
        email={email}
        emailError={emailError}
        remember={remember}
        password={password}
        passwordError={passwordError}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onRememberChange={this.onRememberChange}
        onEmailSubmit={this.onEmailSubmit}
        signIn={this.signIn}
        loading={loading}
        setLoading={this.setLoading}
      />
    );
  }
}


const mapStateToProps = ({ user, general }) => ({
  credential: user?.credential,
  fcmToken: general.fcmToken
});

const actions = {
  userLoginRequest,
  userProfileRequest,
  rememberCreDentialSuccess,
  removeCreDentialSuccess,
  deviceTokenRequest,
};

export default connect(mapStateToProps, actions)(LoginController);