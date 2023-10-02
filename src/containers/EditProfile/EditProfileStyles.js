import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profilePicParent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
  },
  camIconParent: {
    position: 'absolute',
    backgroundColor: Colors.backgroundAccent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 20,
    width: 20,
    zIndex: 100,
    borderColor: 'white',
    borderWidth: 1,
    bottom: 0,
    right: 0,
  },
  camIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  circularPlaceHolder: {
    zIndex: -10,
    position: 'absolute',
  },
  timeFrom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.background.secondary,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 15,
  },
  updateButton: {
    marginTop: 20,
    flex: 1,
  },
  camSheetItemParent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.background.secondary,
    borderBottomWidth: 1,
  },
  preferencesItem: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.background.secondary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 14,
  },
});
