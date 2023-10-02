import React from 'react';
import PropTypes from 'prop-types';
import SellersView from './SellersView';
import {connect} from 'react-redux';
import {getSellerListRequest} from '../../actions/propertyActions';

class SellersController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false.valueOf,
      selectedValue: {value: 'By Location', key: "location"},
      searchText: null,
      refreshLoading: false,
      searchLoader: false,
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

  onChangeSearchText = searchText => {
    this.setState({searchText});
  };

  setSelectedValue = selectedValue => {
    this.setState({searchText: null});
    this.setOffsetPinToCollection(15);
    this.setIsNextPagePinToCollection(true);
    this.setState({selectedValue});
  };

  setSearchLoader = boolean => {
    this.setState({searchLoader: boolean});
  };

  loadMoreDataOnEndReached = () => {
    const {
      state: {
        hasNextPagePinToCollection,
        offsetPinToCollection,
      },
      props: {sellerList},
      setIsMoreDataPinToCollection,
      setIsNextPagePinToCollection,
      setOffsetPinToCollection,
      apiRequest
    } = this;

    if (sellerList?.length < offsetPinToCollection) return;
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
    apiRequest(true, false, offsetPinToCollection, loadMoreDataFunc);
  };

  apiRequest = (loadingFalse, searchLoader, offset, loadMoreDataFunc) => {
    const {
      props: {getSellerListRequest},
      state: {selectedValue, searchText},
      setLoading,
      setRefreshLoading,
      setSearchLoader
    } = this;

    const payload = {
      filter: selectedValue?.key,
      keyword: searchText || '',
      offset: offset || 0,
      limit: 15,
    };

    !loadingFalse && setLoading(true);
    searchLoader && setSearchLoader(true);
    getSellerListRequest(payload, res => {
      setLoading(false);
      setSearchLoader(false);
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

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.searchText !== prevState.searchText) {
    //   this.apiRequest(true, true);
    // };
    if (this.state.selectedValue !== prevState.selectedValue) {
      this.apiRequest();
    };
  }

  render() {
    return <SellersView
      apiRequest={this.apiRequest}
      isMoreDataPinToCollection={this.state.isMoreDataPinToCollection}
      searchText={this.state.searchText}
      selectedValue={this.state.selectedValue}
      onChangeSearchText={this.onChangeSearchText}
      setSelectedValue={this.setSelectedValue}
      refreshLoading={this.state.refreshLoading}
      searchLoader={this.state.searchLoader}
      onRefreshHandler={this.onRefreshHandler}
      loadMoreDataOnEndReached={this.loadMoreDataOnEndReached}
      loading={this.state.loading} {...this.props} />;
  }
}
const mapStateToProps = ({properties, seller}) => ({
  sellerList: properties.sellersList,
});

const actions = {
  getSellerListRequest
};

export default connect(mapStateToProps, actions)(SellersController);
