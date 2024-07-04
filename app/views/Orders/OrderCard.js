import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import theme from '../../theme';
import styles from './styles';

const CardHeader = ({ order }) => (
  <View style={styles.equalGrid}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontFamily: 'UberMove-Bold' }}>
        {order.customer ? order.customer.name : '--'}
      </Text>
    </View>
    <View style={styles.orderAmount}>
      <Text style={styles.heading}>
        {order.customer && order.customer.lifetime_order_count}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {order.viewed == 0 && (
          <Image
            style={styles.newImg}
            source={require('../../img/new_icon.png')}
          />
        )}
        <View style={styles.price}>
          <Text style={{ color: '#fff' }}>$ {order.final_amount}</Text>
        </View>
      </View>
    </View>
  </View>
);

const ValueMapper = ({ label, value, color = theme.gray, afterValue }) => (
  <View style={styles.equalGrid}>
    <View style={styles.orderValues}>
      <Text style={styles.fontBasicStyle} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.fontBasicStyle}>:</Text>
    </View>
    <View
      style={{
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 7,
      }}>
      <Text style={[{ ...styles.fontBasicStyle }, { color }]} numberOfLines={1}>
        {value}
      </Text>
      {afterValue && afterValue}
    </View>
  </View>
);

const OrderCard = ({ order = {}, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      <CardHeader order={order} />
      <View style={{ marginTop: 5 }}>
        <ValueMapper
          label={'Order Type'}
          value={order.order_type || '--'}
          color={theme.deliverText}
        />
        <ValueMapper label={'Order No.'} value={order.number || '--'} />
        <ValueMapper
          label={'Status'}
          value={order.order_status || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Payment Mode'}
          value={order.payment_mode || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Order Date'}
          value={order.order_placed_at || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Delivery Date'}
          value={order.order_expected_at || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Promo Applied'}
          value={order.promo || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Distance to Delivery'}
          value={order.customer ? order.customer.distance : '--'}
          color={theme.deliverText}
          afterValue={
            order.delivery_tracking_url ? (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  Linking.openURL(order.delivery_tracking_url).catch(
                    (error) => {
                      console.log('Error when handling phone', error);
                    },
                  );
                }}
                disallowInterruption={true}>
                <Image
                  style={styles.trackerIcon}
                  source={require('../../img/location.png')}></Image>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
