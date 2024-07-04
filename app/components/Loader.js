import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import theme from '../theme/colors';

const Loader = (props) => {
  const {loading, isBlur = false} = props;

  return props.inPageLoader ? (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        },
      ]}>
      <ActivityIndicator size="large" color={theme.brand} animating={loading} />
    </View>
  ) : (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading && !props.inPageLoader}>
      <View
        style={[
          styles.modalBackground,
          isBlur ? {backgroundColor: '#00000040'} : {},
        ]}>
        <View
          style={[
            styles.activityIndicatorWrapper,
            isBlur
              ? {
                  backgroundColor: '#FFFFFF',
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                }
              : {},
          ]}>
          <ActivityIndicator
            size="large"
            color={theme.brand}
            animating={loading && !props.inPageLoader}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
