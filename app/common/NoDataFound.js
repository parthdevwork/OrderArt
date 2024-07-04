import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'UberMove-Bold',
  },
});

const NoDataFound = ({title}) => {
  const titleVal = title || 'No data found.';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleVal}</Text>
    </View>
  );
};

export default NoDataFound;
