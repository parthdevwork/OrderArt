import {StyleSheet} from 'react-native';
import theme from '../../theme';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    // ...theme.headerBar,
  },
  pageContainer: {
    paddingHorizontal: 20,
    height: '100%',
    flexDirection: 'column',
    // position: 'absolute',
  },
  optionCard: {
    marginTop: 20,
    backgroundColor: theme.white,
    padding: 20,
    borderRadius: 7,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'UberMove-Bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  itemText: {
    width: '80%',
    fontSize: 17,
    fontWeight: '400',
    color: theme.deliverText,
    fontFamily: 'UberMove-Regular',
  },
  saveButton: {
    backgroundColor: theme.brand,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  roundBtn: {
    // height: 50,
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thresHoldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  minutesBox: {
    height: 45,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  threshHoldValue: {
    fontSize: 22,
    color: colors.white,
    fontFamily: 'UberMove-Bold',
  },
  thresDescription: {
    color: theme.gray,
    fontSize: 16,
    fontFamily: 'UberMove-Regular',
  },
  takeDelayTxt: {
    fontSize: 17,
    color: colors.deliverText,
    width: '28%',
    fontFamily: 'UberMove-Regular',
  },
  minValue: {
    fontSize: 22,
    color: colors.white,
    fontFamily: 'UberMove-Bold',
  },
  delayBtn: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: theme.brand,
    paddingHorizontal: 10,
  },
});

export default styles;
