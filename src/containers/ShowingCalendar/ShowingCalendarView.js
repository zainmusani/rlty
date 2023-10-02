import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image as RnImage,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modal, ModalContent } from 'react-native-modals';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch } from 'react-redux';
import { deleteShowingRequest } from '../../actions/showingAction';
import {
  Button,
  CustomNavbar,
  DatePicker,
  Loader,
  Text,
  TextInput,
} from '../../components';
import { activeOpacity, maxTenYear } from '../../constants';
import { AppStyles, Colors, Fonts, Images, Metrics } from '../../theme';
import util from '../../util';
import styles from './ShowingCalendarStyles';

export default function ShowingCalendarView(props) {
  const {
    daySelected,
    onDaySelect,
    showingModalVisible,
    toggleShowingModal,
    bsRef,
    setOpen,
    name,
    nameError,
    onNameSubmit,
    nameRef,
    onNameChange,
    address,
    addressError,
    onAddressSubmit,
    addressRef,
    onAddressChange,
    description,
    descriptionError,
    onDescriptionSubmit,
    descriptionRef,
    onDescriptionChange,
    addShowing,
    date,
    dateError,
    time,
    timeError,
    endTime,
    endTimeError,
    onDateChange,
    onTimeChange,
    onEndTimeChange,
    loading,
    showingsList,
    setLoading,
    setSelectedShowing,
    setInitialState,
    AddEditButtonText,
    redirectDate,
  } = props;

  const [marks, setMarks] = useState(() => { });
  const [selectedMark, setSelectedMark] = useState(() => { });
  const [det, setDetail] = useState(() => { });
  const [addOrEditedDate, setAddOrEditedDate] = useState(() => '');
  const currentDate = moment().format('YYYY-MM-DD');
  const selectedDate = addOrEditedDate || redirectDate || currentDate;

  const dispatch = useDispatch();

  // const getLastDate = (list) =>
  //   moment(new Date(Math.max(...Object.keys(list)?.map(e => new Date(e)))))?.format('YYYY-MM-DD');

  const changeDotColor = (list, day) => {
    if (_.isEmpty(list)) return {};
    return {
      [day]: {
        dots: list[day]
          ? list[day].dots.map(obj => ({ ...obj, color: '#0D1D36' }))
          : [],
      },
    };
  };

  const onDotsChangeHandler = day => {
    console.log("day => ", day);
    setMarks(list => ({ ...showingsList, ...changeDotColor(list, day) }));
    onDaySelect(day);
  };

  useEffect(() => {

    if (_.isEmpty(showingsList)) return;

    setMarks({ ...showingsList, ...changeDotColor(showingsList, selectedDate) });
  }, [showingsList, addOrEditedDate]);

  useEffect(() => {

    if (_.isEmpty(marks)) return;
    if (daySelected) return setSelectedMark(marks[daySelected]);
    setSelectedMark(marks[addOrEditedDate || currentDate]);
  }, [marks, daySelected]);
  console.log(marks);

  const renderCalendar = useMemo(
    () => (
      <Calendar
        monthFormat={'MMMM, yyyy'}
        markedDates={marks}
        initialDate={selectedDate}
        onDayLongPress={({ dateString: day }) => onDotsChangeHandler(day)}
        onDayPress={({ dateString: day }) => onDotsChangeHandler(day)}
        markingType="multi-dot"
        renderArrow={direction => {
          if (direction == 'left') return <RnImage source={Images.back_btn} />;
          if (direction == 'right')
            return <RnImage source={Images.forwardArrow} />;
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: Colors.text.primary,
          dayTextColor: Colors.text.primary,
          monthTextColor: Colors.text.primary,
          textDayFontFamily: 'NunitoSans-Regular',
          textMonthFontFamily: 'NunitoSans-Regular',
          textDayHeaderFontFamily: 'NunitoSans-Regular',
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
    ),
    [marks, selectedMark],
  );

  const onDeleteShowingPress = selectedShowingId =>
    util.createTwoButtonAlert(
      'Remove Showing?',
      'Are you sure you want to remove this Showing?',
      () => {
        setLoading(true);
        dispatch(
          deleteShowingRequest({ showing_id: selectedShowingId }, res => {
            setLoading(false);
            if (!res) return;
            util.topAlert('showing Deleted successfully', 'success');
          }),
        );
      },
    );
  console.log(daySelected);
  console.log("maxTenYear => ", maxTenYear);
  return (
    <View style={styles.container}>
      <CustomNavbar
        leftBtnImage={Images.back_btn}
        hasBack={false}
        title="Showings"
        rightBtnImage={Images.plusCalander}
        rightBtnPress={() => setOpen(true)}
      />
      <View>{renderCalendar}</View>
      <View style={styles.list}>
        {!_.isEmpty(marks) && (
          <Text size={Fonts.size.xvi}>
            {daySelected == ''
              ? moment(
                !!selectedMark?.dots.length
                  ? selectedMark?.dots[0]?.date
                  : currentDate,
              ).format('MMMM DD, YYYY')
              : moment(daySelected, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
          </Text>
        )}
        <FlatList
          style={{ height: Metrics.screenHeight / 2.7 }}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          data={selectedMark?.dots}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={activeOpacity.medium}
              onPress={() => {
                toggleShowingModal(true);
                setDetail(item);
              }}>
              <View
                style={{
                  height: '100%',
                  backgroundColor: item?.color,
                  width: 4,
                  marginRight: 10,
                  borderRadius: 15,
                }}
              />
              <View>
                <View
                  style={[
                    styles.actionsBtnWrap,
                    { width: Metrics.screenWidth - 64 },
                  ]}>
                  <Text type="bold">{item?.key}</Text>
                  <View style={[styles.actionsBtnWrap, { paddingRight: 15 }]}>
                    {/* <TouchableOpacity
                        style={{marginLeft: 10}}
                        activeOpacity={activeOpacity.low}
                        onPress={() => {
                          setSelectedShowing(item);
                          setOpen(true);
                        }}
                      >
                        <Text color="#00FF00">Edit</Text>
                      </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      activeOpacity={activeOpacity.low}
                      onPress={() => onDeleteShowingPress(item?.id)}>
                      <Text color="#FF0000">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text color={Colors.text.secondary} style={AppStyles.mTop10}>
                  {item?.hours}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/*showing detail */}
      <Modal
        modalStyle={{ borderRadius: 24, marginHorizontal: 25 }}
        visible={showingModalVisible}
        onTouchOutside={() => toggleShowingModal(false)}>
        <ModalContent>
          <View style={(AppStyles.padding10, { width: 300 })}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <Text
                style={AppStyles.flex}
                size={Fonts.size.xiii}
                color={Colors.text.secondary}>
                {moment(det?.date).utc().local().format('MMMM DD, YYYY')} | {det?.start} -{' '}
                {det?.end}
              </Text>

              <TouchableOpacity
                activeOpacity={activeOpacity.medium}
                onPress={() => toggleShowingModal(false)}>
                <RnImage source={Images.close} />
              </TouchableOpacity>
            </View>

            <View style={[AppStyles.flexRow]}>
              <Text style={AppStyles.flex} size={Fonts.size.xviii}>
                {det?.key}
              </Text>
            </View>
            <View style={[AppStyles.flexRow]}>
              <Text
                color={Colors.text.secondary}
                style={AppStyles.flex}
                size={Fonts.size.xiii}>
                {det?.address}
              </Text>
            </View>
            <View style={[AppStyles.flexRow, AppStyles.mTop20]}>
              <Text color="#7D8592" style={AppStyles.flex}>
                {det?.description}
              </Text>
            </View>
          </View>
        </ModalContent>
      </Modal>

      {/* add showing */}
      <RBSheet
        ref={bsRef}
        height={Metrics.screenHeight / 1.25}
        openDuration={350}
        onClose={() => setInitialState()}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 20,
          },
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            width: Metrics.screenWidth,
          }}>
          <View
            style={{
              backgroundColor: '#D8DDE6',
              height: 4,
              width: 54,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
          <View
            style={[
              AppStyles.flexRow,
              AppStyles.paddingHorizontal30,
              AppStyles.mTop15,
              AppStyles.spaceBetween,
            ]}>
            <Text size={Fonts.size.xviii} type="semi_bold" textAlign="center">
              Add showing
            </Text>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.xvi}
              onPress={() => setOpen(false)}>
              Cancel
            </Text>
          </View>
          {/* LIST */}
          <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            enableOnAndroid={true}
            extraScrollHeight={-100}
            // extraHeight={500}
            // keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                AppStyles.mTop20,
                AppStyles.pBottom30,
                { paddingHorizontal: 30 },
              ]}>
              <View>
                <TextInput
                  require
                  label="Name"
                  type="name"
                  autoFocus
                  placeholder="Client Name"
                  value={name}
                  ref={ref => {
                    nameRef(ref);
                  }}
                  onSubmitEditing={onNameSubmit}
                  onChangeText={onNameChange}
                  error={nameError}
                  returnKeyType="next"
                />
                <DatePicker
                  require
                  // maximumDate={undefined}
                  maximumDate={maxTenYear}
                  minimumDate={new Date()}
                  error={dateError}
                  onDateChange={onDateChange}
                  date={date}
                  title={'Date'}
                  isDate
                />
                <DatePicker
                  require
                  error={timeError}
                  onTimeChange={onTimeChange}
                  time={time}
                  title={'Start Time'}
                  isTime
                />
                <DatePicker
                  require
                  error={endTimeError}
                  onTimeChange={onEndTimeChange}
                  time={endTime}
                  title={'End Time'}
                  isTime
                />
                <TextInput
                  require
                  label="Address"
                  type="name"
                  ref={ref => {
                    addressRef(ref);
                  }}
                  placeholder="6595 Collier Rd, Florida 32092,"
                  value={address}
                  containerStyle={AppStyles.mTop10}
                  onChangeText={onAddressChange}
                  onSubmitEditing={onAddressSubmit}
                  error={addressError}
                  returnKeyType="next"
                />
                {/* description */}
                <TextInput
                  label="Description"
                  type="description"
                  ref={ref => {
                    descriptionRef(ref);
                  }}
                  placeholder="Add some detail here"
                  value={description}
                  multiline
                  containerStyle={AppStyles.mTop10}
                  onChangeText={onDescriptionChange}
                  error={descriptionError}
                  onSubmitEditing={onDescriptionSubmit}
                  returnKeyType="Done"
                />
              </View>
              <View style={[AppStyles.flex, AppStyles.flexRow]}>
                <View style={AppStyles.flex} />
                <Button
                  onPress={() => addShowing(setAddOrEditedDate)}
                  indicatorColor="white"
                  textAlign="center"
                  style={styles.addButton}>
                  {AddEditButtonText}
                </Button>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </RBSheet>
      <Loader loading={loading} />
    </View>
  );
}
