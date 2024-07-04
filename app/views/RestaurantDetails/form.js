import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

import {connect} from 'react-redux';

import {Field, reduxForm} from 'redux-form';

import FloatingLabelInput from '../../components/FloatingLabelInput';
import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (!values.resname) {
    errors.resname = 'Field is required.';
  }
  if (!values.busownname) {
    errors.busownname = 'Field is required.';
  }
  if (!values.rescontactpercell) {
    errors.rescontactpercell = 'Field is required.';
  }
  if (!values.busowncontact) {
    errors.busowncontact = 'Field is required.';
  }
  if (!values.resemail) {
    errors.resemail = 'Field is required.';
  }
  if (!values.resinfo) {
    errors.resinfo = 'Field is required.';
  }
  if (!values.disdelivery && values.disdelivery != 0) {
    errors.disdelivery = 'Field is required.';
  }
  if (!values.avgdeltime && values.avgdeltime != 0) {
    errors.avgdeltime = 'Field is required.';
  }
  if (!values.avgwaittime && values.avgwaittime != 0) {
    errors.avgwaittime = 'Field is required.';
  }
  if (!values.delvrycost && values.delvrycost != 0) {
    errors.delvrycost = 'Field is required.';
  }
  if (!values.minorder && values.minorder != 0) {
    errors.minorder = 'Field is required.';
  }
  if (!values.avgcost && values.avgcost != 0) {
    errors.avgcost = 'Field is required.';
  }
  if (!values.avgdishes && values.avgdishes != 0) {
    errors.avgdishes = 'Field is required.';
  }
  if (!values.resopentime) {
    errors.resopentime = 'Field is required.';
  }
  if (!values.resclosetime) {
    errors.resclosetime = 'Field is required.';
  }

  return errors;
};

const TextInput = (props) => {
  const {input, meta, ...inputProps} = props;
  return (
    <View style={styles.inputWrapper}>
      <FloatingLabelInput
        keyboardType={inputProps.keyboardType}
        onChangeText={input.onChange}
        label={inputProps.label}
        style={styles.textInput}
        defaultValue={`${input.value}`}
        secureTextEntry={inputProps.secureTextEntry || false}
        autoCapitalize="none"
      />
    </View>
  );
};

const RadioSet = (props) => {
  const {
    radios,
    input: {value, onChange},
  } = props;
  return (
    <View style={{...styles.inputWrapper, flex: 1, flexDirection: 'row'}}>
      {radios.map((radio) => (
        <Radio
          key={radio.label}
          {...radio}
          onChange={onChange}
          checked={radio.value === value}
        />
      ))}
    </View>
  );
};

const Radio = (props) => {
  const {checked, label} = props;
  const handlePress = () => props.onChange(props.value);
  return (
    <TouchableOpacity onPress={handlePress} style={{marginRight: 20}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {checked ? (
          <Image
            style={[styles.btn, styles.img]}
            source={require('../../img/dish_checked.png')}
          />
        ) : (
          <Image
            style={[styles.btn, styles.img]}
            source={require('../../img/dish_unchecked.png')}
          />
        )}

        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            color: '#000',
            fontFamily: 'UberMove-Regular',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

let RestaurentDetailsForm = (props) => (
  <>
    <Field name={'resname'} label={'Restaurant Name'} component={TextInput} />
    {/* <Field
      name={'restype'}
      radios={[
        {label: 'Hotel', value: 'hotel'},
        {label: 'Restaurant', value: 'restaurant'},
      ]}
      component={RadioSet}
    /> */}
    <Field name={'busownname'} label={'Owner Name'} component={TextInput} />
    <Field
      name={'rescontactpercell'}
      label={'Contact Number / Phone No.'}
      component={TextInput}
    />
    <Field
      name={'busowncontact'}
      label={'Restaurant Landline No.'}
      component={TextInput}
    />
    <Field name={'resemail'} label={'Email'} component={TextInput} />
    {/* <Field name={'resinfo'} label={'Restaurent info'} component={TextInput} /> */}
    <Field
      name={'disdelivery'}
      label={'Delivery Distance(KMS)'}
      keyboardType="numeric"
      component={TextInput}
    />
    {/* <Field
      name={'avgdeltime'}
      label={'Delivery Time (Mins)'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'avgwaittime'}
      label={'Pickup Time (Mins)'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'delvrycost'}
      label={'Delivery Fee'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'minorder'}
      label={'Minimum Order'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'avgcost'}
      label={'Avg count for 2 (in Rs.)'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'avgdishes'}
      label={'Avg No. of Dishes'}
      keyboardType="numeric"
      component={TextInput}
    />
    <Field
      name={'resopentime'}
      label={'Restaurant Open Time'}
      component={TextInput}
    />
    <Field
      name={'resclosetime'}
      label={'Restaurant Close Time'}
      component={TextInput}
    /> */}
    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  </>
);
RestaurentDetailsForm = reduxForm({
  form: 'restaurant-details-form', // a unique identifier for this form
  enableReinitialize: true,
  validate,
})(RestaurentDetailsForm);

RestaurentDetailsForm = connect((state) => ({
  initialValues: state.restaurants.restaurantDetails,
}))(RestaurentDetailsForm);

export default RestaurentDetailsForm;
