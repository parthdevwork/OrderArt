import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';

import Loader from '../../components/Loader';
import NoDataFound from '../../common/NoDataFound';
import {getDishes, markDishOfDay} from '../../redux/actions';

import styles from './styles';

let DishDetails = (props) => {
  useEffect(() => {
    props.getDishes();
  }, []);

  const ListItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        props.markDishOfDay(item.itemid, item.dishoftheday == 1 ? 0 : 1)
      }>
      <Text style={styles.listText}>{item.itemname}</Text>
      {item.dishoftheday == 1 ? (
        <Image
          style={[styles.btn, styles.img]}
          // style={styles.img}
          source={require('../../img/dish_checked.png')}
        />
      ) : (
        <Image
          style={[styles.btn, styles.img]}
          source={require('../../img/dish_unchecked.png')}
        />
      )}
    </TouchableOpacity>
  );

  const renderData = () => (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <View style={styles.pageContainer}>
        <View>
          <Image
            style={styles.dishImg}
            source={require('../../img/todays_dish.png')}
          />
        </View>
        <View style={styles.listContainer}>
          <View style={styles.cardHeader}>
            <Text style={{fontSize: 18, fontWeight: '400'}}>Dish Name</Text>
            <Text style={{fontSize: 18, fontWeight: '400'}}>
              Dish of The Day
            </Text>
          </View>
          <FlatList
            data={props.dishes}
            contentContainerStyle={{paddingBottom: 30}}
            renderItem={ListItem}
            keyExtractor={(item) => item.itemid.toString()}
          />
        </View>
      </View>
    </View>
  );

  return (
    <>
      {props.isRequesting && !props.dishes.length && (
        <Loader loading={props.isRequesting} />
      )}
      {props.dishes.length > 0 ? (
        renderData()
      ) : !props.isRequesting ? (
        <NoDataFound />
      ) : null}
    </>
  );
};

function bindAction(dispatch) {
  return {
    getDishes: (params) => dispatch(getDishes(params)),
    markDishOfDay: (id, value) => dispatch(markDishOfDay(id, value)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.dishes.isRequesting,
  dishes: state.dishes.dishesList,
});

DishDetails = connect(mapStateToProps, bindAction)(DishDetails);

export default DishDetails;
