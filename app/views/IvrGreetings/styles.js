import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    marginTop: 20,
  },
  modalCenteredView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalView: {
    height: '90%',
    width: '90%',
    backgroundColor: 'white',
  },
  checkImg: {
    height: 20,
    width: 20,
  },
  modalFooter: {
    width: '100%',
    borderTopColor: theme.lightGray,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
  },
  cardWrapper: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 5,
  },
  titleSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleGreeting: {
    flex: 1,
    alignSelf: 'center',
  },
  icon: {
    height: 55,
    width: 55,
  },
  titleGreetingText: {
    fontSize: 13,
    fontFamily: 'UberMove-Bold',
    marginLeft: 15,
    textTransform: 'capitalize',
  },
  navigator: {
    height: 25,
    width: 15,
    alignSelf: 'center',
  },
  availableGreetingContainer: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingPlayerSection: {
    flex: 1,
    flexDirection: 'row',
  },
  applyButton: {
    alignSelf: 'center',
    borderRadius: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: theme.brand,
    alignItems: 'center',
    height: 30,
  },
  btnContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    height: 30,
  },
  btnIcon: {
    height: 15,
    width: 15,
  },
  btnText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'UberMove-Bold',
  },
  modalCenteredView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalView: {
    borderRadius: 10,
    height: '90%',
    width: '90%',
    backgroundColor: 'white',
  },
  noGreetings: {
    marginTop: 80,
    fontSize: 20,
    textAlign: 'center',
    color: '#777',
    fontFamily: 'UberMove-Regular',
  },
});

export default styles;
