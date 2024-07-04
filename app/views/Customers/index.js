import React, {useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import {
  getCustomers,
  subscribeCustomer,
  unSubscribeCustomer,
  verifyCustomer,
  unVerifyCustomer,
  setSearchText,
} from '../../redux/actions';
import NoDataFound from '../../common/NoDataFound';

import {debounce} from '../../common/utilities';

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

const Customers = (props) => {
  useEffect(() => {
    props.getCustomers({}, true);

    return () => {};
  }, []);

  useLayoutEffect(() => {
    const params = {
      search: props.searchParam,
    };
    debounce(props.getCustomers(params, false), 700);
  }, [props.searchParam]);

  const proceedChangeStatus = (value, key, customer) => {
    const {id} = customer;
    switch (key) {
      case 'subscribe':
        switch (value) {
          case 0:
            props
              .subscribeCustomer(id)
              .then(() => {})
              .catch(() => {});
            break;
          case 1:
            props
              .unSubscribeCustomer(id)
              .then(() => {})
              .catch(() => {});
            break;
        }
        break;
      case 'status':
        switch (value) {
          case 0:
            props
              .verifyCustomer(id)
              .then(() => {})
              .catch(() => {});
            break;
          case 1:
            props
              .unVerifyCustomer(id)
              .then(() => {})
              .catch(() => {});
            break;
        }
        break;
    }
  };

  const ValueMapper = ({label = '', value = '', color = theme.gray}) => (
    <View style={styles.equalGrid}>
      <View style={styles.orderValues}>
        <Text style={styles.fontBasicStyle} numberOfLines={1}>
          {label || ''}
        </Text>
        <Text style={styles.fontBasicStyle}>:</Text>
      </View>
      <View style={{flex: 2, marginLeft: 10}}>
        <Text style={[{...styles.fontBasicStyle}, {color}]} numberOfLines={1}>
          {value || ''}
        </Text>
      </View>
    </View>
  );

  const Button = ({label = '', value = 0, tag, customer, style = {}}) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#dddddd',
        paddingTop: 5,
        ...style,
      }}>
      <Text style={{...styles.fontBasicStyle, marginTop: 5}} numberOfLines={1}>
        {label || ''}
      </Text>
      <Text style={{...styles.fontBasicStyle, margin: 5}}>:</Text>
      <CheckBox
        value={value == 1}
        onValueChange={() => proceedChangeStatus(value, tag, customer)}
        boxType={'square'}
        tintColors={{false: theme.gray, true: theme.darkBrand}}
        tintColor={theme.gray}
        onTintColor={theme.darkBrand}
        onFillColor={theme.darkBrand}
        onCheckColor={theme.white}
      />
    </View>
  );

  const Item = ({customer = {}}) => (
    <View style={styles.card}>
      <ValueMapper
        label={'Name'}
        value={customer.name}
        color={theme.deliverText}
      />
      <ValueMapper label={'Mobile No.'} value={customer.phone_number} />
      <ValueMapper
        label={'Email'}
        value={customer.email}
        color={theme.deliverText}
      />
      <View style={{...styles.buttonContainer, marginTop: 10}}>
        <Button
          style={{borderRightWidth: 1}}
          label={'Subscribed'}
          value={customer.subscribed}
          tag={'subscribe'}
          customer={customer}
        />
        <Button
          label={'Verified'}
          value={customer.status}
          tag={'status'}
          customer={customer}
        />
      </View>
    </View>
  );

  const renderItem = ({item}) => <Item customer={item} />;

  const renderData = () => (
    <>
      {props.isRequesting && !props.customersList.length && (
        <Loader loading={props.isRequesting} />
      )}
      {props.isRequesting && props.customersList.length ? (
        <Loader loading={props.isRequesting} isBlur={true} />
      ) : null}

      <View style={styles.container}>
        <SearchBar
          value={props.searchParam}
          onChange={(text) => {
            props.setSearchText(text);
          }}
        />
        {/* <View style={styles.headerView}></View> */}
        {props.customersList.length > 0 ? (
          <View style={styles.pageContainer}>
            <FlatList
              style={{paddingHorizontal: 20}}
              data={props.customersList}
              contentContainerStyle={{paddingBottom: 30}}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        ) : !props.isRequesting ? (
          <NoDataFound />
        ) : null}
      </View>
    </>
  );

  return renderData();
};

function bindAction(dispatch) {
  return {
    getCustomers: (data, isInitialLoad) =>
      dispatch(getCustomers(data, isInitialLoad)),
    subscribeCustomer: (id) => dispatch(subscribeCustomer(id)),
    unSubscribeCustomer: (id) => dispatch(unSubscribeCustomer(id)),
    verifyCustomer: (id) => dispatch(verifyCustomer(id)),
    unVerifyCustomer: (id) => dispatch(unVerifyCustomer(id)),
    setSearchText: (text) => dispatch(setSearchText(text)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.customers.isRequesting,
  customersList: state.customers.customersList,
  searchParam: state.customers.searchParam,
});

const _Customers = connect(mapStateToProps, bindAction)(Customers);

export default _Customers;
