import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {Text} from '..';

const RadioBtnYesAndNo = ({title, value, setValue}) => {
  // const [isSelected, setIsSelected] = useState(() => value || true);
  return (
    <View style={styles.container}>
      <Text
        color={Colors.text.secondary}
        type="semi_bold"
        size={Fonts.size.xiv}
        style={[AppStyles.mTop10, AppStyles.mLeft0]}>
        {title}
      </Text>

      <View style={styles.radioBtnRowView}>
        <View style={styles.radioBtnView}>
          <TouchableOpacity
            onPress={() => setValue(true)}
            // onPress={() => setIsSelected(!isSelected)}
            activeOpacity={0.8}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                // backgroundColor: Colors.text.primary,
                borderColor: Colors.text.primary,
                borderWidth: 1.5,
                borderStyle: 'solid',
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {value && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#3F8CFF',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text>Yes</Text>
        </View>
        <View style={styles.radioBtnView}>
          <TouchableOpacity
            onPress={() => setValue(false)}
            // onPress={() => setIsSelected(!isSelected)}
            activeOpacity={0.8}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderColor: Colors.text.primary,
                borderWidth: 1.5,
                borderStyle: 'solid',
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {value === false && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#3F8CFF',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text>No</Text>
        </View>
      </View>
    </View>
  );
};

RadioBtnYesAndNo.propTypes = {
  textOptions: PropTypes.array,
  valuesCallback: PropTypes.func,
  cancelBtnAction: PropTypes.func,
};

RadioBtnYesAndNo.defaultProps = {
  textOptions: [],
  valuesCallback: Function(),
  cancelBtnAction: Function(),
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RadioBtnYesAndNo);
