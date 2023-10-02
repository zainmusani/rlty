import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TabbarView from './TabbarView';
import {setSelectedTab} from '../../actions/GeneralActions';
import {Images} from '../../theme';
import {Actions} from 'react-native-router-flux';

const tabsData = [
  {
    name: 'Home',
    image: Images.homeGrey,
    selectedImage: Images.homeBlack,
    onPress: () => Actions.jump('home'),
  },
  {
    name: 'MLS',
    image: Images.mlsGrey,
    selectedImage: Images.mlsBlack,
    onPress: () => Actions.jump('msl_tab'),
  },
  {
    name: 'Add',
    image: Images.addGrey,
    selectedImage: Images.addBlack,
    onPress: () => Actions.addProperty(),
  },
  {
    name: 'Favorite',
    image: Images.starGrey,
    selectedImage: Images.starBlack,
    onPress: () => Actions.jump('fav_tab'),
  },
  {
    name: 'Profile',
    image: Images.profileGrey,
    selectedImage: Images.profileBlack,
    onPress: () => Actions.jump('profile_tab'),
  },
];
class TabbarController extends React.Component {
  constructor() {
    super();
    this.state = {
      showAvailabilityMark: true,
      showCounter: true,
    };
  }
  static propTypes = {
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
  };
  componentDidMount() { }
  onTabSelect = index => {
    this.props.setSelectedTab(index);
  };
  static defaultProps = {};
  render() {
    const {showAvailabilityMark, showCounter} = this.state;
    return (
      <TabbarView
        {...this.props}
        onTabSelect={this.onTabSelect}
        tabData={tabsData}
        showAvailabilityMark={showAvailabilityMark}
        showCounter={showCounter}
      />
    );
  }
}
const mapStateToProps = ({general}) => ({
  selectedTab: general.selectedTab,
});
const actions = {setSelectedTab};
export default connect(mapStateToProps, actions)(TabbarController);
