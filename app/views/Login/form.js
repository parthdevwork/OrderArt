import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Field, reduxForm} from 'redux-form';

import FloatingLabelInput from '../../components/FloatingLabelInput';
import styles from './styles';
import theme from '../../theme';

const required = (value) =>
  value || typeof value === 'number' ? undefined : 'Field is required.';
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const TextInput = (props) => {
  const {
    input,
    meta: {touched, error},
    ...inputProps
  } = props;
  return (
    <View style={styles.inputWrapper}>
      <FloatingLabelInput
        onChangeText={input.onChange}
        label={inputProps.label}
        style={styles.textInput}
        defaultValue={input.value}
        secureTextEntry={inputProps.secureTextEntry}
        autoCapitalize="none"
      />
      {touched && error && <Text style={{color: theme.brand}}>{error}</Text>}
    </View>
  );
};

const LoginForm = (props) => (
  <>
    <Field
      name={'username'}
      label={'Username'}
      component={TextInput}
      validate={[email, required]}
      secureTextEntry={false}
    />
    <Field
      name={'password'}
      label={'Password'}
      component={TextInput}
      validate={required}
      secureTextEntry={true}
    />
    <TouchableOpacity style={styles.loginButton} onPress={props.handleSubmit}>
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>
  </>
);

export default reduxForm({
  form: 'login-form',
})(LoginForm);
