import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../theme';

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigator: {
    height: 25,
    width: 15,
    alignSelf: 'center',
  },
});

const PickerCard = ({onPress, image, title}) => {
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      activeOpacity={1}
      onPress={onPress}>
      <View style={styles.titleSection}>
        <Image style={{height: 45, width: 45}} source={image} />
        <Text
          style={{fontSize: 18, fontFamily: 'UberMove-Bold', marginLeft: 10}}>
          {title}
        </Text>
      </View>
      <Image
        style={styles.navigator}
        source={require('../img/report_selection_next_arrow.png')}
      />
    </TouchableOpacity>
  );
};

export default PickerCard;
