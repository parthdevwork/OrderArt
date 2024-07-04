import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import Loader from '../../components/Loader';
import NoDataFound from '../../common/NoDataFound';
import {
  getDishes,
  disableDish,
  enableDish,
  filterList,
  resetFilterAndList,
} from '../../redux/actions';

import styles from './styles';
import theme from '../../theme';

const SearchBar = (props) => {
  const {value, onChange} = props;
  return (
    <View
      style={{
        paddingHorizontal: 30,
        backgroundColor: theme.white,
        paddingTop: 10,
      }}>
      <TextInput
        style={styles.searchBar}
        placeholder={'Search'}
        placeholderTextColor={theme.gray}
        value={value}
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
};

let DishOptions = (props) => {
  useEffect(() => {
    props.getDishes();
  }, []);

  useEffect(
    () =>
      props.navigation.addListener('blur', (e) => {
        props.resetFilterAndList();
      }),
    [props.navigation],
  );

  const toggleSwitch = (item) => {
    item.status == 1
      ? props.disableDish(item.itemid)
      : props.enableDish(item.itemid);
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{width: '80%'}}
        onPress={() => {
          props.navigation.navigate('EditDish', {
            id: item.itemid,
            title: item.itemname,
          });
        }}>
        <Text style={styles.itemText}>{item.itemname || 'N/A'}</Text>
      </TouchableOpacity>
      <Switch
        trackColor={{false: theme.lightGray, true: theme.ultraLight}}
        thumbColor={item.status == 1 ? theme.darkBrand : theme.gray}
        ios_backgroundColor={
          item.status == 1 ? theme.ultraLight : theme.lightGray
        }
        onValueChange={() => toggleSwitch(item)}
        value={item.status == 1}
      />
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <>
      {props.isRequesting && !props.dishes.length && (
        <Loader loading={props.isRequesting} />
      )}
      <View style={styles.container}>
        <SearchBar
          value={props.filterText}
          onChange={(text) => {
            props.filterList(text);
          }}
        />
        {/* <View style={styles.headerView}></View> */}
        <View style={styles.pageContainer}>
          {props.dishes.length > 0 ? (
            <FlatList
              data={props.dishes}
              contentContainerStyle={{paddingBottom: 30}}
              renderItem={renderItem}
              keyExtractor={(item) => item.itemid.toString()}
            />
          ) : !props.isRequesting ? (
            <NoDataFound />
          ) : null}
          <View style={{height: 50}}></View>
        </View>
      </View>
    </>
  );
};

function bindAction(dispatch) {
  return {
    getDishes: (params) => dispatch(getDishes(params)),
    enableDish: (params) => dispatch(enableDish(params)),
    disableDish: (params) => dispatch(disableDish(params)),
    filterList: (text) => dispatch(filterList(text)),
    resetFilterAndList: () => dispatch(resetFilterAndList()),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.dishes.isRequesting,
  dishes: state.dishes.dishesList,
  filterText: state.dishes.filterText,
});

DishOptions = connect(mapStateToProps, bindAction)(DishOptions);

export default DishOptions;
