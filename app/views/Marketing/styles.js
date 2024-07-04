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
    height: '100%',
    // backgroundColor: theme.white,
    marginTop: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  commingSoon: {
    fontSize: 24,
    textAlign: 'center',
    color: '#777',
    fontFamily: 'UberMove-Bold',
  },
  comingSoonIcon: {
    width: 28,
    height: 25,
    marginTop: 4,
  },
  fontBasicStyle: {
    fontSize: 16,
    color: theme.gray,
  },
  equalGrid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderValues: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 7,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    ...theme.cardBorder,
  },
  headerContainer: {
    borderBottomColor: theme.brand,
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '300',
    color: theme.brand,
  },
  orderAmountRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    backgroundColor: theme.brand,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 20,
  },
});

export default styles;
