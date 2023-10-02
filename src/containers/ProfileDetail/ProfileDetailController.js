import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileDetailView from './ProfileDetailView';
import {userProfileRequest} from "../../actions/UserActions";

class ProfileDetailController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setLoading = boolean => {
    this.setState({loading: boolean});
  };

  apiRequest = () => {
    const {
      props: {userProfileRequest, profile},
      setLoading
    } = this;
    !profile.email && setLoading(true);
    userProfileRequest({}, res => setLoading(false));
  };

  componentDidMount() {
    this.apiRequest();
  }

  render() {
    return <ProfileDetailView {...this.props} loading={this.state.loading} />;
  }
}
const mapStateToProps = ({user}) => {
  return {
    profile: user.userProfile,
    userImage: user.userProfile.image || undefined,
  };
};

const actions = {
  userProfileRequest
};

export default connect(mapStateToProps, actions)(ProfileDetailController);
