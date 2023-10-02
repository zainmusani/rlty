import React from 'react';
import {useEffect} from 'react';
import {View, Image as RnImage, FlatList, RefreshControl, ActivityIndicator, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  Image,
  CustomNavbar,
  SearchBox,
  PropertyItem,
  Loader,
  NotificationIcon,
} from '../../components';
import {activeOpacity} from '../../constants';
import useDebounce from '../../helpers/useDebounceHook';
import {AppStyles, Fonts, Images} from '../../theme';
import styles from './MslPropertiesStyles';
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
    setLoading,
    apiRequest,
  } = props;

  const debounceValue = useDebounce(searchText, 500);

  useEffect(() => {
    if (searchText == null) return;
    apiRequest(true, true);
  }, [debounceValue]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size={Fonts.size.xx} type="bold">
            MLS Properties
          </Text>
          <NotificationIcon />
        </View>
        <SearchBox
          searchText={searchText}
          selectedValue={selectedValue}
          onChangeSearchText={onChangeSearchText}
          setSelectedValue={setSelectedValue}
          searchLoader={searchLoader}
          isMlsView
        />
        <FlatList
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={userPropertyList}
          onEndReached={loadMoreDataOnEndReached}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => (<PropertyItem setMlsLoading={setLoading} item={item} MslPropertiesView />)}
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
    </>
  );
}
