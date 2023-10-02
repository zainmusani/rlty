// @flow
import { Platform, Linking, Alert, PermissionsAndroid } from 'react-native';
import moment from 'moment';
import { MessageBarManager } from 'react-native-message-bar';
import { MESSAGE_TYPES, DISCARD_WARNING } from '../constants';
import DataHandler from '../services/DataHandler';
import _ from 'lodash';
import { refreshToken, userSignOutSuccess } from '../actions/UserActions';
import { BASE_URL } from '../config/WebService';
import QueryString from 'qs';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

/**
 * @typedef {import('moment-timezone').Moment} Moment
 */

let invalidDatePrefixes = "-";

class Util {
  keyExtractor = (item, index) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isPlatformIos() {
    return Platform.OS === "ios";
  }
  cloneDeepArray = mArr => _.cloneDeep(mArr);
  getFileExtension = url => {
    return url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
  };
  isArrayEmpty = mArr => {
    return _.isEmpty(mArr);
  };
  isValidURL(url) {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email?.trim());
  }
  isPasswordValid(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$/;
    return re.test(password);
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  }

  topAlert(message, alertType = 'error', position = "bottom") {
    MessageBarManager.showAlert({
      message: this.capitalizeFirstLetter(message),
      alertType,
      position,
      viewLeftInset: 7.5,
      viewRightInset: 7.5,
      viewTopInset: 15,
      viewBottomInset: 15,
    });
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType,
    });
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }


  logoutUser() {
    DataHandler.getStore().dispatch(userSignOutSuccess());
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  async refreshAccessToken() {
    let options = Object.assign({ method: 'POST' });
    let data = {};
    data.token = this.getCurrentUserRefreshToken();
    options.body = JSON.stringify(data);
    try {
      const response = await fetch(`${BASE_URL}auth/v1/refresh-token`, options);
      const responseJson = await response.json();
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  isUserFillSubscriptionForm = () => DataHandler.getStore().getState().user.userProfile.isUserFillSubscriptionForm;


  /**
* @param {number} number
* @returns {string}
*/

  numberWithCommas(number) {
    const numberWithComma = number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numberWithComma === 'NaN' ? 0 : numberWithComma;
  }

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  formatAMPM(date, twelveHours = true) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  checkLength(string, lengthForChecking) {
    if (string.length > lengthForChecking) return true;
    else return false;
  }

  downloadFileFromApi = (parameter, file_ext) => {
    let url = `${BASE_URL}api/V1/report?${QueryString.stringify(parameter)}&t=${Date.now()}`;
    const localFile = `${RNFS.DocumentDirectoryPath}/reports${file_ext}`;
    const options = {
      headers: {
        Authorization: `bearer ${this.getCurrentUserAccessToken()}`
      },
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
      }).catch((e) => {
        console.log('Error', e);
      });
  };

  getAndroidPermission = async (parameter, file_ext) => {
    try {
      let isPermittedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (this.isPlatformAndroid() && !isPermittedExternalStorage) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // permission granted
          // some code
        } else {
          this.topAlert("Storage permission denied");
        }
      } else {
        // permission granted automatically
        // some code
      }
    } catch (e) {
      console.log('getAndroidPermission Error', e);
    }
  };
  /**
   * 
   * @param {string} title 
   * @param {string} message 
   * @param {string} cancelBtnText 
   * @param {string} okBtnText 
   * @param {function(){}} onOkPress 
   * @returns 
   */

  createTwoButtonAlert = (title, message, onPress, cancelBtnText = "Cancel", okBtnText = "OK") =>
    Alert.alert(
      title,
      message,
      [{
        text: cancelBtnText,
        style: "cancel",
        onPress: () => { },
      },
      {
        text: okBtnText,
        onPress
      }]
    );

  // Social Signin Errors
  socialLoginError = (error = null, token_type) => {
    let errorText = '';
    if (error === null) {
      // this.setLoadingState(token_type);
      return true;
    } else if (error && _.isString(error)) {
      errorText = error;
    } else {
      errorText = 'Something went wrong';
    }
    this.topAlert(errorText, 'error');
  };

  formateDate(date) {
    return moment(date).format('MMM DD,YYYY');
  };

  formateDateTime(date) {
    return moment(date).format('MMM DD,YYYY hh:mm a');
  };

  convertDateIntoUtc(date) {
    return moment(date).utc().format('YYYY-MM-DD');
  };

  convertDateTimeIntoUtc(date) {
    return moment(date).utc().format('YYYY-MM-DD HH:mm:ss');
  };

  convertUtcDateIntoLocale(date) {
    const formattedDate = moment.utc(date).local().format('YYYY-MM-DD');
    return formattedDate === 'Invalid date' ? invalidDatePrefixes : formattedDate;
  };

  convertUtcDateTimeIntoLocale(date, formate = 'YYYY-MM-DD HH:mm:ss') {
    const formattedDate = moment.utc(date).local().format(formate);
    return formattedDate === 'Invalid date' ? invalidDatePrefixes : formattedDate;
  };

  convertTimeIntoAmPm(date) {
    return moment(date).format('hh:mm A');
  };

  getHoursAndMinutes = (sTime, eTime, returnType) => {
    const startTime = moment(sTime, 'HH:mm A');
    const endTime = moment(eTime, 'HH:mm A');
    // calculate total duration
    const duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;
    if (hours && returnType === 'hours') return hours + 'h';
    if (returnType === 'minutes' || hours === 0) return minutes + 'm';
    if (returnType === 'hoursMinutes') return { hours, minutes };
  };

  getTimeAgo = (start, end) => {
    const startTime = moment(start);
    const endTime = moment(end);
    const duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes());
    const days = parseInt(duration.asDays());
    const weeks = parseInt(duration.asWeeks());
    const months = parseInt(duration.asMonths());
    const years = parseInt(duration.asYears());
    return [
      { years },
      { months },
      { weeks },
      { days },
      { hours },
      { minutes },
    ];
    // getHoursAndMinutes('2016-05-06T20:03:55', '2016-06-06T21:03:55');
  };

  randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  /**
* This function will check if given start time is less then end time
* @param {moment} startTime 
* @param {moment} endTime 
* @returns {boolean} 
*/
  checkIsEndTimeAfterStartTime = (startTime, endTime) => {
    const timeStart = moment(startTime, 'HH:mm:ss');
    const timeEnd = moment(endTime, 'HH:mm:ss');
    return timeEnd.diff(timeStart, 'minutes', true) <= 0;
  };

  /**
 * @param {object} time
 * @returns {string}
 */

  convertUtcTimeIntoLocale = (date) => moment.utc(date).local();


  /**
 * @param {string} time
 * @param {string} formate
 * @returns {string}
 */

  formateJustTime = (time, formate) => moment(time, [moment.ISO_8601, 'HH:mm']).format(formate);

  /**
   *  setting minutes to 15 
 * @param {object} dateObject
 */

  setMinto15 = (dateObject) => dateObject.setMinutes(Math.ceil(dateObject?.getMinutes() / 15) * 15);

}

export default new Util();
