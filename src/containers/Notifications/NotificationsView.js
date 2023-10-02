import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { CustomNavbar, NotificationItem, Text } from '../../components';
import { AppStyles, Colors, Fonts } from '../../theme';
import styles from './NotificationsStyles';
export default function NotificationsView(props) {
  const {
    notificationList,
    useProfile,
    loading,
    refreshLoading,
    loadMoreDataOnEndReached,
    isMoreDataPinToCollection,
    onRefreshHandler,
  } = props;
  let tempArray = [...notificationList];

  tempArray = tempArray.sort((a, b) => {

    return b.id - a.id;
  });

  return (
    <View style={styles.container}>
      <CustomNavbar title="Notifications" />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}
        keyExtractor={item => item.id}
        // data={notificationList}
        data={tempArray}
        onEndReached={loadMoreDataOnEndReached}
        renderItem={({ item }) => {

          return <NotificationItem useProfile={useProfile} item={item} />;
        }}
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
        ListEmptyComponent={() => (
          <View style={[AppStyles.mTop20, AppStyles.centerInner]}>
            <Text size={Fonts.size.xvi} color={Colors.accent}>
              No data found
            </Text>
          </View>
        )}
      />
    </View>
  );
}
