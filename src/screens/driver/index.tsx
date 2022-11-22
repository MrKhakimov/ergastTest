import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from 'react';
import {useEffect, useState} from 'react';
import api from '../../utils/api';
import axios from 'axios';

const {baseUrl, drivers} = api;

export function DriverInfoScreen({navigation, route}) {
  const {item} = route.params;
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    (async function fetchUser() {
      try {
        const {data} = await axios.get(
          `${baseUrl}${drivers}/${item?.driverId}/constructors/renault/qualifying.json`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        return setState({
          data: data?.MRData,
          loading: false,
          error: null,
        });

      } catch (error) {
        if (axios.isAxiosError(error)) {

          return setState(prev => ({
            ...prev,
            error: error.message,
          }));

        } else {

          return setState(prev => ({...prev, error: "An unexpected error occurred"}));

        }
      }
    })();
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  }

  if (state?.loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator />
        <Text style={style.text}>loading</Text>
      </View>
    );
  }

  if (state?.error) {
    return (
      <View style={style.container}>
        <Text style={style.text}>{state.error}</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Text style={style.link}>go to back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const linking = async () => {
    await Linking.openURL(item?.url);
  }

  return (
    <View style={style.container1}>
      <Text style={style.title}>{item?.givenName} {item?.familyName}</Text>
      <Text style={style.text}>birthday: {item?.dateOfBirth}</Text>
      <Text style={style.text}>nationality: {item?.nationality}</Text>
      <Text style={style.text}>constructorId: {state?.data?.RaceTable?.constructorId}</Text>

      <TouchableOpacity onPress={linking}>
        <Text style={style.link}>wikipedia</Text>
      </TouchableOpacity>

      {/*<Text style={style.text}>Reces: empty</Text>*/}

      <TouchableOpacity onPress={navigateBack}>
        <Text style={style.link}>go to back</Text>
      </TouchableOpacity>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 8,
  },
  link: {
    fontSize: 20,
    color: 'blue',
    marginTop: 16,
  },
});

