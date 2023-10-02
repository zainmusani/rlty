import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  sendOtpRequest,
  signupOtpRequest,
  signupStepThreeRequest,
  userProfileRequest,
} from '../../actions/UserActions';
import {deviceTokenRequest} from '../../actions/GeneralActions';
import {
  INVALID_PASSWORD_ERROR,
  moreThanCharError,
  ONLY_CHAR_NUM_ERROR,
} from '../../constants';
import util from '../../util';
import RegisterView from './RegisterView';
let timeOutForPass;
let timeOutForConPass;
class RegisterController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step || 1,
      name: '',
      nameError: '',
      number: '',
      numberError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      agencyName: '',
      agencyNameError: '',
      location: '',
      locationError: '',
      bio: '',
      bioError: '',
      from: moment('09 AM', 'hh:mm a'),
      to: moment('05 PM', 'hh:mm a'),
      timeError: '',
      selected: null,
      showTimerModal: false,
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

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
    thirdError,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (!util.isValidName(value))
      this.setState({[errorPropertyName]: secondError});
    else if (thirdError && value.trim().length <= 2)
      this.setState({[errorPropertyName]: thirdError});
    else if (_.isEmpty(value))
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
    } else if (!util.isNumber(value))
      this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value))
      this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForEmail = (
    propertyName,
    errorPropertyName,
    error,
    secondError,
  ) => {
    if (_.isEmpty(propertyName))
      this.setState({[errorPropertyName]: `${error} is required`});
    else if (!util.isEmailValid(propertyName))
      this.setState({[errorPropertyName]: secondError});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForPass = (propertyName, errorPropertyName, error) => {
    if (_.isEmpty(propertyName))
      this.setState({[errorPropertyName]: `${error} is required`});
    else if (!util.isPasswordValid(propertyName))
      this.setState({[errorPropertyName]: INVALID_PASSWORD_ERROR});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForConPass = propertyName => {
    if (_.isEmpty(propertyName))
      this.setState({confirmPasswordError: `Confirm Password is required`});
    else if (this.state.password !== propertyName)
      this.setState({confirmPasswordError: 'Passwords do not match'});
    else this.setState({confirmPasswordError: ''});
  };

  onNameChange = name => {
    if (
      this.isReqRuntimeErrorForName(
        name,
        'nameError',
        'Name',
        'Enter valid Name containing alphabets only',
        72,
        'Name should contain at least three characters',
      )
    )
      return;
    this.setState({name});
  };
  onEmailChange = email => {
    this.isReqRuntimeErrorForEmail(
      email,
      'emailError',
      'Email',
      'Invalid Email!',
    );
    this.setState({email});
  };
  onPasswordChange = password => {
    this.isReqRuntimeErrorForPass(password, 'passwordError', 'Password');
    if (util.checkLength(password, 10)) {
      clearTimeout(timeOutForPass);
      this.setState({passwordError: moreThanCharError(10)}, () => {
        timeOutForPass = setTimeout(
          () =>
            this.isReqRuntimeErrorForPass(
              password,
              'passwordError',
              'Password',
            ),
          1000,
        );
      });
      return;
    }
    this.setState({password});
  };
  onConfirmPasswordChange = confirmPassword => {
    this.isReqRuntimeErrorForConPass(confirmPassword);
    if (util.checkLength(confirmPassword, 10)) {
      clearTimeout(timeOutForConPass);
      this.setState({confirmPasswordError: moreThanCharError(10)}, () => {
        timeOutForConPass = setTimeout(
          () => this.isReqRuntimeErrorForConPass(confirmPassword),
          1000,
        );
      });
      return;
    }
    this.setState({confirmPassword});
  };
  onAgencyChange = agencyName => {
    if (
      this.isReqRuntimeErrorForName(
        agencyName,
        'agencyNameError',
        'Agency name',
        'Enter valid Name containing alphabets only',
        30,
      )
    )
      return;
    this.setState({agencyName});
  };
  onLocationChange = location => {
    if (this.isReqRuntimeError(location, 'locationError', 'Location', 255))
      return;
    this.setState({location});
  };
  onBioChange = bio => {
    if (util.checkLength(bio, 255)) {
      this.setState({bioError: 'more than 255 characters not allowed'});
      return;
    } else if (!!bio && !/[a-zA-Z]/.test(bio))
      this.setState({bioError: ONLY_CHAR_NUM_ERROR});
    else this.setState({bioError: ''});

    this.setState({bio});
  };
  onNumberChange = (num, isValid) => {
    if (_.isEmpty(num)) {
      this.setState({numberError: 'Number is required'});
    } else if (!isValid) {
      this.setState({numberError: 'Invalid Number!'});
    } else {
      this.setState({numberError: ''});
    }

    if (isValid) {
      this.setState({number: num.split(' ').join('')});
    } else {
      this.setState({number: 'invalid'});
    }
  };
  changeStep = (add, doValidate = true) => {
    Keyboard.dismiss();
    if (add) {
      if (doValidate) {
        if (this.validate()) {
          if (this.state.step < 3) {
            this.setState({step: this.state.step + 1});
          } else {
            Actions.reset('registerSuccess');
          }
        }
      } else {
        this.setState({step: this.state.step + 1});
      }
    } else {
      if (this.state.step > 1) this.setState({step: this.state.step - 1});
    }
  };

  validate = () => {
    const {
      step,
      name,
      number,
      email,
      agencyName,
      location,
      password,
      confirmPassword,
      from,
      to,
      bio,
    } = this.state;
    if (step === 1) {
      const newErrorState = {
        nameError: '',
        numberError: '',
        emailError: '',
        passwordError: '',
        bioError: '',
        confirmPasswordError: '',
      };
      let hasError = false;
      if (password !== confirmPassword) {
        newErrorState.confirmPasswordError = 'Passwords do not match';
        if (!hasError) this.cnfPasRef.focus();
        hasError = true;
      }
      if (_.isEmpty(name)) {
        newErrorState.nameError = 'Name is required';
        if (!hasError) this.nameRef.focus();
        hasError = true;
      }
      if (!util.isValidName(name)) {
        newErrorState.nameError = 'Enter valid Name containing alphabets only';
        if (!hasError) this.nameRef.focus();
        hasError = true;
      }
      if (name.trim().length <= 2) {
        newErrorState.nameError =
          'Name should contain at least three characters';
        if (!hasError) this.nameRef.focus();
        hasError = true;
      }
      if (number === 'invalid') {
        newErrorState.numberError = 'Invalid Number!';
        if (!hasError) this.numRef.focus();
        hasError = true;
      }
      if (_.isEmpty(number)) {
        newErrorState.numberError = 'Number is required';
        if (!hasError) this.numRef.focus();
        hasError = true;
      }

      if (!util.isEmailValid(email)) {
        newErrorState.emailError = 'Invalid Email!';
        if (!hasError) this.emailRef.focus();
        hasError = true;
      }
      if (_.isEmpty(email)) {
        newErrorState.emailError = 'Email is required';
        if (!hasError) this.emailRef.focus();
        hasError = true;
      }
      if (!util.isPasswordValid(password)) {
        newErrorState.passwordError = INVALID_PASSWORD_ERROR;
        if (!hasError) this.passRef.focus();
        hasError = true;
      }
      if (_.isEmpty(confirmPassword)) {
        newErrorState.confirmPasswordError = 'Confirm Password is required';
        hasError = true;
      }
      if (_.isEmpty(password)) {
        // password is required
        newErrorState.passwordError = 'Password is required';
        if (!hasError) this.passRef.focus();
        hasError = true;
      }
      this.setState(newErrorState);
      return !hasError;
    } else if (step === 2) {
      util.topAlert('Code is required!');
      return false;
    } else if (step === 3) {
      const newErrorState = {
        agencyNameError: '',
        locationError: '',
        timeError: '',
      };
      let hasError = false;
      if (_.isEmpty(agencyName)) {
        newErrorState.agencyNameError = 'Agency name is required';
        if (!hasError) this.agencyRef.focus();
        hasError = true;
      }
      if (!util.isValidName(agencyName)) {
        newErrorState.agencyNameError =
          'Enter valid Name containing alphabets only';
        if (!hasError) this.agencyRef.focus();
        hasError = true;
      }
      if (_.isEmpty(location)) {
        newErrorState.locationError = 'Location is required';
        if (!hasError) this.locationRef.focus();
        hasError = true;
      }
      if (util.checkIsEndTimeAfterStartTime(from, to)) {
        newErrorState.timeError = 'End time Should be after start time';
        hasError = true;
      }

      if (!!bio && !/[a-zA-Z]/.test(bio)) {
        newErrorState.bioError = ONLY_CHAR_NUM_ERROR;
        if (!hasError) this.bioRef.focus();
        hasError = true;
      }
      this.setState(newErrorState);
      return !hasError;
    }
  };
  onCodeSubmit = (code, ref) => {
    const {
      state: {name, email, confirmPassword, number},
      props: {
        signupOtpRequest,
        userDate: {},
      },
      changeStep,
      setLoading,
    } = this;

    setLoading(true);
    const payload = {
      name: name?.trim(),
      email: email?.trim(),
      password: confirmPassword,
      phone: number,
      otp: code,
    };
    signupOtpRequest(payload, res => {
      setLoading(false);
      if (!res) return ref.current.clear();
      changeStep(true, false);
    });
  };
  onTimerPress = selection => {
    this.setState({selected: selection, showTimerModal: true});
  };
  onTimerModalSubmit = time => {
    const finalTime = moment(time);
    if (this.state.selected === 'from')
      this.setState({from: finalTime, showTimerModal: false});
    else this.setState({to: finalTime, showTimerModal: false});
  };
  padValue = value => {
    return value < 10 ? '0' + value : value;
  };

  setLoading = boolean => {
    this.setState({loading: boolean});
  };

  sendOtp = (step, topALert) => {
    const {
      state: {email, name},
      props: {sendOtpRequest},
      changeStep,
      setLoading,
    } = this;

    !step && setLoading(true);

    sendOtpRequest({email: email?.trim(), name: name?.trim()}, res => {
      setLoading(false);
      if (!res) return;
      topALert && util.topAlert('OTP Resend successfully', 'success');
      step && changeStep(true);
    });
  };

  nextStepHandler = () => {
    if (!this.validate()) return;
    const {
      state: {step, agencyName, location, from, to, bio},
      props: {
        signupStepThreeRequest,
        userProfileRequest,
        fcmToken,
        deviceTokenRequest,
        userDate: {id},
      },
      changeStep,
      setLoading,
      sendOtp,
    } = this;

    setLoading(true);

    if (step === 1) {
      sendOtp(1);
    }

    if (step === 3) {
      const payload = {
        userId: id,
        agencyName: agencyName?.trim(),
        bio: bio?.trim(),
        location: location?.trim(),
        availabilityFrom: _.cloneDeep(from).utc().format('HH:mm:ss'),
        availabilityTo: _.cloneDeep(to).utc().format('HH:mm:ss'),
      };

      signupStepThreeRequest(payload, res => {
        userProfileRequest();
        setLoading(false);
        if (!res) return;
        fcmToken &&
          deviceTokenRequest({
            device_token: fcmToken,
            device_platform: Platform.OS === 'android' ? 'android' : 'ios',
          });
        changeStep(true);
      });
    }
  };

  onResendOtp = () => {
    this.sendOtp(false, true);
  };

  render() {
    const {
      step,
      name,
      nameError,
      number,
      numberError,
      email,
      emailError,
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
      agencyName,
      agencyNameError,
      location,
      locationError,
      bio,
      bioError,
      from,
      to,
      showTimerModal,
      timeError,
      loading,
    } = this.state;
    return (
      <RegisterView
        {...this.props}
        nameRef={ref => {
          this.nameRef = ref;
        }}
        numRef={ref => {
          this.numRef = ref;
        }}
        passRef={ref => {
          this.passRef = ref;
        }}
        cnfPasRef={ref => {
          this.cnfPasRef = ref;
        }}
        emailRef={ref => {
          this.emailRef = ref;
        }}
        agencyRef={ref => {
          this.agencyRef = ref;
        }}
        locationRef={ref => {
          this.locationRef = ref;
        }}
        bioRef={ref => {
          this.bioRef = ref;
        }}
        step={step}
        propStep={this.props.step}
        name={name}
        nameError={nameError}
        number={number}
        numberError={numberError}
        email={email}
        emailError={emailError}
        password={password}
        confirmPassword={confirmPassword}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        agencyName={agencyName}
        agencyNameError={agencyNameError}
        location={location}
        locationError={locationError}
        timeError={timeError}
        bio={bio}
        bioError={bioError}
        from={from}
        to={to}
        showTimerModal={showTimerModal}
        onCodeSubmit={this.onCodeSubmit}
        onNameChange={this.onNameChange}
        onNumberChange={this.onNumberChange}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onConfirmPasswordChange={this.onConfirmPasswordChange}
        onAgencyChange={this.onAgencyChange}
        onLocationChange={this.onLocationChange}
        onBioChange={this.onBioChange}
        changeStep={this.changeStep}
        onTimerPress={this.onTimerPress}
        onResendOtp={this.onResendOtp}
        onTimerModalSubmit={this.onTimerModalSubmit}
        onTimeModalCancel={() => {
          this.setState({showTimerModal: false});
        }}
        onNameSubmit={() => {
          if (this.numRef) this.numRef.focus();
        }}
        onNumberSubmit={() => {
          if (this.emailRef) this.emailRef.focus();
        }}
        onEmailSubmit={() => {
          if (this.passRef) this.passRef.focus();
        }}
        onPassSubmit={() => {
          if (this.cnfPasRef) this.cnfPasRef.focus();
        }}
        onAgencySubmit={() => {
          if (this.locationRef) this.locationRef.focus();
        }}
        onLocationSubmit={() => {
          if (this.bioRef) this.bioRef.focus();
        }}
        nextStepHandler={this.nextStepHandler}
        loading={loading}
        selected={this.state.selected}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  userDate: user.data,
  fcmToken: general.fcmToken,
});

const actions = {
  signupStepThreeRequest,
  userProfileRequest,
  signupOtpRequest,
  sendOtpRequest,
  deviceTokenRequest,
};

export default connect(mapStateToProps, actions)(RegisterController);
