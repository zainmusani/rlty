import React, { useEffect } from 'react';
import { RefreshControl, View, ActivityIndicator } from 'react-native';
import { CustomNavbar, BuyerSellerItem, SearchBox, Loader, Text } from '../../components';

import styles from './BuyersStyles';
import { FlatList } from 'react-native-gesture-handler';
import { AppStyles, Colors, Fonts } from '../../theme';
import useDebounce from '../../helpers/useDebounceHook';
export default function BuyersView(props) {
  const {
    buyersList,
    loading,
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
  } = props;

  const debounceValue = useDebounce(searchText, 500);

  console.log({ buyersList });

  useEffect(() => {
    if (searchText == null) return;
    apiRequest(true, true);
  }, [debounceValue]);

  return (
    <View style={styles.container}>
      <CustomNavbar title="Buyers" />
      <SearchBox
        isBuyerView
        searchText={searchText}
        selectedValue={selectedValue}
        onChangeSearchText={onChangeSearchText}
        setSelectedValue={setSelectedValue}
        searchLoader={searchLoader}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={buyersList}
        onEndReached={loadMoreDataOnEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (<BuyerSellerItem isBuyer={true} disableBuyerLink item={item} keyExtractor={item => item.id} />)}
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
