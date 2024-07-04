// OrderCard
import {StyleSheet, Dimensions} from 'react-native';
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

  orderValues: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 7,
  },

  modalCenteredView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
  },
  printModalHeader: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: theme.darkBrand,
  },
  printModalFooter: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    width: '50%',
    marginBottom: 10,
    borderLeftWidth: 1,
    borderLeftColor: theme.lightGray,
  },
  counterBtn: {
    backgroundColor: '#d0d2d1',
    height: 40,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    alignSelf: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: 'UberMove-Regular',
  },
});

export default styles;
