// OrderCard
import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    ...theme.cardBorder,
  },
  headerView: {
    ...theme.headerBar,
  },
  pageContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 20,
    paddingBottom: 10,
  },
  fontBasicStyle: {
    fontSize: 16,
    color: theme.gray,
    fontFamily: 'UberMove-Regular',
  },
  heading: {
    fontFamily: 'UberMove-Bold',
    fontSize: 19,
  },
  equalGrid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  newImg: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  orderAmount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    backgroundColor: theme.brand,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  //
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: theme.brand,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 7,
  },

  //
  orderValues: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 7,
  },

  searchBlock: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: theme.white,
    borderRadius: 30,
    overflow: 'hidden',
  },

  searchBar: {
    flex: 2,
    paddingVertical: 5,
    color: theme.gray,
    padding: 3,
    paddingLeft: 6,
    marginLeft: 5,
    marginVertical: 0,
    fontSize: 14,
    fontFamily: 'UberMove-Regular',
  },
  searchIcon: {
    marginVertical: 3,
    marginLeft: 7,
    height: 12,
    width: 12,
  },
  searchButton: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    // marginRight: 5
  },
  searchButtonText: {
    fontSize: 12,
    color: theme.brand,
    fontFamily: 'UberMove-Regular',
  },
});

export default styles;
