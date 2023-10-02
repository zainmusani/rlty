import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6EDF5',
    padding: 5,
    borderRadius: 25,
    marginTop: 20
  },
  selectedTab: {
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: Metrics.screenWidth / 7
  },
  tabTransparent: {
    backgroundColor: Colors.transparent,
  },
  loginButton: {
    marginTop: 20,
    flex: 1,
    paddingLeft: 5,
  },
  boxContainer: {
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  halfOpacity: {
    opacity: 0.5
  },
  selectedBorder: {
    borderColor: '#0D1D36',
    borderWidth: 1.5,
  },
  unselectedBorder: {
    borderColor: '#F2F2F2',
    borderWidth: 1,
  },
  selected: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  radioButtonUnSelected: {
    borderColor: '#D5D5D7',
    borderWidth: 1.5,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioImageStyle: {
    width: 20,
    height: 20,
  }
});
