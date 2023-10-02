import React, { useEffect } from 'react';
import {
  ActivityIndicator, FlatList,
  RefreshControl, View
} from 'react-native';
import {
  BuyerSellerItem, CustomNavbar, Loader, SearchBox, Text
} from '../../components';
import useDebounce from '../../helpers/useDebounceHook';
import { AppStyles, Colors, Fonts } from '../../theme';
import styles from './SellersStyles';

export default function SellersView(props) {
  const { sellerList, loading,
    searchText,
    selectedValue,
    onChangeSearchText,
    setSelectedValue,
    refreshLoading,
    searchLoader,
    loadMoreDataOnEndReached,
    isMoreDataPinToCollection,
    onRefreshHandler,
    apiRequest,
    redirectBuyerSellerId,
  } = props;

  const debounceValue = useDebounce(searchText, 500);

  useEffect(() => {
    if (searchText == null) return;
    apiRequest(true, true);
  }, [debounceValue]);

  console.log({ sellerList });
  return (
    <View style={styles.container}>
      <CustomNavbar title="Sellers" />
      <SearchBox
        searchText={searchText}
        selectedValue={selectedValue}
        onChangeSearchText={onChangeSearchText}
        setSelectedValue={setSelectedValue}
        searchLoader={searchLoader}
      />
      <FlatList
        style={{ height: '100%' }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreDataOnEndReached}
        onEndReachedThreshold={0.1}
        data={sellerList}
        renderItem={({ item }) => (<BuyerSellerItem isBuyer={false} disableSellerLink showDetail={redirectBuyerSellerId == item.id} item={item} keyExtractor={item => item.id} isSeller />)}
        ListFooterComponent={
          <View style={isMoreDataPinToCollection && { marginVertical: 20 }}>
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
    </View>
  );
}
