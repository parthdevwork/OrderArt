import { Platform } from 'react-native';
import colors from './colors';

export default {
  fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Light',
  fontLight: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Light',
  },
  fontMedium: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : '300',
  },
  fontSemiBold: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Semi-Bold',
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
  },
  fontBold: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Bold',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
  },
  fontExtraBold: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Extra-Bold',
    fontWeight: Platform.OS === 'ios' ? '800' : '300',
  },
  fontHeavy: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Black' : 'Avenir-Black',
    fontWeight: Platform.OS === 'ios' ? '900' : '900',
  },

  placeholderText: {
    color: colors.gray,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Avenir-Light',
  },

  font: {
    size: {
      smallest: 10,
      small: 12,
      default: 14,
      large: 16,
      larger: 18,
      largest: 20,
      xlarge: 26,
    },
  },
};
