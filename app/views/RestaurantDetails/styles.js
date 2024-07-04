import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    ...theme.headerBar,
  },
  pageContainer: {
    right: 20,
    left: 20,
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: theme.white,
    marginTop: 20,
  },
  inputWrapper: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: '100%',
    borderColor: '#999',
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
    width: '95%',
    padding: 12,
    marginTop: 30,
    backgroundColor: theme.brand,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'UberMove-Bold',
  },
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    flexDirection: 'row',
  },
});

export default styles;
