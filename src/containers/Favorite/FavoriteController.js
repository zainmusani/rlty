import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FavoriteView from './FavoriteView';
import {setSelectedTab} from '../../actions/GeneralActions';
import {getFavouritePropertiesRequest, getFavPropertiesSearchRequest} from '../../actions/propertyActions';
class FavoriteController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      refreshLoading: false,
      searchLoader: false,
      searchText: null,
      selectedValue: {value: 'By Location', key: "location"},
      isMoreDataPinToCollection: false,
      hasNextPagePinToCollection: true,
      offsetPinToCollection: 15,
    };
    FavoriteController.instance = this;
  }
  static onExit() {
    if (FavoriteController.instance) {
      FavoriteController.instance._onExit();
    }
  }

  static onEnter() {
    if (FavoriteController.instance) {
      FavoriteController.instance._onEnter();
    }
  }
  _onExit() { }

  _onEnter() {
    this.apiRequest();
    this.props.setSelectedTab(3);
  }

  static propTypes = {
    propertiesList: PropTypes.array.isRequired,
  };

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
      props: {propertiesList},
      setIsMoreDataPinToCollection,
      setIsNextPagePinToCollection,
      setOffsetPinToCollection,
      apiRequest
    } = this;

    if (propertiesList?.length < offsetPinToCollection) return;
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
      props: {getFavPropertiesSearchRequest},
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
    getFavPropertiesSearchRequest(payload, res => {
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
    // if (this.props?.refreshNow !== prevProps?.refreshNow) {
    //   this.apiRequest();
    // };
  }

  render() {
    const {searchText, selectedValue, isMoreDataPinToCollection, loading} = this.state;

    return (<FavoriteView
      apiRequest={this.apiRequest}
      searchText={searchText}
      loading={loading}
      selectedValue={selectedValue}
      isMoreDataPinToCollection={isMoreDataPinToCollection}
      onChangeSearchText={this.onChangeSearchText}
      setSelectedValue={this.setSelectedValue}
      refreshLoading={this.state.refreshLoading}
      searchLoader={this.state.searchLoader}
      loadMoreDataOnEndReached={this.loadMoreDataOnEndReached}
      onRefreshHandler={this.onRefreshHandler}
      {...this.props} />);
  }
}
const mapStateToProps = ({user, properties}) => {
  let favList = properties.favProperties;
  return {
    userData: user.data,
    propertiesList: favList,
  };
};

const actions = {
  setSelectedTab,
  getFavouritePropertiesRequest,
  getFavPropertiesSearchRequest
};

export default connect(mapStateToProps, actions)(FavoriteController);