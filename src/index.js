// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, View, StatusBar} from 'react-native';
import {MessageBar} from './components';
import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import AppStyles from './theme/AppStyles';
import {Colors} from './theme';
import moment from 'moment';
import {ModalPortal} from 'react-native-modals';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import DataHandler from './services/DataHandler';

const reducers = require('./reducers').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {
    moment.locale('en');
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <SafeAreaProvider style={AppStyles.flex}>
        <SafeAreaView style={AppStyles.flex} edges={['right', 'left']}>
          <>
            <StatusBar
              backgroundColor={Colors.white}
              barStyle="light-content"
            />
            <Provider store={this.state.store}>
              <AppNavigator />
              <ModalPortal />
            </Provider>
            <MessageBar />
          </>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
