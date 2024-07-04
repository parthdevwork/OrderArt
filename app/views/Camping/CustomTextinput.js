import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CustomTextinput = ({
  label,
  mainViewStyle,
  textInputStyle,
  onChangeText,
  value,
  number,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(props.item ? true : false);
  console.log(number);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(true);

  return (
    <View style={[styles.container, mainViewStyle]}>
      <Text
        style={[
          styles.label,
          isFocused || props.value ? styles.labelFocused : null,
        ]}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => inputRef.focus()}
        style={{textInputStyle}}>
        <TextInput
          ref={(input) => (inputRef = input)}
          {...props}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputMode={number == true ? 'numeric' : null}
          style={[
            styles.input,
            textInputStyle,
            isFocused && styles.inputFocused,
            {fontFamily: 'UberMove-Regular'},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    marginVertical: 5,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 12,
    fontSize: 16,
    color: '#aaa',
    paddingHorizontal: 5,
  },
  labelFocused: {
    top: -7,
    fontSize: 12,
    color: '#007bff',
    backgroundColor: 'white',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
    height: 100,
  },
  inputFocused: {
    borderColor: '#007bff',
  },
});

export default CustomTextinput;
