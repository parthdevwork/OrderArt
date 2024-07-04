import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { loginUser } from "../../redux/actions";
import Loader from '../../components/Loader'
import LoginForm from './form'
import styles from './styles';
import { Alert, BackHandler } from 'react-native'

const LoginScreen = (props) => {

  useEffect(() => {

    const backAction = () => {

      let isFocused = props.navigation.isFocused();
      if (!isFocused) return

      Alert.alert("Hold on!", "Are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('access_token', token);
      props.navigation.navigate('Home')
    } catch (error) {
      console.log('error setting token', error)
    }
  };

  const handleLogin = (values) => {
    props.login(values)
      .then((res) => {
        if (res.data && res.data.status == 200) {
          Toast.showWithGravity('Logged In Successfully.', Toast.SHORT, Toast.CENTER);
          _storeToken(res.data.token)
        } else {
          Toast.showWithGravity('Invalid Credentials, Please try again.', Toast.SHORT, Toast.CENTER);
        }
      })
  }

  return (
    <>
      <Loader loading={props.isRequesting} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}>
        <View style={styles.containerContent}>
          <Image
            style={styles.logo}
            resizeMode={'stretch'}
            source={require('../../img/logo.png')}
          />
          <LoginForm onSubmit={(values) => handleLogin(values)} />
          {/* <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password ? Click Here</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

LoginScreen.navigationOptions = {
  header: null,
}

function bindAction(dispatch) {
  return {
    login: params => dispatch(loginUser(params)),
  };
}

const mapStateToProps = state => ({
  isRequesting: state.users.isRequesting,
});

const _LoginScreen = connect(
  mapStateToProps,
  bindAction
)(LoginScreen);

export default _LoginScreen;