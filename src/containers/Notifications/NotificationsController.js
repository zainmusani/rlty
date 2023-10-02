import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NotificationsView from './NotificationsView';
import {getNotificationListRequest} from '../../actions/GeneralActions';

class NotificationsController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      refreshLoading: false,
      isMoreDataPinToCollection: false,
      hasNextPagePinToCollection: true,
      offsetPinToCollection: 15,
    };
  }
  static propTypes = {};
  static defaultProps = {};


  setIsMoreDataPinToCollection = (isMoreDataPinToCollection) => {
    this.setState({isMoreDataPinToCollection});
  };

  setIsNextPagePinToCollection = (hasNextPagePinToCollection) => {
    this.setState({hasNextPagePinToCollection});
  };

  setOffsetPinToCollection = (offsetPinToCollection) => {
    this.setState({offsetPinToCollection});
  };

  setLoading = boolean => {
    this.setState({loading: boolean});
  };

  setRefreshLoading = boolean => {
    this.setState({refreshLoading: boolean});
  };

  loadMoreDataOnEndReached = () => {
    const {
      state: {
        hasNextPagePinToCollection,
        offsetPinToCollection,
      },
      props: {notificationList},
      setIsMoreDataPinToCollection,
      setIsNextPagePinToCollection,
      setOffsetPinToCollection,
      apiRequest
    } = this;

    if (notificationList?.length < offsetPinToCollection) return;
    if (!hasNextPagePinToCollection) return;
    setIsMoreDataPinToCollection(true);
    const loadMoreDataFunc = (res) => {
      if (!!res.length) {
        setOffsetPinToCollection(offsetPinToCollection + 15);
        setIsMoreDataPinToCollection(false);
      } else {
        setIsNextPagePinToCollection(false);
        setIsMoreDataPinToCollection(false);
      }
    };
    apiRequest(true, offsetPinToCollection, loadMoreDataFunc);
  };

  apiRequest = (loadingFalse, offset, loadMoreDataFunc) => {
    const {
      props: {getNotificationListRequest},
      state: { },
      setLoading,
      setRefreshLoading,
    } = this;

    const payload = {
      offset: offset || 0,
      limit: 15,
    };

    !loadingFalse && setLoading(true);
    getNotificationListRequest(payload, res => {
      setLoading(false);
      setRefreshLoading(false);
      loadMoreDataFunc && loadMoreDataFunc(res);
    });
  };

  onRefreshHandler = () => {
    const {
      setRefreshLoading,
      apiRequest,
      setIsNextPagePinToCollection,
      setOffsetPinToCollection,
    } = this;

    setRefreshLoading(true);
    apiRequest(true);
    setIsNextPagePinToCollection(true);
    setOffsetPinToCollection(15);
  };

  componentDidMount() {
    this.apiRequest();
  }

  render() {
    return <NotificationsView {...this.props}
      isMoreDataPinToCollection={this.state.isMoreDataPinToCollection}
      refreshLoading={this.state.refreshLoading}
      loadMoreDataOnEndReached={this.loadMoreDataOnEndReached}
      onRefreshHandler={this.onRefreshHandler}
      loading={this.state.loading}
    />;
  }
}
const mapStateToProps = ({general, user}) => ({
  notificationList: general.notificationList,
  useProfile: user.userProfile,
});

const actions = {
  getNotificationListRequest,
};

export default connect(mapStateToProps, actions)(NotificationsController);
