import moment from "moment";
import React from "react";
import {connect} from "react-redux";
import {downloadReportsRequest, getReportsSearchRequest} from '../../actions/ReportsActions';
import util from "../../util";
import ReportsView from "./ReportsView";

class ReportsController extends React.Component {
    constructor() {
        super();
        this.state = {
            // selectedTabId: 1,
            loading: false,
            searchText: null,
            selectedDownloadItem: 0,
            refreshLoading: false,
            searchLoader: false,
            isMoreDataPinToCollection: false,
            hasNextPagePinToCollection: true,
            offsetPinToCollection: 15,
            isDatePickerVisible: false,
            reportsFilterDate: moment(new Date()),
        };
    }
    static propTypes = {};
    static defaultProps = {};

    // setSelectedTabId = selectedTabId => {
    //     this.setState({selectedTabId});
    // };

    downloadReports = (type, file_extension) => {
        const {
            state: {reportsFilterDate},
            setOpen,
        } = this;
        const parameter = {
            month: reportsFilterDate.month() + 1,
            year: reportsFilterDate.year(),
            keyword: '',
            type,
        };
        setOpen(false);
        util.downloadFileFromApi(parameter, file_extension);
    };

    onFilterDateChange = (date) => {
        this.setState({searchText: null});
        this.setOffsetPinToCollection(15);
        this.setIsNextPagePinToCollection(true);
        this.setState({reportsFilterDate: moment(date)});
    };

    setSelectedDownloadItem = (selectedDownloadItem) => {
        this.setState({selectedDownloadItem});
    };

    setDatePickerVisibility = (isDatePickerVisible) => {
        this.setState({isDatePickerVisible});
    };

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

    setSearchLoader = boolean => {
        this.setState({searchLoader: boolean});
    };

    setOpen = open => {
        if (this.bsRef) {
            if (open) {
                this.bsRef.open();
            } else {
                this.bsRef.close();
            }
        }
    };

    loadMoreDataOnEndReached = () => {
        const {
            state: {
                hasNextPagePinToCollection,
                offsetPinToCollection,
            },
            props: {reportsSearchList},
            setIsMoreDataPinToCollection,
            setIsNextPagePinToCollection,
            setOffsetPinToCollection,
            apiRequest
        } = this;

        if (reportsSearchList?.length < offsetPinToCollection) return;
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
            props: {getReportsSearchRequest},
            state: {searchText, reportsFilterDate},
            setLoading,
            setRefreshLoading,
            setSearchLoader
        } = this;

        const payload = {
            month: reportsFilterDate.month() + 1,
            year: reportsFilterDate.year(),
            keyword: searchText || '',
            offset: offset || 0,
            limit: 15,
        };

        !loadingFalse && setLoading(true);
        searchLoader && setSearchLoader(true);
        getReportsSearchRequest(payload, res => {
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
        //     this.apiRequest(true, true);
        // };
        if (this.state.reportsFilterDate !== prevState.reportsFilterDate) {
            this.apiRequest();
        };
    }



    render() {
        return <ReportsView
            apiRequest={this.apiRequest}
            searchText={this.state.searchText}
            onChangeSearchText={this.onChangeSearchText}
            // setSelectedTabId={this.setSelectedTabId}
            // selectedTabId={this.state.selectedTabId}
            searchLoader={this.state.searchLoader}
            loading={this.state.loading}
            setRefreshLoading={this.setRefreshLoading}
            refreshLoading={this.state.refreshLoading}
            reportsFilterDate={this.state.reportsFilterDate}
            isMoreDataPinToCollection={this.state.isMoreDataPinToCollection}
            isDatePickerVisible={this.state.isDatePickerVisible}
            setDatePickerVisibility={this.setDatePickerVisibility}
            selectedDownloadItem={this.state.selectedDownloadItem}
            setSelectedDownloadItem={this.setSelectedDownloadItem}
            downloadReports={this.downloadReports}
            onRefreshHandler={this.onRefreshHandler}
            loadMoreDataOnEndReached={this.loadMoreDataOnEndReached}
            onFilterDateChange={this.onFilterDateChange}
            setOpen={this.setOpen}
            bsRef={ref => {
                this.bsRef = ref;
            }}
            {...this.props}
        />;
    }
};

const mapStateToProps = ({reports: {reportsSearchList}}) => ({
    reportsSearchList,
});

const actions = {
    getReportsSearchRequest,
    downloadReportsRequest,
};

export default connect(mapStateToProps, actions)(ReportsController);