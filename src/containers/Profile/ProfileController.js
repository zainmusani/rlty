import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileView from './ProfileView';
import {setSelectedTab} from '../../actions/GeneralActions';

class ProfileController extends React.Component {
  constructor() {
    super();
    this.state = {
      refresh: 1
    };
    ProfileController.instance = this;
  }
  static onExit() {
    if (ProfileController.instance) {
      ProfileController.instance._onExit();
    }
  }

  static onEnter() {
    if (ProfileController.instance) {
      ProfileController.instance._onEnter();
    }
  }
  _onExit() {
  }

  _onEnter() {
    this.setState({refresh: Date.now()});
    this.props.setSelectedTab(4);
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <ProfileView {...this.props} refresh={this.state.refresh} />;
  }
}
const mapStateToProps = ({user}) => {
  return {
    user: user.data,
    profile: user.userProfile,
    userImage: user.userProfile.image || undefined,
  };
};

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(ProfileController);
