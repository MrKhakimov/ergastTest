import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {fetchDriverListScrolling} from '../../redux/actions/driversAction';
import {footerLoadingDispatch} from '../../redux/reducers/driversReducer';

type FooterLoadingProps = {
  loading: boolean;
};

const FooterLoadingComponent: FC<FooterLoadingProps> = ({loading}) => {
  if (!loading) {
    return null;
  }
  return (
    <View>
      <ActivityIndicator />
      <Text style={style.footerText}>loading</Text>
    </View>
  );
};

type DriverProps = {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  url: string;
  onPress: any;
};

const DriverItem: FC<DriverProps> = ({
  onPress,
  code,
  dateOfBirth,
  driverId,
  givenName,
  familyName,
  nationality,
  url,
}) => {
  const handleItem = () => {
    onPress({ driverId, dateOfBirth, familyName, givenName, nationality, url});
  };

  return (
    <TouchableOpacity onPress={handleItem} style={style.driverItem}>
      <Text style={style.birthDay}>
        {dateOfBirth}: {nationality}
      </Text>
      <Text style={style.text}>
        {givenName} {familyName}
      </Text>
    </TouchableOpacity>
  );
};

export const DriverList = () => {
  let page = 0;
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    state => state.drivers?.data?.DriverTable?.Drivers,
  );
  const offset = useAppSelector(state => state.drivers?.data?.offset);
  const footerLoading = useAppSelector(state => state.drivers.footerLoading);

  const infiniteScroll = () => {
    if (!footerLoading) {
      dispatch(footerLoadingDispatch(true));
      dispatch(fetchDriverListScrolling(parseInt(offset) + 10)).then(r => {
        page = parseInt(offset) + 1;
      });
    }
  };

  const navigation = useNavigation();

  const navigateToDriver = (item: {}) => {
    navigation.navigate('DriverInfo', {item: item});
  };

  return (
    <FlatList
      ListEmptyComponent={<Text>List Empty</Text>}
      disableVirtualization={false}
      contentContainerStyle={style.flatList}
      data={data}
      renderItem={({item}) => (
        <DriverItem {...item} onPress={navigateToDriver} />
      )}
      keyExtractor={item => item?.driverId}
      ListFooterComponent={<FooterLoadingComponent loading={footerLoading} />}
      onEndReached={infiniteScroll}
      onEndThreshold={1}
    />
  );
};

const style = StyleSheet.create({
  flatList: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: 'blue',
  },
  code: {
    color: 'gray',
    fontSize: 14,
  },
  driverItem: {
    padding: 8,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c8c7',
  },
  birthDay: {
    color: 'gray',
    fontSize: 16,
  },
});
