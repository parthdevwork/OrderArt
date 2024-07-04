import { StyleSheet } from 'react-native';
import theme from '../../theme';
const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
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
  paymentId: {
    fontSize: 16,
    fontFamily: 'UberMove-Bold',
    color: '#555',
    marginBottom: 5,
  },
  dateDetails: {
    fontFamily: 'UberMove-Bold',
    fontSize: 14,
    color: '#bbb',
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
  listTitle: {
    fontSize: 18,
    fontFamily: 'UberMove-Bold',
    color: '#555',
    paddingHorizontal: 20,
    marginBottom: 10,
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
    marginVertical: 3,
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
    fontSize: 14,
    fontFamily: 'UberMove-Bold',
    marginLeft: 10,
    color: theme.brand,
    textAlign: 'right',
  },
  balanceBlock: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  balance: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
  },
  balanceTitle: {
    fontSize: 12,
    fontFamily: 'UberMove-Regular',
    color: '#777',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: 'UberMove-Bold',
    color: '#555',
  },
});

export default styles;
