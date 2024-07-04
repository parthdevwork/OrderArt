import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontBasicStyle: {
    fontSize: 16,
    color: theme.gray,
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
    backgroundColor: theme.white,
    marginTop: 20,
    borderRadius: 10,
  },
  equalGrid: {
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
    height: '100%',
    marginTop: 0,
    flexDirection: 'column',
    ...theme.cardBorder,
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomColor: theme.brand,
    borderBottomWidth: 2,
    paddingBottom: 15,
    marginBottom: 10,
  },
  call: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  note: {
    marginVertical: 5,
    color: theme.gray,
  },
  actionButton: {
    width: '100%',
    backgroundColor: theme.brand,
    marginHorizontal: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 2,
  },
});

export default styles;
