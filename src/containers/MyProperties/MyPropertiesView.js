import React, {useEffect} from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  Image,
  CustomNavbar,
  SearchBox,
  PropertyItem,
  Loader,
} from '../../components';
import useDebounce from '../../helpers/useDebounceHook';
import {AppStyles, Fonts} from '../../theme';
import styles from './MyPropertiesStyles';
export default function MyPropertiesView(props) {
  const {
    userPropertyList,
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
    gotoDashboard,
    apiRequest,
  } = props;

  const debounceValue = useDebounce(searchText, 500);

  useEffect(() => {
    if (searchText == null) return;
    apiRequest(true, true);
  }, [debounceValue]);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title="My Properties"
        leftBtnPress={() =>
          gotoDashboard ? Actions.reset('dashboard') : Actions.pop()
        }
      />
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
        data={userPropertyList}
        onEndReached={loadMoreDataOnEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => <PropertyItem item={item} myProperty />}
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
        ListEmptyComponent={() =>
          !loading && (
            <View style={[AppStyles.mTop20, AppStyles.centerInner]}>
              <Text size={Fonts.size.xvi} color={Colors.accent}>
                No data found
              </Text>
            </View>
          )
        }
      />
      <Loader loading={loading} />
    </View>
  );
}
