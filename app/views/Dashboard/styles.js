import {Platform, StyleSheet} from 'react-native';
import theme from '../../theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: theme.deliverText,
  },
  headerLeftMenu: {
    flex: 1,
  },
  headerIcon: {
    flex: 5,
    alignItems: 'center',
  },
  headerRightMenu: {
    flex: 1,
  },
  sliderBlock: {
    height: 182,
    alignItems: 'center',
    marginRight: 70,
  },
  deliveryCard: {
    height: 'auto',
    marginTop: 13,
    marginBottom: 15,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: theme.lightGray,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
  },
  delivaryContentBlock: {},
  actionBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    marginTop: 20,
  },
  actionBox: {
    flexDirection: 'row',
  },
  alertContainer: {flexDirection: 'row', paddingTop: 20},
  deliveryAlerts: {
    fontSize: Platform.OS === 'ios' ? 18 : 14,
    fontWeight: 'bold',
    color: '#555555',
  },
  AlertButton: {flexDirection: 'row', marginTop: 12},
  textOfContainer: {
    fontSize: 17,
    color: theme.green,
  },
  picked_upContainer: {
    backgroundColor: theme.orange,
    height: 'auto',
    width: '100%',
    marginTop: 15,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 6,
  },
  delayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    paddingLeft: 10,
    backgroundColor: theme.lightGray,
    width: '54%',
    borderRadius: 12,
    height: 45,
  },
  icon: {height: 30, width: 30, marginHorizontal: 8},
  alertIcons: {
    flexDirection: 'row',
    height: 45,
    width: '43%',
    backgroundColor: theme.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  delivaryActionBlock: {},
  delivaryActionBox: {
    // flex: 1,
    flexDirection: 'row',
  },
  delivaryTypes: {
    // flex: 1,
    marginHorizontal: Platform.OS === Platform ? 7.5 : 4,
  },
  deliverText: {
    marginHorizontal: 25,
    fontSize: Platform.OS === 'ios' ? 18 : 14,
    fontWeight: '700',
  },
  summary: {
    fontSize: Platform.OS === 'ios' ? 18 : 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  delivaryActionText: {
    fontSize: Platform.OS === 'ios' ? 15 : 12.5,
    color: theme.deliverType,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'UberMove-Regular',
  },
  delivaryActionNumber: {
    fontSize: 16,
    color: theme.deliverText,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'UberMove-Regular',
    paddingTop: 4,
  },

  whatsContainer: {
    height: 75,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: '#f6995c',
    justifyContent: 'center',
    // marginHorizontal: 15,
  },
  whatsText: {
    padding: 7,
    fontSize: Platform.OS === 'ios' ? 15 : 12,

    fontWeight: '600',
    color: 'white',
  },
  slideActionBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideActionBox: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 7,
  },
  action: {
    margin: 9,
    borderRadius: 100,
    backgroundColor: theme.black,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 15,
  },
  slideTitleImg: {
    width: 25,
    height: 25,
  },
  actionImg: {
    width: 35,
    height: 35,
    // marginBottom: 5,
  },
  slideTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slideTitle: {
    // marginLeft: 10,
    fontSize: 18,
    color: theme.darkGray,
    // fontWeight: '900',
    fontFamily: 'UberMove-Bold',
  },
  slideDetailTitleText: {
    fontSize: Platform === Platform.OS ? 17 : 12.5,
    color: theme.darkGray,
    fontFamily: 'UberMove-Regular',
  },
  slideDetailTitleValue: {
    fontSize: Platform === Platform.OS ? 24 : 20,
    color: '#000',
    // fontWeight: '900',
    fontFamily: 'UberMove-Bold',
    marginTop: 8,
  },
  slideDetailTitleSubValue: {
    fontSize: Platform.OS === 'ios' ? 15 : 11,
    color: theme.gray,
    // fontWeight: '900',
    // fontFamily: 'UberMove-Bold',
  },
  slideDetailTitleDisc: {
    fontSize: Platform.OS === 'ios' ? 14 : 9,
    color: theme.gray,
    fontFamily: 'UberMove-Regular',
  },
  actionText: {
    fontSize: Platform.OS === 'ios' ? 16 : 11,

    color: theme.deliverText,
    // fontWeight: '800',
    textAlign: 'center',
    fontFamily: 'UberMove-Bold',
  },
  slide: {
    marginTop: 15,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: theme.lightGray,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 15,
  },
  menuDrawer: {
    height: 40,
    width: 40,
    margin: 10,
  },
  leftHeaderIcon: {
    height: 45,
    width: 45,
  },
  brand: {
    width: 200,
    height: 40,
    margin: 10,
    alignItems: 'center',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.white,
  },
  bottomNavigator: {
    height: 70,
    backgroundColor: theme.deliverText,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabMenu: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabImg: {
    width: 30,
    height: 30,
  },
  tabMenuTitle: {
    color: theme.white,
    fontSize: 16,
  },
  disabledServicesText: {
    fontSize: Platform.OS === 'ios' ? 17 : 11,
    color: theme.white,
    marginBottom: 5,
  },
  disabledServiceDetailsText: {
    fontSize: Platform.OS === 'ios' ? 15 : 9,
    color: theme.white,
  },
});

export default styles;
