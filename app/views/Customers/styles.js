import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    ...theme.headerBar,
    marginTop: -1,
  },
  fontBasicStyle: {
    fontSize: 16,
    color: theme.gray,
    fontFamily: 'UberMove-Regular',
  },
  pageContainer: {
    right: 0,
    left: 0,
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 70,
    paddingBottom: 30,
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
    backgroundColor: theme.white,
    marginBottom: 20,
    padding: 20,
    ...theme.cardBorder,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    backgroundColor: theme.brand,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 50,
  },
  searchBar: {
    marginBottom: 2,
    padding: 10,
    color: theme.gray,
    fontSize: 18,
    backgroundColor: theme.white,
    borderRadius: 50,
    fontFamily: 'UberMove-Regular',
    borderColor: 'black',
    borderWidth: 0.5,
  },
});

export default styles;
