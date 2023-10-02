import moment from 'moment/moment';
import React, {useEffect, useMemo} from 'react';
import {
    FlatList,
    RefreshControl, TouchableOpacity, View
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    Button,
    CustomNavbar, Loader, SearchBox, Text
} from '../../components';
import {activeOpacity, maximumCurrentDate} from '../../constants';
import {downloadReportsHelper} from '../../helpers/downloadReportsHelper';
import useDebounce from '../../helpers/useDebounceHook';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './ReportsStyles';

export default function ReportsView(props) {
    const {
        bsRef,
        setOpen,
        reportsSearchList,
        loading,
        searchText,
        onChangeSearchText,
        refreshLoading,
        searchLoader,
        loadMoreDataOnEndReached,
        isMoreDataPinToCollection,
        onRefreshHandler,
        reportsFilterDate,
        isDatePickerVisible,
        setDatePickerVisibility,
        onFilterDateChange,
        selectedDownloadItem,
        setSelectedDownloadItem,
        apiRequest,
    } = props;
    const debounceValue = useDebounce(searchText, 500);

    useEffect(() => {
        if (searchText == null) return;
        apiRequest(true, true);
    }, [debounceValue]);

    const data = useMemo(() => {
        if (!reportsSearchList.length) return [];

        return reportsSearchList.map(a => ({
            title: a.property_title,
            amountOfContract: a?.total_cost ,
            items: [
                `Agent Name: ${a.agent_name}`,
                `Seller Name: ${a.seller_name}`,
                `Buyer Name: ${a.buyer_name}`,
            ]
        }));
    }, [reportsSearchList]);

    const dataForDownload = useMemo(() => {
        if (!reportsSearchList.length) return [];
        return reportsSearchList.map(obj => ({
            "id": obj?.id,
            "property_title": obj?.property_title,
            "buyer_name": obj?.buyer_name,
            "seller_name": obj?.seller_name,
            "amount_of_contract": obj?.total_cost,
            "sold_date": moment(obj?.sold_at).format('MM-DD-YYYY'),
        }));
    }, [reportsSearchList]);

    return (
        <View style={styles.container}>
            <CustomNavbar title="Reports"
                rightBtnImage={!data?.length ? Images.disableDownloadButton : Images.download}
                rightBtnPress={() => !data?.length ? {} : setOpen(true)}
            // rightBtnPress={() => Actions.subscription()}
            />
            <SearchBox
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
                searchLoader={searchLoader}
                setDatePickerVisibility={setDatePickerVisibility}
                reportsFilterDate={reportsFilterDate}
                isReportsView
            />
            {/* <View style={styles.header}>
                {[{id: 1, label: 'Sold Properties', }, {id: 2, label: 'Registered Agents', }].map(item => {
                    const selected = item.id === selectedTabId;
                    return (
                        <TouchableOpacity
                            onPress={() => setSelectedTabId(item.id)}
                            style={[
                                styles.selectedTab,
                                !selected && styles.tabTransparent,
                            ]}>
                            <Text
                                color={selected ? 'white' : Colors.text.primary}
                                type={selected ? 'bold' : 'regular'}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View> */}
            <FlatList
                style={{height: '100%'}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) => (<ReportsItemView item={item} keyExtractor={item => item.id} />)}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreDataOnEndReached}
                ListFooterComponent={
                    <View style={isMoreDataPinToCollection && {marginVertical: 20}}>
                        {isMoreDataPinToCollection && (
                            <ActivityIndicator color={Colors.lightGrey} />
                        )}
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshLoading}
                        onRefresh={onRefreshHandler}
                    />
                }
                ListEmptyComponent={() => !loading && (
                    <View style={[AppStyles.mTop20, AppStyles.centerInner]}>
                        <Text size={Fonts.size.xvi} color={Colors.accent}>
                            No data found
                        </Text>
                    </View>
                )}
            />
            <Loader loading={loading} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={maximumCurrentDate}
                onConfirm={date => {
                    onFilterDateChange(date);
                    setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <RBSheet
                ref={bsRef}
                height={285}
                openDuration={350}
                customStyles={{
                    container: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                }}>
                <View
                    style={{
                        flex: 1,
                        width: Metrics.screenWidth,
                    }}>
                    <View
                        style={{
                            backgroundColor: '#D8DDE6',
                            height: 4,
                            width: 54,
                            marginTop: 10,
                            alignSelf: 'center',
                        }}
                    />
                    <View
                        style={[
                            AppStyles.flexRow,
                            AppStyles.paddingHorizontal30,
                            AppStyles.mTop15,
                            {alignItems: "center"}
                        ]}>
                        <Text
                            color={Colors.text.secondary}
                            size={Fonts.size.xvi}
                            style={AppStyles.flex}
                            onPress={() => setOpen(false)}>
                            Cancel
                        </Text>
                        <Text
                            size={Fonts.size.xviii}
                            type="semi_bold"
                            textAlign="center"
                            style={AppStyles.flex2}>
                            Download Reports
                        </Text>
                        <View style={AppStyles.flex} />
                    </View>
                    {/* LIST */}
                    <ScrollView
                        contentContainerStyle={[AppStyles.mTop20, AppStyles.pBottom20]}>
                        {[{value: 'csv', key: "location"}, {value: 'excel', key: "sold"},].map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={util.generateGuid()}
                                    onPress={() => setSelectedDownloadItem(index)}
                                    style={[
                                        AppStyles.flexRow,
                                        AppStyles.alignItemsCenter,
                                        {marginVertical: 15, marginHorizontal: 30},
                                    ]}>
                                    <View
                                        style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            backgroundColor: Colors.text.primary,
                                            marginRight: 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        {selectedDownloadItem == index && (
                                            <View
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#3F8CFF',
                                                }}
                                            />
                                        )}
                                    </View>
                                    <Text style={{marginBottom: 2}} size={Fonts.size.xvi}>{item?.value}</Text>
                                </TouchableOpacity>
                            );
                        })}

                        <Button
                            disabled={!data?.length}
                            background={Colors.backgroundAccent}
                            style={styles.conformationButton}
                            onPress={() => selectedDownloadItem === 1 ?
                                downloadReportsHelper(dataForDownload, setOpen) :
                                downloadReportsHelper(dataForDownload, setOpen, 'csv')
                            }>
                            Download
                        </Button>
                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    );
}

function ReportsItemView({item}) {
    const {title, items, amountOfContract} = item;
    return (
        <DropShadow
            style={{
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: Platform.OS === 'android' ? 0.1 : 0.4,
                shadowRadius: 5,
            }}>
            <View
                activeOpacity={activeOpacity.medium}
                style={styles.itemContainer}>
                <View style={AppStyles.flexRow}>
                    <View style={AppStyles.flex}>
                        <Text type="bold">{title}</Text>
                        {items.map(i => <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{marginTop: 5}}
                            fontSize={Fonts.size.xxSmall}
                            color={Colors.text.secondary}>
                            {i}
                        </Text>)}
                    </View>
                    <Text type="bold">{`$ ${util.numberWithCommas(amountOfContract)}`}</Text>
                </View>
            </View>
        </DropShadow>
    );
}