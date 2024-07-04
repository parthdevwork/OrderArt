import React, { Component } from 'react';

import {
  TouchableOpacity,
  Alert,
} from 'react-native';

import Actions from './Actions';

class Link extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions || (new Actions());
  }

  render() {
    const { url } = this.props;

    if (!url) {
      return null;
    }

    return (
      <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={() => {}}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  openURL(url) {
    try {
      this.actions.openURL(url)
    } catch (error) {
      Alert.alert('Could not open url', error.message);
    }
  }

}

export default Link;
