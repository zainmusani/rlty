// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  Image,
} from 'react-native';
import {Text, ButtonView} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import PhoneInput from 'react-native-phone-input';
import styles from './styles';
import ModalPickerImage from './ModalPickerImage';
import {phoneInputCountryList} from '../../constants';

export default class ContactInput extends React.PureComponent {
  constructor() {
    super();

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      pickerData: null,
      country: {dialCode: '+44'},
    };
  }
  componentDidMount() {
    this.setState({
      pickerData: this.myRef.getPickerData(),
    });
  }
  onPressFlag() {
    const {onClickFlag} = this.props;
    onClickFlag ? this.myCountryPicker.open() : console.log('nothing');
    // this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.myRef.selectCountry(country.iso2);
  }
  static propTypes = {
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    require: PropTypes.bool,
    value: PropTypes.string,
    icon: PropTypes.number,
    onNumberChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    error: '',
    label: 'Phone',
    containerStyle: {},
    onPress: null,
    multiline: false,
    require: false,
    onClickFlag: true,
    onNumberChange: () => { },
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }
  isValidNumber() {
    this.myRef.isValidNumber();
  }
  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      icon,
      value,
      onNumberChange,
      require,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <Text
          color={Colors.text.secondary}
          type="semi_bold"
          size={Fonts.size.xiv}
          style={[AppStyles.mTop10, AppStyles.mLeft5]}>
          Mobile Number
          {require && <Text color={Colors.red}>
            *
          </Text>}
        </Text>
        <PhoneInput
          ref={ref => {
            this.myRef = ref;
          }}
          countriesList={phoneInputCountryList}
          // value={this.props.value}
          style={styles.input}
          initialCountry={'us'}
          initialValue={this?.props?.value ? this?.props?.value?.slice(1) : ''}
          // initialValue={this?.props?.value ? this?.props?.value : ''}
          textStyle={styles.textStyle}
          allowZeroAfterCountryCode={false}
          flagStyle={{width: 28, height: 20}}
          onPressFlag={this.onPressFlag}
          autoFormat={true}
          textProps={{
            maxLength: 20,
            selectionColor: Colors.grey,
            placeholderTextColor: '#c9c9c9',
            placeholder: 'Phone number',
          }}
          onChangePhoneNumber={number => {
            onNumberChange(number, this.myRef);
          }}
          {...rest}
        />
        <ModalPickerImage
          ref={ref => {
            this.myCountryPicker = ref;
          }}
          data={this.state.pickerData}
          onChange={country => {
            this.selectCountry(country);
          }}
          cancelText="Cancel"
        />
        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text type="medium" size="xii" color={Colors.red}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
