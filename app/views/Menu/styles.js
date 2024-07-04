import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: theme.brand,
    height: '100%',
  },
  brandContainer: {
    backgroundColor: theme.brand,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    height: 45,
    width: '80%',
  },
  tabMenu: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  tabImg: {
    width: 30,
    height: 30,
   
  },
  tabMenuTitle: {
    color: theme.deliverText,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: '600',
    justifyContent: 'center',
    marginTop: 3,
    fontFamily: 'UberMove-Regular',
  },
});

export default styles;
