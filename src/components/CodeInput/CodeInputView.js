import React, {useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './CodeInputStyles';
import {Text, Button} from '../index';
import CodeInput from 'react-native-confirmation-code-input';
import {Colors, AppStyles, Fonts} from '../../theme';
import {activeOpacity} from '../../constants';
export default function CodeInputView(props) {
  const ref = useRef();

  return (
    <View style={[AppStyles.centerInner]}>
      <View
        style={{
          paddingStart: 12,
          height: 130,
          alignItems: 'center',
        }}>
        <CodeInput
          ref={ref}
          space={12}
          codeInputStyle={styles.codeInput}
          codeLength={4}
          inputPosition="left"
          activeColor={Colors.text.primary}
          inactiveColor={Colors.text.secondary}
          onFulfill={code => {
            props.codeSubmit(code, ref);
          }}
          keyboardType="numeric"
          focusable={true}
          autoFocus={true}
        // placeholder="-"
        />
        <TouchableOpacity
          activeOpacity={activeOpacity.medium}
          style={[AppStyles.centerInner, AppStyles.pRight20]}>
          <Text color={Colors.text.secondary} size={Fonts.size.xiv}>
            Didn’t receive the code?
            <Text onPress={() => props?.onResend()} size={Fonts.size.xiv} type="semi_bold">
              {' Resend'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
{/* <View
  style={{
    paddingStart: 12,
    height: 80,
    alignItems: 'center',
  }}>
  <CodeInput
    ref={ref}
    space={25}
    size={55}
    codeInputStyle={styles.codeInput}
    codeLength={props.codeLength}
    inputPosition="left"
    activeColor={Colors.blue}
    inactiveColor={Colors.grey2}
    onFulfill={code => props.codeSubmit(code, ref)}
    keyboardType="numeric"
  />
</View>; */}