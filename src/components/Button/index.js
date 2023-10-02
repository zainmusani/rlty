// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  ViewPropTypes,
  Text as TextRN,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import {Text} from '../';
import styles from './styles';
import {Metrics, Images, Fonts, Colors} from '../../theme';
import {activeOpacity} from '../../constants';
activeOpacity;

function renderInnerText(
  title,
  color,
  size,
  type,
  textStyle,
  isLoading,
  indicatorColor,
  textAlign,
  icon,
) {
  if (isLoading) {
    return (
      <ActivityIndicator
        animating
        size="small"
        style={styles.spinner}
        color={indicatorColor}
      />
    );
  }

  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        color={color}
        size={size}
        type={type}
        textAlign={textAlign}
        style={textStyle}>
        {title}
      </Text>
      {icon && (
        <Image
          resizeMode="contain"
          source={Images[icon]}
          style={[styles.iconCenter]}
        />
      )}
    </View>
  );
}

function renderIcon(icon, iconRight) {
  if (!icon) {
    return null;
  }

  let positionStyle = {left: 100, right: 0};
  if (iconRight) {
    positionStyle = {right: Metrics.smallMargin};
  }
  return (
    <Image
      resizeMode="contain"
      source={Images[icon]}
      style={[styles.icon, positionStyle]}
    />
  );
}

const Button = (props: Object) => {
  const {
    style,
    color,
    size,
    type,
    icon,
    raised,
    iconRight,
    children,
    disabled,
    textAlign,
    isLoading,
    textStyle,
    background,
    indicatorColor,
    ...rest
  } = props;

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    raised && {
      shadowColor: '#3F8CFF',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.46,
      shadowRadius: 3.84,

      elevation: 10,
    },
    {
      backgroundColor: Colors.background[background] || background,
    },
    style,
    disabled && styles.opacity,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity.medium}
      disabled={disabled}
      style={buttonStyle}
      {...rest}>
      {renderInnerText(
        children,
        color,
        size,
        type,
        textStyle,
        isLoading,
        indicatorColor,
        textAlign,
        icon,
      )}
      {/* {renderIcon(icon, iconRight)} */}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  raised: PropTypes.bool,
  iconRight: PropTypes.bool,
  style: ViewPropTypes.style,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(_.keys(Fonts.size)),
    PropTypes.number,
  ]),
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_.keys(Fonts.type)),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  textStyle: TextRN.propTypes.style,
  indicatorColor: PropTypes.string,
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
};

Button.defaultProps = {
  style: {},
  Size: 'xvi',
  type: 'bold',
  icon: undefined,
  color: 'white',
  raised: true,
  iconRight: false,
  disabled: false,
  isLoading: false,
  indicatorColor: 'black',
  textAlign: 'center',
  background: Colors.backgroundAccent,
  textStyle: {marginRight: 10},
};

export default Button;
