import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';

const InitScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      header: () => null,
    });

    const initials = async () => {
      return await AsyncStorage.getItem('access_token').then((value) =>
        value != null ? 'Home' : 'Login',
      );
    };

    initials().then((value) => {
      props.navigation.dispatch(StackActions.replace(value));
    });
  });

  return <></>;
};

export default InitScreen;
