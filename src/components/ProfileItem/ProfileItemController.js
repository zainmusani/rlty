import React from 'react';
import PropTypes from 'prop-types';
import ProfileItemView from './ProfileItemView';
import {allowNotificationRequest} from '../../actions/GeneralActions';
import {connect} from 'react-redux';

class ProfileItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEnabled: props.userProfile.isNotificationAllowed};
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  toggleSwitch = () => {
    this.setState(state => {
      this.props.allowNotificationRequest({toggle: !state.isEnabled});
      return {isEnabled: !state.isEnabled};
    });
  };
  render() {
    const {isEnabled} = this.state;
    return (
      <ProfileItemView
        {...this.props}
        toggleSwitch={this.toggleSwitch}
        isEnabled={isEnabled}
      />
    );
  }
}

const mapStateToProps = ({user: {userProfile}}) => ({userProfile});

const actions = {
  allowNotificationRequest
};

export default connect(mapStateToProps, actions)(ProfileItemController);
