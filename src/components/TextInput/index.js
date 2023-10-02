// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image, TextInput as RNTextInput, TouchableOpacity, View, ViewPropTypes
} from 'react-native';
import {ButtonView, Text} from '../';
import {activeOpacity} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';

export default class TextInput extends React.Component {
  constructor() {
    super();
    this.state = {
      showPass: true,
    };
  }
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    require: PropTypes.bool,
    inputStyles: PropTypes.object,
    value: PropTypes.string,
    prefix: PropTypes.string,
    selectionColor: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    require: false,
    inputStyles: {},
    value: '',
    prefix: '',
    selectionColor: 'rgba(52,93,147,0.4)',
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }
  toggleShowPass() {
    const {showPass} = this.state;

    this.setState({showPass: !showPass});
  }
  render() {
    const {
      label,
      require,
      error,
      containerStyle,
      onPress,
      multiline,
      inputStyles,
      type,
      prefix,
      selectionColor,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        {!_.isEmpty(label) && (
          <>
            <Text
              color={Colors.text.secondary}
              type="semi_bold"
              size={Fonts.size.xiv}
              style={[AppStyles.mTop10, AppStyles.mLeft5]}>
              {label}
              {require && <Text color={Colors.red}>
                *
              </Text>}
            </Text>
          </>

        )}

        <View style={[AppStyles.justifyCenter]}>
          {!_.isEmpty(prefix) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: Colors.background.secondary,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 10,
              }}>
              <Text color={Colors.text.secondary} style={styles.prefix}>
                {prefix}
              </Text>
              <RNTextInput
                ref={ref => {
                  this.myRef = ref;
                }}
                style={[
                  styles.input,
                  inputStyles,
                  multiline ? styles.multilineInput : {},
                  !_.isEmpty(prefix) && AppStyles.pLeft0,
                  {
                    borderWidth: 0,
                    marginTop: 0,
                    width: "100%",
                    paddingRight: 40
                  },
                ]}
                autoCapitalize={type === 'password' ? 'none' : 'sentences'}
                blurOnSubmit={false}
                selectionColor={selectionColor}
                multiline={multiline}
                secureTextEntry={
                  this.state.showPass && _.isEqual(this.props.type, 'password')
                }
                placeholderTextColor="#c9c9c9"
                {...rest}
              />
            </View>
          )}
          {_.isEmpty(prefix) && (
            <RNTextInput
              ref={ref => {
                this.myRef = ref;
              }}
              style={[
                styles.input,
                type === 'password' ? {paddingRight: 45} : {},
                inputStyles,
                multiline ? styles.multilineInput : {},
                !_.isEmpty(prefix) && AppStyles.pLeft30,
              ]}
              autoCapitalize={type === 'password' ? 'none' : 'sentences'}
              blurOnSubmit={false}
              selectionColor={selectionColor}
              multiline={multiline}
              secureTextEntry={
                this.state.showPass && _.isEqual(this.props.type, 'password')
              }
              placeholderTextColor="#c9c9c9"
              {...rest}
            />
          )}

          {_.isEqual(this.props.type, 'password') &&
            this.props.value.length > 0 && (
              <TouchableOpacity
                activeOpacity={activeOpacity.medium}
                onPress={() => this.toggleShowPass()}
                style={styles.showPass}>
                <Image
                  // source={Images.showPassword}
                  source={this.state.showPass ? Images.hidePassword : Images.showPassword}
                  resizeMode="contain"
                  style={this.state.showPass ? {width: 18, marginTop: 10} : {}}
                />
              </TouchableOpacity>
            )}
          {!_.isNull(onPress) && (
            <ButtonView onPress={onPress} style={styles.buttonOverlay}>
              <Image
                source={Images.arrow_right_grey}
                style={styles.arrowIcon}
              />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="semi_bold"
            size={Fonts.size.xii}
            color={Colors.red}
            style={[AppStyles.mTop5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
