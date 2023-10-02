import React from 'react';
import PropTypes from 'prop-types';
import EditProfileView from './EditProfileView';
import {connect} from 'react-redux';
import {updateUserProfileSuccess, editProfileRequest, userProfileRequest} from '../../actions/UserActions';
import {moreThanCharError, USER_FIELDS_NAME} from '../../constants';
import {Keyboard, Alert} from 'react-native';
import _ from 'lodash';
import OpenSettings from 'react-native-open-settings';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {Images} from '../../theme';
import {multiMediaUploadToServer, uploadImageToServer} from '../../helpers/ImageUploaderHelper';

class EditProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      agencyName: props?.profile?.agency,
      agencyNameError: '',
      profileImage: {path: props?.profile?.image} || undefined,
      bio: props.profile?.description,
      bioError: '',
      preferences: props.user[USER_FIELDS_NAME.PREFERENCES],
      number: props.profile?.contactNo?.includes('+') ? props.profile?.contactNo : '+' + props.profile?.contactNo,
      numberError: '',
      location: props.profile?.location,
      locationError: '',
      from: moment(props.profile?.from) || moment(1, 'hh a'),
      to: moment(props.profile?.to) || moment(2, 'hh a'),
      timeError: '',
      selected: null,
      showTimerModal: false,
      spinnerLoading: false,
      availabilityTap: false,
      imageUris: '',
    };
  }
  static propTypes = {};
  static defaultProps = {};

  isReqRuntimeError = (value, errorPropertyName, error, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    }
    else if (_.isEmpty(value)) this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForName = (value, errorPropertyName, error, secondError, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    }
    else if (!util.isValidName(value)) this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value)) this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForNumber = (value, errorPropertyName, error, secondError, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    }
    else if (!util.isNumber(value)) this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value)) this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  onAgencyChange = agencyName => {
    if (this.isReqRuntimeErrorForName(agencyName, "agencyNameError", "Agency name", 'Enter valid Name containing alphabets only', 30)) return;
    this.setState({agencyName});
  };

  onBioChange = bio => {
    if (bio?.length > 255) return this.setState({bioError: moreThanCharError(255)});
    else this.setState({bioError: ''});
    this.setState({bio});
  };

  setImageUri = imageUris => {
    this.setState({imageUris});
  };
  onPreferencePress = id => {
    const tempPref = _.cloneDeep(this.state.preferences);
    tempPref.forEach(element => {
      if (element.id === id) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    this.setState({preferences: tempPref});
  };
  onLocationChange = location => {
    if (this.isReqRuntimeError(location, "locationError", "Location", 255)) return;
    this.setState({location});
  };

  onTimerPress = selection => {
    this.setState({availabilityTap: true});
    this.setState({selected: selection, showTimerModal: true});
  };
  onTimerModalSubmit = time => {
    const finalTime = moment(time);
    if (this.state.selected === 'from') this.setState({from: finalTime, showTimerModal: false});
    else this.setState({to: finalTime, showTimerModal: false});
  };
  padValue = value => {
    return value < 10 ? '0' + value : value;
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
  setLoading = boolean => {
    this.setState({spinnerLoading: boolean});
  };

  update = () => {
    const {
      props: {userProfileRequest, editProfileRequest, user, profile},
      state: {agencyName, location, bio, from, to, preferences, profileImage, number},
      validate,
      setLoading,
      setImageUri
    } = this;
    const apiRequest = (res) => {
      const payload = {
        agencyName: agencyName?.trim(),
        bio: bio?.trim(),
        location: location?.trim(),
        availabilityFrom: _.cloneDeep(from).utc().format('HH:mm:ss'),
        availabilityTo: _.cloneDeep(to).utc().format('HH:mm:ss'),
        profile_image: res ? res[0].path : profile?.image || '',
        phone_number: number,
      };
      setLoading(true);
      editProfileRequest(payload, res => {
        if (!res) return setLoading(false);
        Actions.pop();
        userProfileRequest({}, res => setLoading(false));
        setLoading(false);
        util.topAlert('Profile updated successfully', 'success');
      });
    };

    Keyboard.dismiss();
    if (!validate()) return;
    if (profileImage?.path && !profileImage?.path.includes('rlty-dev.s3.')) multiMediaUploadToServer([profileImage], setImageUri, setLoading).then(res => apiRequest(res));
    else apiRequest();
  };

  validate = () => {
    const {agencyName, location, from, to, availabilityTap, number} = this.state;

    const newErrorState = {
      agencyNameError: '',
      numberError: '',
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
      newErrorState.agencyNameError = 'Enter valid Name containing alphabets only';
      if (!hasError) this.agencyRef.focus();
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
    if (_.isEmpty(location)) {
      newErrorState.locationError = 'Location is required';
      hasError = true;
    }
    if (availabilityTap && util.checkIsEndTimeAfterStartTime(from, to)) {
      newErrorState.timeError = 'End time should be after start time';
      hasError = true;
    }
    this.setState(newErrorState);
    return !hasError;
  };

  setOpen = open => {
    if (this.bsRef) {
      if (open) {
        this.bsRef.open();
      } else {
        this.bsRef.close();
      }
    }
  };
  onCamPress = () => {
    this.setOpen(false);
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        this.updateProfilePic(image);
      })
      .catch(e => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow this app to use your camera.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => { },
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Error', 'No camera on simulator');
        }
      });
  };

  onGalleryPress = () => {
    this.setOpen(false);
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        this.updateProfilePic(image);
      })
      .catch(e => {
        if (e.code && e.code === 'E_PERMISSION_MISSING') {
          writeLog(e, 'from ProfileController from line 119');

          Alert.alert(
            'Permission Required',
            'Cannot access images. Please allow access if you want to be able to select images.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => { },
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
        console.log({e});
      });
  };

  updateProfilePic = image => {
    this.setState({loading: true});
    this.setState({profileImage: image});
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);
  };
  render() {
    const {
      loading,
      agencyName,
      agencyNameError,
      bio,
      preferences,
      location,
      locationError,
      from,
      to,
      showTimerModal,
      timeError,
      spinnerLoading,
      profileImage,
      number,
      numberError,
      bioError,
    } = this.state;
    return (
      <EditProfileView
        {...this.props}
        loading={loading}
        agencyRef={ref => {
          this.agencyRef = ref;
        }}
        bioRef={ref => {
          this.bioRef = ref;
        }}
        numRef={ref => {
          this.numRef = ref;
        }}
        locationRef={ref => {
          this.locationRef = ref;
        }}
        agencyName={agencyName}
        agencyNameError={agencyNameError}
        onAgencyChange={this.onAgencyChange}
        onAgencySubmit={() => {
          if (this.bioRef) this.bioRef.focus();
        }}
        bio={bio}
        bioError={bioError}
        number={number}
        numberError={numberError}
        onBioChange={this.onBioChange}
        preferences={preferences}
        onNumberChange={this.onNumberChange}
        onPreferencePress={this.onPreferencePress}
        location={location}
        locationError={locationError}
        timeError={timeError}
        profileImage={profileImage}
        onLocationChange={this.onLocationChange}
        onLocationSubmit={() => { }}
        from={from}
        to={to}
        onTimerPress={this.onTimerPress}
        onTimerModalSubmit={this.onTimerModalSubmit}
        showTimerModal={showTimerModal}
        onTimeModalCancel={() => {
          this.setState({showTimerModal: false});
        }}
        update={this.update}
        onCamPress={this.onCamPress}
        onGalleryPress={this.onGalleryPress}
        setOpen={this.setOpen}
        bsRef={ref => {
          this.bsRef = ref;
        }}
        spinnerLoading={spinnerLoading}
        setLoading={this.setLoading}
      />
    );
  }
}
const mapStateToProps = ({user, properties}) => ({
  user: user.data,
  userProfile: user.userProfile,
});

const actions = {
  updateUserProfileSuccess,
  editProfileRequest,
  userProfileRequest,
};

export default connect(mapStateToProps, actions)(EditProfileController);
