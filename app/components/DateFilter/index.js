import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';

import styles from './styles';
import colors from '../../theme/colors';

function DateFilter({filterState, setFilterState, filterType}) {
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
          <TouchableOpacity
            style={[
              styles.fabOptionsItem,
              filterState.value == 0 && {backgroundColor: '#eee'},
            ]}
            onPress={() => {
              setFilterState({open: false, value: 0, isChange: true});
            }}>
            <Image
              style={[styles.fabOptionsIcon]}
              source={
                filterState.value == 0
                  ? require('../../icons/filled-circle.png')
                  : require('../../icons/outlined-circle.png')
              }
            />
            <Text style={{fontFamily: 'UberMove-Regular', color: colors.black}}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.fabOptionsItem,
              filterState.value == 1 && {backgroundColor: '#eee'},
            ]}
            onPress={() => {
              setFilterState({open: false, value: 1, isChange: true});
            }}>
            <Image
              style={[styles.fabOptionsIcon]}
              source={
                filterState.value == 1
                  ? require('../../icons/filled-circle.png')
                  : require('../../icons/outlined-circle.png')
              }
            />
            <Text style={{color: '#000', fontFamily: 'UberMove-Regular'}}>
              Today
            </Text>
          </TouchableOpacity>
          {filterType == 'past' ? (
            <>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 5 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 5, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 5
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={{color: '#000', fontFamily: 'UberMove-Regular'}}>
                  Yesterday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 6 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 6, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 6
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={{color: '#000', fontFamily: 'UberMove-Regular'}}>
                  Past 7 Days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 7 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 7, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 7
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={{color: '#000', fontFamily: 'UberMove-Regular'}}>
                  Past 30 Days
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 2 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 2, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 2
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={[styles.fabOptionsText]}>Tomorrow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 3 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 3, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 3
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={[styles.fabOptionsText]}>Next 7 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fabOptionsItem,
                  filterState.value == 4 && {backgroundColor: '#eee'},
                ]}
                onPress={() => {
                  setFilterState({open: false, value: 4, isChange: true});
                }}>
                <Image
                  style={[styles.fabOptionsIcon]}
                  source={
                    filterState.value == 4
                      ? require('../../icons/filled-circle.png')
                      : require('../../icons/outlined-circle.png')
                  }
                />
                <Text style={[styles.fabOptionsText]}>Next 30 Days</Text>
              </TouchableOpacity>
            </>
          )}
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
        {filterState.value != 0 && (
          <View style={[styles.filterSelectedIndicator]}></View>
        )}
        <Image
          style={[styles.filterIcon]}
          source={require('../../icons/filter.png')}
        />
      </TouchableOpacity>
    </>
  );
}

export default DateFilter;
