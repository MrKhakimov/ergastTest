import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useCallback, useEffect} from 'react';
import {fetchDriverList} from '../../redux/actions/driversAction';
import {DriverList} from './DriverList';

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const {errorStatus, errorText, loading} = useAppSelector(
    state => state.drivers,
  );

  const handleFetchDriver = useCallback(() => {
    dispatch(fetchDriverList()).then();
  }, []);

  useEffect(() => {
    handleFetchDriver();
  }, []);

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator />
        <Text style={style.text}>loading</Text>
      </View>
    );
  }

  if (errorStatus) {
    return (
      <View style={style.container}>
        <Text style={style.text}>{errorText}</Text>
        <TouchableOpacity onPress={handleFetchDriver}>
          <Text style={style.link}>reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <DriverList />;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  link: {
    fontSize: 20,
    color: 'blue',
    marginTop: 16,
  },
});
