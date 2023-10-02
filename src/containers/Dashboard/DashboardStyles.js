import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  parentScrollView: {
    backgroundColor: 'white',
  },
  smallHeader: {
    position: 'absolute',
    top: Metrics.statusBarHeight / 2,
    width: Metrics.screenWidth,
    paddingHorizontal: 20,
    paddingVertical: 2,
    flexDirection: 'row',
    zIndex: 999,
  },
  centerText: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: Metrics.screenHeight / 6,
  },

  headerImageContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 2.5,
  },
  propertiesBoxParentStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: -20,
  },
  propertiesBoxStyle: {
    borderRadius: 14,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 30,
    width: Metrics.screenWidth / 3 - 15,
    // maxWidth: 110,
    height: 125,
  },
  chartKeyItem: {
    width: 10,
    height: 4,
    backgroundColor: 'rgba(13, 29, 54, 1)',
    borderRadius: 2,
    marginRight: 5,
  },
  chartParent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
    paddingBottom: 20,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleParent: {
    paddingHorizontal: 10,
    marginVertical: 15,
    zIndex: 999,
    alignItems: "center",
    // flexDirection: 'row',
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  overlayStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
