import React from 'react';
import PropTypes from 'prop-types';
import NotesView from './NotesView';
import {addNotesRequest, editNoteRequest} from '../../actions/propertyActions';
import {ONLY_CHAR_NUM_ERROR} from '../../constants';
import {connect} from 'react-redux';
import _ from 'lodash';
import util from '../../util';

const initialState = {
  noteModalVisible: false,
  loading: false,
  currentNote: false,
  notes: '',
  notesError: '',
};

class NotesController extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  static propTypes = {};
  static defaultProps = {};

  setLoading = boolean => {
    this.setState({loading: boolean});
  };

  setCurrentNote = currentNote => {
    this.setState({currentNote});
    this.setState({notes: currentNote.note});
  };

  toggleNoteModal = noteModalVisible => {
    this.setState({currentNote: false});
    this.setState({noteModalVisible});
  };

  onChangeNotes = notes => {
    this.validateForm(notes);
    this.setState({notes});
  };

  onChangeNotesError = notesError => {
    this.setState({notesError});
  };

  addNoteHandler = () => {
    const {
      state: {notes, currentNote},
      props: {property: {propertyId}, addNotesRequest, editNoteRequest},
      setLoading,
      validateForm,
    } = this;

    if (validateForm()) return;
    const apiRequest = currentNote ? editNoteRequest : addNotesRequest;
    const payload = {property_id: propertyId, description: notes.trim()};
    setLoading(true);
    apiRequest(currentNote ? {...payload, id: currentNote.id} : payload, res => {
      if (!res) return setLoading(false);
      currentNote && util.topAlert('Note updated successfully', 'success');
      this.setState(initialState);
    });
  };

  validateForm = (string) => {
    const notes = string ?? this.state.notes;
    this.setState({notesError: ''});

    let hasError = false;
    if (_.isEmpty(notes)) {
      this.onChangeNotesError('Note is required');
      hasError = true;
    } else if (!!notes && !/[a-zA-Z]/.test(notes)) {
      this.onChangeNotesError(ONLY_CHAR_NUM_ERROR);
      hasError = true;
    }
    return hasError;
  };

  render() {
    const {noteModalVisible, notes, notesError, loading, currentNote} = this.state;
    return (
      <NotesView
        {...this.props}
        toggleNoteModal={this.toggleNoteModal}
        onChangeNotesError={this.onChangeNotesError}
        addNoteHandler={this.addNoteHandler}
        loading={loading}
        notes={notes}
        currentNote={currentNote}
        notesError={notesError}
        onChangeNotes={this.onChangeNotes}
        setCurrentNote={this.setCurrentNote}
        setLoading={this.setLoading}
        noteModalVisible={noteModalVisible}
      />
    );
  }
}

const mapStateToProps = ({properties: {favProperties, properties}}, {isFavProperty, id}) => ({
  property: isFavProperty ? favProperties.find(obj => obj.id === id) : properties.find(obj => obj.id === id)
});

const actions = {
  addNotesRequest,
  editNoteRequest,
};

export default connect(mapStateToProps, actions)(NotesController);