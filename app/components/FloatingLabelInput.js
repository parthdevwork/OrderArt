import React, {Component} from 'react';
import {View, TextInput, Animated, LogBox} from 'react-native';
import theme from '../theme';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }

  UNSAFE_componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const {label, ...props} = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', theme.deliverText],
      }),
      fontFamily: 'UberMove-Regular',
    };

    const inputStyle = {
      borderBottomWidth: 1,
      borderBottomColor: '#555',
      borderBottomColor: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#555', theme.brand],
      }),
    };

    return (
      <View style={{paddingTop: 18}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <Animated.View style={inputStyle}>
          <TextInput
            {...props}
            style={{
              fontSize: 18,
              color: '#000',
              margin: 0,
              padding: 0,
              height: 40,
              fontFamily: 'UberMove-Regular',
            }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
        </Animated.View>
      </View>
    );
  }
}

export default FloatingLabelInput;
