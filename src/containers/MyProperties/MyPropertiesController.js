import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MyPropertiesView from './MyPropertiesView';
import {getPropertiesRequest, getPropertiesSearchRequest} from "../../actions/propertyActions";

class MyPropertiesController extends React.Component {
  constructor(props) {
    super(props);
    let selectedValue = props?.filter ? props?.filter : {value: 'By Location', key: "location"};
    this.state = {
      loading: false,
      selectedValue,
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

  setSearchLoader = boolean => {
    this.setState({searchLoader: boolean});
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

  loadMoreDataOnEndReached = () => {
    const {
      state: {
        hasNextPagePinToCollection,
        offsetPinToCollection,
      },
      props: {userPropertyList},
      setIsMoreDataPinToCollection,
      setIsNextPagePinToCollection,
      setOffsetPinToCollection,
      apiRequest
    } = this;

    if (userPropertyList?.length < offsetPinToCollection) return;
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
      props: {getPropertiesSearchRequest},
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
    getPropertiesSearchRequest(payload, res => {
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
    return <MyPropertiesView
      apiRequest={this.apiRequest}
      isMoreDataPinToCollection={this.state.isMoreDataPinToCollection}
      searchText={this.state.searchText}
      selectedValue={this.state.selectedValue}
      onChangeSearchText={this.onChangeSearchText}
      setSelectedValue={this.setSelectedValue}
      refreshLoading={this.state.refreshLoading}
      searchLoader={this.state.searchLoader}
      loadMoreDataOnEndReached={this.loadMoreDataOnEndReached}
      onRefreshHandler={this.onRefreshHandler}
      {...this.props} loading={this.state.loading} />;
  }
}
const mapStateToProps = ({properties: {properties}}) => ({
  userPropertyList: properties,
});

const actions = {
  getPropertiesRequest,
  getPropertiesSearchRequest
};

export default connect(mapStateToProps, actions)(MyPropertiesController);
