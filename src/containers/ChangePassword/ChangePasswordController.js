import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordView from './ChangePasswordView';
import _ from 'lodash';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {INVALID_PASSWORD_ERROR, moreThanCharError} from '../../constants';
import {resetPasswordRequest} from '../../actions/UserActions';
import {connect} from 'react-redux';

let timeOutForPass;
let timeOutForConPass;
let timeOutForOldPass;
class ChangePasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      oldPasswordError: '',
      newPassword: '',
      newPasswordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};
  isReqRuntimeErrorForPass = (propertyName, errorPropertyName, error) => {
    if (_.isEmpty(propertyName)) this.setState({[errorPropertyName]: `${error} is required`});
    else if (!util.isPasswordValid(propertyName)) this.setState({[errorPropertyName]: INVALID_PASSWORD_ERROR});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForConPass = (propertyName) => {
    if (_.isEmpty(propertyName)) this.setState({confirmPasswordError: `Confirm Password is required`});
    else if (this.state.password !== propertyName) this.setState({confirmPasswordError: 'Passwords do not match'});
    else this.setState({confirmPasswordError: ''});
  };

  onNewPasswordChange = newPassword => {
    this.isReqRuntimeErrorForPass(newPassword, "newPasswordError", "Password");
    if (util.checkLength(newPassword, 10)) {
      clearTimeout(timeOutForPass);
      this.setState({newPasswordError: moreThanCharError(10)}, () => {
        timeOutForPass = setTimeout(() => this.isReqRuntimeErrorForPass(newPassword, "newPasswordError", "Password"), 1000);
      });
      return;
    }
    this.setState({newPassword});
  };

  onConfirmPasswordChange = confirmPassword => {
    this.isReqRuntimeErrorForConPass(confirmPassword);
    if (util.checkLength(confirmPassword, 10)) {
      clearTimeout(timeOutForConPass);
      this.setState({confirmPasswordError: moreThanCharError(10)}, () => {
        timeOutForConPass = setTimeout(() => this.isReqRuntimeErrorForConPass(confirmPassword), 1000);
      });
      return;
    }
    this.setState({confirmPassword});
  };

  onOldPasswordChange = oldPassword => {
    this.isReqRuntimeErrorForPass(oldPassword, "oldPasswordError", "Password");
    if (util.checkLength(oldPassword, 10)) {
      clearTimeout(timeOutForPass);
      this.setState({oldPasswordError: moreThanCharError(10)}, () => {
        timeOutForOldPass = setTimeout(() => this.isReqRuntimeErrorForPass(oldPassword, "oldPasswordError", "Password"), 1000);
      });
      return;
    }

    this.setState({oldPassword});
  };

  setLoading = boolean => {
    this.setState({loading: boolean});
  };
  onSubmit = () => {
    if (!this.validateForm()) return;
    const {
      props: {resetPasswordRequest, userData: {email}},
      state: {confirmPassword, oldPassword},
      setLoading
    } = this;

    setLoading(true);

    const payload = {
      oldPassword,
      password: confirmPassword
    };
    resetPasswordRequest(payload, res => {
      setLoading(false);
      if (!res) return;
      util.topAlert('Password Changed Successfully.', 'success');
      setTimeout(() => {
        Actions.pop();
      }, 1000);
    });

  };

  validateForm() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const newErrorState = {
      oldPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: '',
    };
    let hasError = false;
    if (_.isEmpty(oldPassword)) {
      newErrorState.oldPasswordError = 'Password is required';
      hasError = true;
    } else if (!util.isPasswordValid(oldPassword)) {
      newErrorState.oldPasswordError = INVALID_PASSWORD_ERROR;
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      newErrorState.confirmPasswordError = 'Passwords do not match';
      hasError = true;
    }
    if (!util.isPasswordValid(newPassword)) {
      newErrorState.newPasswordError = INVALID_PASSWORD_ERROR;
      hasError = true;
    }
    if (_.isEmpty(newPassword)) {
      newErrorState.newPasswordError = 'Password is required';
      hasError = true;
    }
    if (_.isEmpty(confirmPassword)) {
      newErrorState.confirmPasswordError = 'Confirm Password is required';
      hasError = true;
    }
    this.setState(newErrorState);
    return !hasError;
  }
  render() {
    const {
      oldPassword,
      oldPasswordError,
      newPassword,
      newPasswordError,
      confirmPassword,
      confirmPasswordError,
      loading
    } = this.state;
    return (
      <ChangePasswordView
        {...this.props}
        newPasRef={ref => {
          this.newPasRef = ref;
        }}
        cnfPasRef={ref => {
          this.cnfPasRef = ref;
        }}
        oldPassword={oldPassword}
        oldPasswordError={oldPasswordError}
        newPassword={newPassword}
        newPasswordError={newPasswordError}
        confirmPassword={confirmPassword}
        confirmPasswordError={confirmPasswordError}
        onOldPasswordChange={this.onOldPasswordChange}
        onNewPasswordChange={this.onNewPasswordChange}
        onConfirmPasswordChange={this.onConfirmPasswordChange}
        oldPasswordSubmit={() => {
          if (this.cnfPasRef) this.newPasRef.focus();
        }}
        newPasswordSubmit={() => {
          if (this.cnfPasRef) this.cnfPasRef.focus();
        }}
        onSubmitPress={this.onSubmit}
        loading={loading}
      />
    );
  }
}


const mapStateToProps = ({user}) => ({
  userData: user.data,
  credential: user.data.credential,
});

const actions = {
  resetPasswordRequest
};

export default connect(mapStateToProps, actions)(ChangePasswordController);