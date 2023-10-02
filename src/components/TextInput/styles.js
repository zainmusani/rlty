// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderColor: Colors.background.secondary,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    fontFamily: Fonts.type.medium,
    color: Colors.text.secondary,
    fontSize: Fonts.size.xiv,
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
  showPass: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  prefix: {
    paddingLeft: 15,
    paddingRight: 5,
  },
});
