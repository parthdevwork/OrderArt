import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerContent: {
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  logo: {
    width: 250,
    height: 45,
    margin: 10,
    alignSelf: 'center',
  },
  inputWrapper: {
    alignSelf: 'center',
    width: '100%',
    borderColor: '#999',
    marginTop: 20
  },
  loginButton: {
    alignSelf: 'center',
    width: '95%',
    padding: 12,
    marginTop: 30,
    backgroundColor: theme.brand,
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  forgotPasswordText: {
    color: '#075951',
    fontSize: 18
  },
  forgotPassword: {
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
  }
});

export default styles;
