import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';

import styles from './styles';

function ReportFilter({filterState, setFilterState, filterType}) {
  return (
    <>
      {filterState.open && (
        <TouchableOpacity
          style={styles.fabOverLayar}
          onPress={() => {
            setFilterState({...filterState, open: !filterState.open});
          }}></TouchableOpacity>
      )}

      {filterState.open && (
        <View style={styles.fabOptions}>
          {filterState.options.map((item) => (
            <TouchableOpacity
              style={[
                styles.fabOptionsItem,
                filterState.value == item.value && {backgroundColor: '#eee'},
              ]}
              onPress={() => {
                setFilterState({
                  ...filterState,
                  open: false,
                  value: item.value,
                  isChange: true,
                });
              }}>
              <Image
                style={[styles.fabOptionsIcon]}
                source={
                  filterState.value == item.value
                    ? require('../../icons/filled-circle.png')
                    : require('../../icons/outlined-circle.png')
                }
              />
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'UberMove-Regular',
                  fontSize: 15,
                }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fabButton}
        onPress={() => {
          setFilterState({
            ...filterState,
            open: !filterState.open,
          });
        }}>
        <View style={[styles.filterSelectedIndicator]}></View>
        <Image
          style={[styles.filterIcon]}
          source={require('../../icons/filter.png')}
        />
      </TouchableOpacity>
    </>
  );
}

export default ReportFilter;
