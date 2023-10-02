import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordView from './ResetPasswordView';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import util from '../../util';
import {INVALID_PASSWORD_ERROR, moreThanCharError} from '../../constants';
import {changePasswordRequest} from '../../actions/UserActions';
import {connect} from 'react-redux';

let timeOutForPass;
let timeOutForConPass;
class ResetPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
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

  onSubmit = () => {
    const {
      state: {confirmPassword},
      props: {changePasswordRequest, userDate: {email, token}},
      validateForm,
      setLoading,
    } = this;

    if (!validateForm()) return;

    setLoading(true);
    changePasswordRequest({password: confirmPassword, email, token}, res => {
      setLoading(false);
      if (!res) return;
      util.topAlert('Password reset successfully.', 'success');
      setTimeout(() => Actions.reset('login'), 2000);
    });

  };
  setLoading = boolean => {
    this.setState({loading: boolean});
  };
  validateForm = () => {
    const {newPassword, confirmPassword} = this.state;
    const newErrorState = {newPasswordError: '', confirmPasswordError: ''};
    let hasError = false;
    if (newPassword !== confirmPassword) {
      newErrorState.confirmPasswordError = 'Passwords do not match';
      hasError = true;
    }
    if (!util.isPasswordValid(newPassword)) {
      newErrorState.newPasswordError = INVALID_PASSWORD_ERROR;
      hasError = true;
    }

    if (_.isEmpty(confirmPassword)) {
      newErrorState.confirmPasswordError = 'Password is required';
      hasError = true;
    }
    if (_.isEmpty(newPassword)) {
      newErrorState.newPasswordError = 'Confirm Password is required';
      hasError = true;
    }

    this.setState(newErrorState);
    return !hasError;
  };
  render() {
    const {
      newPassword,
      newPasswordError,
      confirmPassword,
      confirmPasswordError,
      loading
    } = this.state;
    return (
      <ResetPasswordView
        {...this.props}
        cnfPasRef={ref => {
          this.cnfPasRef = ref;
        }}
        newPassword={newPassword}
        newPasswordError={newPasswordError}
        confirmPassword={confirmPassword}
        confirmPasswordError={confirmPasswordError}
        onNewPasswordChange={this.onNewPasswordChange}
        onConfirmPasswordChange={this.onConfirmPasswordChange}
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
  userDate: user.data
});

const actions = {
  changePasswordRequest
};

export default connect(mapStateToProps, actions)(ResetPasswordController);