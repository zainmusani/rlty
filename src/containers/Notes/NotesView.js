import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  TextInput,
  Button,
  Loader,
} from '../../components';
import {AppStyles, Fonts, Colors, Images} from '../../theme';
import styles from './NotesStyles';
import {activeOpacity} from '../../constants';
import DropShadow from 'react-native-drop-shadow';
import {useDispatch} from 'react-redux';
import {deleteNoteRequest} from '../../actions/propertyActions';
import util from '../../util';
import MyModal from '../../components/Modal';
import _ from 'lodash';

export default function NotesView(props) {
  const {
    toggleNoteModal,
    setCurrentNote,
    noteModalVisible,
    currentNote,
    notes,
    notesError,
    onChangeNotesError,
    onChangeNotes,
    setLoading,
    loading,
    addNoteHandler,
    property,
  } = props;
  const dispatch = useDispatch();

  const onDeleteShowingPress = id =>
    util.createTwoButtonAlert(
      'Remove Note?',
      'Are you sure you want to remove this Note?',
      () => {
        setLoading(true);
        dispatch(
          deleteNoteRequest({property_id: property.id, id}, res => {
            setLoading(false);
            if (!res) return;
            util.topAlert('Note Delete successfully', 'success');
          }),
        );
      },
    );

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'Notes'}
        rightBtnImage={Images.notesIcon}
        rightBtnPress={() => toggleNoteModal(true)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {_.cloneDeep(property)
          ?.notes?.reverse()
          .map(({note, id, date}) => (
            <DropShadow
              style={{
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: Platform.OS === 'android' ? 0.1 : 0.6,
                shadowRadius: 5,
              }}>
              <View style={styles.showingParent}>
                <View style={styles.actionsBtnWrap}>
                  <Text color="#7D8592">{date}</Text>
                  <View style={styles.actionsBtnWrap}>
                    <TouchableOpacity
                      activeOpacity={activeOpacity.low}
                      style={{marginRight: 10}}
                      onPress={() => {
                        toggleNoteModal(true);
                        setCurrentNote({note, id});
                      }}>
                      <Text color="#00FF00">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={activeOpacity.low}
                      onPress={() => onDeleteShowingPress(id)}>
                      <Text color="#FF0000">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={AppStyles.mTop10}>{note}</Text>
              </View>
            </DropShadow>
          ))}
      </ScrollView>
      <MyModal
        visible={noteModalVisible}
        dismiss={() => {
          setCurrentNote(false);
          toggleNoteModal(false);
        }}>
        <View
          style={{
            borderRadius: 24,
            marginHorizontal: 25,
            backgroundColor: '#fff',
            padding: 20,
          }}>
          <View
            style={[
              AppStyles.flexRow,
              AppStyles.alignItemsCenter,
              AppStyles.mBottom30,
            ]}>
            <Text style={AppStyles.flex} size={Fonts.size.xviii} type="bold">
              {currentNote ? 'Edit' : 'Add'} Note
            </Text>
            <TouchableOpacity
              activeOpacity={activeOpacity.medium}
              onPress={() => {
                setCurrentNote(false);
                toggleNoteModal(false);
              }}>
              <RnImage source={Images.close} />
            </TouchableOpacity>
          </View>
          <TextInput
            require
            label="Description"
            multiline
            placeholder="Add some description of the request"
            value={notes}
            onChangeText={text => {
              if (util.checkLength(text, 255))
                return onChangeNotesError(
                  'more than 255 characters not allowed',
                );
              onChangeNotes(text);
            }}
            error={notesError}
          />
          <View style={[AppStyles.flexRow, AppStyles.mTop40]}>
            <View style={{flex: 1}} />
            <Button
              background={Colors.backgroundAccent}
              style={styles.conformationButton}
              disabled={!notes?.length}
              onPress={addNoteHandler}>
              {currentNote ? 'Edit Note' : 'Add Note'}
            </Button>
          </View>
        </View>
      </MyModal>
      <Loader loading={loading} />
    </View>
  );
}
