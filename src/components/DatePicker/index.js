import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useMemo} from 'react';
import {Image, Keyboard, Platform, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Text} from '..';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const DatePicker = props => {
  const {
    title,
    isDate,
    isTime,
    isDateAndTime,
    style,
    onDateChange,
    date,
    dateFormat,
    onTimeChange,
    time,
    error,
    maximumDate,
    minimumDate,
    require,
    dismiss,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    onTimeChange(time);
    hideDatePicker();
  };

  const handleDateConfirm = date => {
    onDateChange(date);
    hideDatePicker();
  };

  const handleDateTimeConfirm = date => {
    onDateChange(date);
    hideDatePicker();
  };

  return (
    <View style={[AppStyles.mTop10]}>
      {isDate && (
        <>
          <Text
            color={Colors.text.secondary}
            type="semi_bold"
            size={Fonts.size.xiv}
            style={[AppStyles.mTop10]}>
            {title}
            {title && require && <Text color={Colors.red}>*</Text>}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (dismiss && Platform.OS === 'ios') {
                dismiss && Keyboard.dismiss();
                setTimeout(() => {
                  showDatePicker();
                }, 500);
                return;
              }
              showDatePicker();
            }}
            style={[styles.btnView, style]}>
            <Text style={{flex: 1, color: Colors.text.secondary}}>
              {date
                ? moment(date).format(dateFormat ? dateFormat : 'MMM DD,YYYY')
                : 'Select Date'}
              {!title && require && !date && <Text color={Colors.red}>*</Text>}
            </Text>
            <Image source={Images.calendar} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            {...(date ? {date: moment(date).toDate()} : {})}
            // date={moment(date).toDate()}
          />
        </>
      )}
      {isTime && (
        <>
          <Text
            color={Colors.text.secondary}
            type="semi_bold"
            size={Fonts.size.xiv}
            style={[AppStyles.mTop10]}>
            {title}
            {title && require && <Text color={Colors.red}>*</Text>}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (dismiss && Platform.OS === 'ios') {
                dismiss && Keyboard.dismiss();
                setTimeout(() => {
                  showDatePicker();
                }, 500);
                return;
              }
              showDatePicker();
            }}
            style={[styles.btnView, style]}>
            <Text style={{flex: 1, color: Colors.text.secondary}}>
              {time ? util.convertTimeIntoAmPm(time) : 'Select Time'}
            </Text>
            <Image source={Images.time} />
          </TouchableOpacity>
          {time ? (
            <DateTimePickerModal
              minuteInterval={15}
              is24hour={false}
              locale="en_GB" // Use "en_GB" here for ios 12 hour formate
              isVisible={isDatePickerVisible}
              mode="time"
              date={moment(time).toDate()}
              // date={moment('2000-01-01T06:15:00').toDate()}
              // date={time ? moment(time).toDate() : moment(`2000-01-01T${moment().format('HH:mm:ss')}`).toDate()}
              onConfirm={handleTimeConfirm}
              onCancel={hideDatePicker}
            />
          ) : (
            <DateTimePickerModal
              minuteInterval={15}
              is24hour={false}
              locale="en_GB" // Use "en_GB" here for ios 12 hour formate
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideDatePicker}
            />
          )}
        </>
      )}
      {isDateAndTime && (
        <>
          <Text
            color={Colors.text.secondary}
            type="semi_bold"
            size={Fonts.size.xiv}
            style={[AppStyles.mTop10, AppStyles.mLeft0]}>
            {title}
            {title && require && <Text color={Colors.red}>*</Text>}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (dismiss && Platform.OS === 'ios') {
                dismiss && Keyboard.dismiss();
                setTimeout(() => {
                  showDatePicker();
                }, 500);
                return;
              }
              showDatePicker();
            }}
            style={[styles.btnView, style]}>
            <Text style={{flex: 1, color: Colors.text.secondary}}>
              {date
                ? moment(date).format('MMM DD,YYYY hh:mm a')
                : 'Select Date & Time'}
            </Text>
            <Image source={Images.dateAndTimePickerIcon} />
          </TouchableOpacity>
          <DateTimePickerModal
            minuteInterval={15}
            is24hour={false}
            locale="en_GB" // Use "en_GB" here for ios 12 hour formate
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateTimeConfirm}
            onCancel={hideDatePicker}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
        </>
      )}

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
};

DatePicker.propTypes = {
  title: PropTypes.string,
  dateFormat: PropTypes.string,
  isDate: PropTypes.bool,
  require: PropTypes.bool,
  isTime: PropTypes.bool,
  date: PropTypes.any,
  isDateAndTime: PropTypes.bool,
  style: PropTypes.object,
  onDateChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  onTimeChangeObj: PropTypes.func,
};
DatePicker.defaultProps = {
  title: '',
  isDate: false,
  require: false,
  date: '',
  isDateAndTime: false,
  style: {},
};

export default DatePicker;
