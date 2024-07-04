import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../../components/Loader';
import RestaurentDetailsForm from './form';
import styles from './styles';

import {getRestaurant, updateRestaurant} from '../../redux/actions';

let RestaurantDetails = (props) => {
  useEffect(() => {
    props.getRestaurant();
  }, []);

  const handleSaveDetails = (values) => {
    props.updateRestaurant(values).then(() => {
      Toast.showWithGravity(
        'Restaurant updated successfully.',
        Toast.SHORT,
        Toast.CENTER,
      );
    });
  };

  return (
    <View style={styles.container}>
      <Loader loading={props.isRequesting} />
      {/* <View style={styles.headerView}></View> */}
      <View style={styles.pageContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={{padding: 0, margin: 0, bottom: 20}}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}>
          <View style={styles.inputWrapper}>
            <RestaurentDetailsForm
              onSubmit={(values) => handleSaveDetails(values)}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

function bindAction(dispatch) {
  return {
    getRestaurant: () => dispatch(getRestaurant()),
    updateRestaurant: (params) => dispatch(updateRestaurant(params)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.restaurants.isRequesting,
  restaurantDetails: state.restaurants.restaurantDetails,
});

RestaurantDetails = connect(mapStateToProps, bindAction)(RestaurantDetails);

export default RestaurantDetails;
