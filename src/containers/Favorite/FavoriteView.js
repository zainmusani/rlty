import React, {useEffect, useState} from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Text, PropertyItem, SearchBox, Loader, NotificationIcon} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import styles from './FavoriteStyles';
import {activeOpacity} from '../../constants';
import {Actions} from 'react-native-router-flux';
import useDebounce from '../../helpers/useDebounceHook';
export default function MslPropertiesView(props) {
  const {
    propertiesList,
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

  useEffect(() => {
    if (searchText == null) return;
    apiRequest(true, true);
  }, [debounceValue]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text size={Fonts.size.xx} type="bold">
          My Favorites
        </Text>
        <NotificationIcon />
      </View>
      <SearchBox
        searchText={searchText}
        selectedValue={selectedValue}
        onChangeSearchText={onChangeSearchText}
        setSelectedValue={setSelectedValue}
        searchLoader={searchLoader}
      />

      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreDataOnEndReached}
        onEndReachedThreshold={0.1}
        data={propertiesList}
        renderItem={({item}) => (<PropertyItem item={item} isFavouriteView />)}
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
    </View>
  );
}
