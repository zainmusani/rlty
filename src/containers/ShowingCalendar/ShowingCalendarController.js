import React from 'react';
import PropTypes from 'prop-types';
import ShowingCalendarView from './ShowingCalendarView';
import moment from 'moment';
import _ from 'lodash';
import util from '../../util';
import {
  addShowingRequest,
  getShowingsRequest,
  editShowingRequest,
} from '../../actions/showingAction';
import { connect } from 'react-redux';
import { moreThanCharError } from '../../constants';

const initialState = {
  daySelected: '',
  showingModalVisible: false,
  loading: false,
  addOrEditedDate: '',
  name: '',
  nameError: '',
  date: '',
  dateError: '',
  time: '',
  timeError: '',
  endTime: '',
  endTimeError: '',
  address: '',
  addressError: '',
  description: '',
  descriptionError: '',
  AddEditButtonText: 'Add a Showing',
  selectedShowing: false,
};

class ShowingCalendarController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      daySelected: props?.redirectDate || '',
    };
  }

  static propTypes = {};
  static defaultProps = {};
  onDaySelect = daySelected => {

    this.setState({ daySelected });
  };
  toggleShowingModal = showingModalVisible => {
    this.setState({ showingModalVisible });
  };
  setOpen = open => {
    if (this.bsRef) {
      if (open) {
        this.bsRef.open();
      } else {
        this.bsRef.close();
        this.setInitialState();
      }
    }
  };

  isReqRuntimeError = (value, errorPropertyName, error, checkLength) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({ [errorPropertyName]: moreThanCharError(checkLength) });
      return true;
    } else if (_.isEmpty(value))
      this.setState({ [errorPropertyName]: `${error} is required` });
    else this.setState({ [errorPropertyName]: '' });
  };

  isReqRuntimeErrorForName = (
    value,
    errorPropertyName,
    error,
    secondError,
    checkLength,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({ [errorPropertyName]: moreThanCharError(checkLength) });
      return true;
    } else if (!util.isValidName(value))
      this.setState({ [errorPropertyName]: secondError });
    else if (_.isEmpty(value))
      this.setState({ [errorPropertyName]: `${error} is required` });
    else this.setState({ [errorPropertyName]: '' });
  };

  onNameChange = name => {
    if (
      this.isReqRuntimeErrorForName(
        name,
        'nameError',
        'Name',
        'Enter valid Name containing alphabets only',
        72,
      )
    )
      return;
    this.setState({ name });
  };

  onDateChange = date => {
    this.setState({ dateError: '' });
    this.setState({ date });
  };

  onTimeChange = time => {
    util.setMinto15(time);
    this.setState({ timeError: '' });
    if (
      !util.checkIsEndTimeAfterStartTime(time, this.state.endTime) &&
      !this.endTimeError?.includes('req')
    )
      this.setState({ endTimeError: '' });
    if (util.checkIsEndTimeAfterStartTime(time, this.state.endTime)) {
      this.setState({ endTimeError: 'End time Should be after start time' });
    }
    this.setState({ time });
  };
  onEndTimeChange = endTime => {
    util.setMinto15(endTime);
    this.setState({ endTimeError: '' });
    if (util.checkIsEndTimeAfterStartTime(this.state.time, endTime)) {
      this.setState({ endTimeError: 'End time Should be after start time' });
    }
    this.setState({ endTime });
  };
  onAddressChange = address => {
    if (this.isReqRuntimeError(address, 'addressError', 'Address', 255)) return;
    this.setState({ address });
  };
  onDescriptionChange = description => {
    //if (this.isReqRuntimeError(description, "descriptionError", "Description", 255)) return;
    this.setState({ description });
  };
  setSelectedShowing = selectedShowing => {
    const state = {
      AddEditButtonText: 'Edit a Showing',
      selectedShowing: selectedShowing,
      daySelected: '',
      name: selectedShowing.key,
      date: new Date(selectedShowing.date),
      time: moment(selectedShowing.start, [moment.ISO_8601, 'HH:mm']),
      endTime: moment(selectedShowing.end, [moment.ISO_8601, 'HH:mm']),
      address: selectedShowing.address,
      description: selectedShowing.description,
    };
    this.setState(state);
  };
  setInitialState = () => {
    this.setState(initialState);
  };
  setLoading = loading => {
    this.setState({ loading });
  };
  setAddOrEditedDate = addOrEditedDate => {
    this.setState({ addOrEditedDate });
  };
  addShowing = setAddOrEditedDate => {
    const {
      props: { addShowingRequest, getShowingsRequest, editShowingRequest },
      state: { name, date, time, address, description, endTime, selectedShowing },
      validate,
      setLoading,
      setInitialState,
      setOpen,
    } = this;

    if (!validate()) return;
    const payload = {
      date: moment(date).format('YYYY-MM-DD'),
      name: name?.trim(),
      address: address?.trim(),
      description: description?.trim(),
      start_time: moment(time).utc().format('HH:mm:ss'),
      end_time: moment(endTime).utc().format('HH:mm:ss'),
    };

    const apiRequest = selectedShowing ? editShowingRequest : addShowingRequest;
    const topAlertMessage = selectedShowing
      ? 'Showing edited successfully'
      : 'Showing added successfully';

    setLoading(true);
    apiRequest(
      selectedShowing ? { ...payload, showing_id: selectedShowing.id } : payload,
      res => {
        if (!res) {
          setLoading(false);
          setOpen(false);
          return;
        }
        setLoading(false);
        setOpen(false);
        setInitialState();
        getShowingsRequest(
          {},
          res => res && setAddOrEditedDate(moment(date).format('YYYY-MM-DD')),
        );
        util.topAlert(topAlertMessage, 'success');
      },
    );
  };
  validate = () => {
    const { name, date, time, address, description, endTime } = this.state;
    const newErrorState = {
      nameError: '',
      dateError: '',
      timeError: '',
      endTimeError: '',
      addressError: '',
      descriptionError: '',
    };
    let hasError = false;
    if (_.isEmpty(name)) {
      newErrorState.nameError = 'Name is required';
      if (!hasError) this.nameRef.focus();
      hasError = true;
    }
    if (!util.isValidName(name.trim())) {
      newErrorState.nameError = 'Enter valid Name containing alphabets only';
      if (!hasError) this.nameRef.focus();
      hasError = true;
    }
    if (!!!date) {
      newErrorState.dateError = 'Date is required';
      hasError = true;
    }
    if (!time) {
      newErrorState.timeError = 'Start Time is required';
      hasError = true;
    }
    if (!endTime) {
      newErrorState.endTimeError = 'End Time is required';
      hasError = true;
    } else if (util.checkIsEndTimeAfterStartTime(time, endTime)) {
      newErrorState.endTimeError = 'End time Should be after start time';
      hasError = true;
    }
    if (_.isEmpty(address)) {
      newErrorState.addressError = 'Address is required';
      if (!hasError) this.addressRef.focus();
      hasError = true;
    }
    if (!_.isEmpty(description?.trim()) && description?.trim()?.length > 255) {
      newErrorState.descriptionError = 'more than 255 characters not allowed';
      if (!hasError) this.descriptionRef.focus();
      hasError = true;
    }
    this.setState(newErrorState);
    return !hasError;
  };
  changeFocus = ref => {
    if (ref) ref.focus();
  };

  componentDidMount() {
    this.setLoading(true);
    this.props.getShowingsRequest({}, () => {
      this.setLoading(false);
    });
  }

  render() {
    const {
      daySelected,
      showingModalVisible,
      name,
      nameError,
      date,
      dateError,
      time,
      timeError,
      endTime,
      endTimeError,
      address,
      addressError,
      description,
      descriptionError,
      loading,
      AddEditButtonText,
    } = this.state;
    return (
      <ShowingCalendarView
        {...this.props}
        loading={loading}
        daySelected={daySelected}
        onDaySelect={this.onDaySelect}
        showingModalVisible={showingModalVisible}
        toggleShowingModal={this.toggleShowingModal}
        bsRef={ref => {
          this.bsRef = ref;
        }}
        setOpen={this.setOpen}
        nameRef={ref => {
          this.nameRef = ref;
        }}
        name={name}
        nameError={nameError}
        date={date}
        dateError={dateError}
        time={time}
        timeError={timeError}
        endTime={endTime}
        endTimeError={endTimeError}
        onNameSubmit={() => this.changeFocus(this.addressRef)}
        addressRef={ref => {
          this.addressRef = ref;
        }}
        onNameChange={this.onNameChange}
        onDateChange={this.onDateChange}
        onTimeChange={this.onTimeChange}
        onEndTimeChange={this.onEndTimeChange}
        address={address}
        addressError={addressError}
        onAddressChange={this.onAddressChange}
        onAddressSubmit={() => this.changeFocus(this.descriptionRef)}
        descriptionRef={ref => {
          this.descriptionRef = ref;
        }}
        description={description}
        descriptionError={descriptionError}
        onDescriptionChange={this.onDescriptionChange}
        onDescriptionSubmit={this.addShowing}
        addShowing={this.addShowing}
        setLoading={this.setLoading}
        setSelectedShowing={this.setSelectedShowing}
        selectedShowing={this.selectedShowing}
        setInitialState={this.setInitialState}
        AddEditButtonText={AddEditButtonText}
      />
    );
  }
}

const mapStateToProps = ({ showing }) => ({
  showingsList: showing.showingsList,
});

const actions = {
  addShowingRequest,
  getShowingsRequest,
  editShowingRequest,
};

export default connect(mapStateToProps, actions)(ShowingCalendarController);
