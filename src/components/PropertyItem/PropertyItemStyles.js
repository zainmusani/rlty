import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  dropShadowStyles: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === 'android' ? 0.1 : 1,
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
  },
  containerOtherStyles: {
    marginHorizontal: 20,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageParent: {
    borderRadius: 7,
    overflow: 'hidden',
    height: 84,
    width: 84,
    position: 'relative',
  },
  imageStyle: {
    height: 84,
    width: 84,
  },
  starParent: {
    backgroundColor: '#F4F9FD',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  soldLabel: {
    position: 'absolute',
    backgroundColor: '#1877F2',
    zIndex: 9999,
    height: 19,
    width: 49,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    left: 5,
  },
});
