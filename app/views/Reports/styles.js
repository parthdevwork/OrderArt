import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: theme.white,
    marginTop: 0,
    borderRadius: 10,
  },
  content: {
    height: Dimensions.get('window').height - 222,
    padding: 15,
  },
  filter: {
    flexDirection: 'row',
  },
  reportSection: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportSubSection: {
    backgroundColor: '#fff',
    width: '47%',
    borderRadius: 10,
    aspectRatio: 10 / 9,
    padding: 10,
    flexDirection: 'column',
  },
  reportSubSectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  reportIconImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  reportSubSectionHeadName: {
    color: '#000',
    fontFamily: 'UberMove-Regular',
    fontSize: 15,
  },
  reportSectionDetailBlock: {
    fontSize: 24,
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: 'UberMove-Bold',
  },
  grievanceReport: {
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: 'UberMove-Regular',
  },
});

export default styles;
