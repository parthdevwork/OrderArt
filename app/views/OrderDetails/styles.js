import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    ...theme.headerBar,
  },
  fontBasicStyle: {
    fontSize: 16,
    color: theme.gray,
    fontFamily: 'UberMove-Regular',
  },
  pageContainer: {
    right: 20,
    left: 20,
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 20,
    paddingBottom: 10,
  },
  equalGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderValues: {
    flex: 1,
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 7,
  },
  typeQty: {
    width: 80,
    paddingVertical: 9,
    marginTop: 5,
    borderRadius: 50,
    backgroundColor: theme.brand,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTypeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {
    marginHorizontal: 15,
    paddingBottom: 5,
    borderBottomColor: theme.gray,
    borderBottomWidth: 0.5,
  },
  qty: {
    backgroundColor: theme.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 3,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  paymentDetails: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: theme.white,
  },
  printSection: {
    padding: 10,
    backgroundColor: theme.lightGray,
    flexDirection: 'column',
  },
  checkImg: {
    height: 20,
    width: 20,
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 7,
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
  checkbox: {
    height: 20,
    width: 20,
  },
  //
  personHistory: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  personPhoneContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    padding: 2,
    marginTop: 2,
    borderColor: theme.lightGray,
  },
  orderAcceptModal: {
    width: '60%',
    alignSelf: 'center',
    marginVertical: 30,
  },
  acceptOrderInput: {
    height: 50,
    backgroundColor: theme.lighterGray,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 5,
    fontFamily: 'UberMove-Regular',
  },

  // Rejection Modal
  orderStatusBlock: {
    backgroundColor: '#eee',
    marginTop: 5,
    flexDirection: 'row',
    padding: 10,
  },
  rejectPopupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rejectCloseIcon: {
    backgroundColor: theme.lighterGray,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default styles;
