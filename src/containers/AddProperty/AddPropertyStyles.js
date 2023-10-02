import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  typeParent: {
    marginTop: 10,
    // alignItems: "flex-start"
    // flexDirection: 'row',
    // justifyContent: '',
    // flexWrap: "wrap"
  },
  typeItem: {
    flexDirection: 'row',
    borderColor: Colors.background.secondary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 14,
    // marginRight: 20,
    marginBottom: 10
  },
  outerCheck: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.text.primary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCheck: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#C3C3C3',
  },
  imageContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 20,
  },
  uploadContainer: {
    marginTop: 20,
    borderColor: Colors.backgroundAccent,
    padding: 14,
    borderRadius: 14,
    height: 47,
    width: 47,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
    overflow: 'hidden',
  },
  borderOne: {
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  backgroundGrey: {
    backgroundColor: '#E9EBF1',
  },
  removeImageParent: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 999,
    right: -5,
    top: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  line: {
    backgroundColor: 'white',
    height: 2,
    width: 7,
  },
  updateButton: {
    marginVertical: 20,
    flex: 1,
  },
});
