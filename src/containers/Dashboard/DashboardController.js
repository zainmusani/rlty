import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import DashboardView from './DashboardView';
import { setSelectedTab, notificationCountRequest } from '../../actions/GeneralActions';
import { dashboardCountRequest, getGraphRequest, monthlyRevenueRequest } from '../../actions/dashboardActions';
import { getMlsPropertiesSearchRequest } from '../../actions/propertyActions';
import { userProfileRequest } from '../../actions/UserActions';

class DashboardController extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, 'days'),
      displayedDate: moment(),
      showCalender: false,
      loading: false,
    };
    DashboardController.instance = this;
  }
  static onExit() {
    if (DashboardController.instance) {
      DashboardController.instance._onExit();
    }
  }

  static onEnter() {
    if (DashboardController.instance) {
      DashboardController.instance._onEnter();
    }
  }
  _onExit() { }

  _onEnter() {
    this.apiRequest();
    this.props.setSelectedTab(0);
  }
  static propTypes = {
    userData: PropTypes.object.isRequired,
    propertiesList: PropTypes.array.isRequired,
  };
  static defaultProps = {};
  setDates = (start, end) => {
    this.setState({
      startDate: moment(start, 'YYYY-MM-DD'),
      endDate: moment(end, 'YYYY-MM-DD'),
    });
  };

  toggleCalendar = showCalender => {
    this.setState({ showCalender });
  };

  setLoading = boolean => {
    this.setState({ loading: boolean });
  };

  apiRequest = () => {
    const {
      props: { dashboardCountRequest, monthlyRevenueRequest, getGraphRequest, userProfileRequest, getMlsPropertiesSearchRequest, graphData, notificationCountRequest },
      setLoading
    } = this;
    !graphData.length && setLoading(true);
    notificationCountRequest({}, res => setLoading(false));
    getMlsPropertiesSearchRequest({ offset: 0, limit: 10, }, res => setLoading(false));
    getGraphRequest({}, res => setLoading(false));
    dashboardCountRequest({}, res => setLoading(false));
    monthlyRevenueRequest({}, res => setLoading(false));
    userProfileRequest({}, res => setLoading(false));
  };

  componentDidMount() {
    this.apiRequest();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props?.refreshNow !== prevProps?.refreshNow) {
  //     this.apiRequest();
  //   };
  // }


  render() {
    const {
      loading
    } = this.state;

    return (
      <DashboardView
        {...this.props}
        setLoading={this.setLoading}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({ user, properties, dashboard: { dashboardCount, monthlyRevenue, graphData } }) => {
  return {
    propertiesList: properties.mlsProperties?.slice(0, 10),
    userData: user.data,
    dashboardCount,
    monthlyRevenue,
    graphData
  };
};

const actions = {
  setSelectedTab,
  dashboardCountRequest,
  monthlyRevenueRequest,
  getGraphRequest,
  userProfileRequest,
  getMlsPropertiesSearchRequest,
  notificationCountRequest,
};

export default connect(mapStateToProps, actions)(DashboardController);
