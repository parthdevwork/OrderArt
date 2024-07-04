import {StyleSheet} from 'react-native';
import theme from '../../theme';
const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4.65,
  elevation: 5,
};

const styles = StyleSheet.create({
  shadow,
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerView: {
    ...theme.headerBar,
  },
  pageContainer: {
    right: 0,
    left: 0,
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 20,
  },
  surchargeTitle: {
    fontSize: 16,
    fontFamily: 'UberMove-Bold',
    color: '#555',
    marginBottom: 5,
  },
  graphBlock: {
    height: 190,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    ...shadow,
  },
  cardWrapper: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    minHeight: 70,
  },
  slideActionBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideActionBox: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  priceStyle: {
    fontSize: 12,
    fontFamily: 'UberMove-Bold',
    color: theme.black,
    textAlign: 'right',
  },
  surchargeDiscription: {
    fontSize: 12,
    fontFamily: 'UberMove-Bold',
    color: theme.gray,
    marginTop: 10,
  },
  surchargeOptionBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surchargeOptionText: {
    fontSize: 12,
    fontFamily: 'UberMove-Regular',
  },
  surchargeOptionIcon: {
    width: 12,
    height: 12,
  },
  surchargeSpacer: {
    width: 20,
  },
});

export default styles;
