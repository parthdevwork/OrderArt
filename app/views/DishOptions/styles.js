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
    backgroundColor: theme.white,
    marginTop: 70,
    ...theme.cardBorder,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: theme.lightGray,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    color: theme.deliverText,
    fontFamily: 'UberMove-Regular',
    fontWeight: '500',
  },
  searchBar: {
    marginBottom: 5,
    padding: 10,
    color: theme.gray,
    fontSize: 18,
    backgroundColor: theme.white,
    borderRadius: 50,
    fontFamily: 'UberMove-Regular',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default styles;
