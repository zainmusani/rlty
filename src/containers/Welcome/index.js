// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Colors, Images } from '../../theme';
import util from '../../util';
import styles from './styles';

let notificationForeground = {};
class Welcome extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  componentDidMount() {

    const { userData } = this.props;
    setTimeout(() => {
      if (userData?.agency_name === 'third step not filled') {
        Actions.reset('register', { step: 3 });
      }
      else if (!!userData?.access_token && !util.isUserFillSubscriptionForm()) {
        Actions.reset('subscription');
      }
      else if (!_.isEmpty(userData) && !_.isEmpty(userData?.access_token)) {
        Actions.reset('dashboard');
      } else {
        Actions.reset('login');
      }
    }, 1000);
  }
  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.background.secondary}
        />
        <View style={styles.container}>
          <Image source={Images.logo} style={styles.image} />
          {/* <DoubleBounce size={15} color={Colors.blue2} /> */}
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(Welcome);
