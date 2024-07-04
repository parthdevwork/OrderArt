import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    backgroundColor: 'white',
    height: 70,
  },
  pageContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 50,
  },
  screenToggler: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.gray,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigator: {
    height: 25,
    width: 15,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'UberMove-Regular',
    marginLeft: 10,
  },
  alwaysOnTxt: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'UberMove-Bold',
    marginRight: 10,
    letterSpacing: 0.5,
  },
  headerTitle: {
    marginStart: 10,
    fontSize: 22,
    color: theme.deliverText,
    fontWeight: '700',
  },
  logOutTxt: {
    marginStart: 10,
    fontSize: 18,
    color: theme.deliverText,
    fontFamily: 'UberMove-Bold',
  },
  img: {
    height: 42,
    width: 42,
    backgroundColor: theme.brand,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
