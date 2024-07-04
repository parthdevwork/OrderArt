import React from 'react';
import {View, Text, Image, Linking, Platform} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import theme from '../../theme';
import styles from './styles';
import moment from 'moment';
import colors from '../../theme/colors';
const CardHeader = ({order}) => (
  <View style={styles.equalGrid}>
    <View style={{flex: 1}}>
      <Text style={{fontSize: 18, fontFamily: 'Roboto-Bold'}}>
        {order.customer ? order.customer.name : '--'}
      </Text>
    </View>
    <View style={styles.orderAmount}>
      <Text style={styles.heading}>
        {order.customer && order.customer.lifetime_order_count}
      </Text>
      <View style={{flexDirection: 'row'}}>
        {order.viewed == 0 && (
          <Image
            style={styles.newImg}
            source={require('../../img/new_icon.png')}
          />
        )}
        <View style={styles.price}>
          <Text style={{color: '#fff'}}>$ {order.final_amount}</Text>
        </View>
      </View>
    </View>
  </View>
);

const ValueMapper = ({label, value, color = theme.gray}) => (
  <View style={styles.equalGrid}>
    <View style={styles.orderValues}>
      <Text style={styles.fontBasicStyle} numberOfLines={2}>
        {label}
        {': '}
        {value}
      </Text>
    </View>
  </View>
);

const OrderCard = ({order = {}}) => {
  return (
    <View style={styles.card} activeOpacity={0.8}>
      {/* <CardHeader order={order} /> */}
      <View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 2,
              color: theme.brand,
              fontSize: 18,
              fontWeight: '800',
            }}>
            {order?.event}
          </Text>
          {order?.status && (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() => {
                Linking.openURL(order?.delivery_tracking_url).catch((error) => {
                  console.log('Error when handling phone', error);
                });
              }}
              disallowInterruption={true}>
              <View
                style={{
                  backgroundColor: order.context_color || theme.brand,
                  borderRadius: 20,
                  width: 80,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 15, height: 15, marginTop: 7}}
                  source={require('../../img/pin.png')}
                />
                <Text
                  style={{
                    marginLeft: 2,
                    color: theme.white,
                    fontSize: (Platform.OS = 'android' ? 14 : ''),
                    marginTop: 3,
                  }}>
                  Track
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{height: 10}}></View>
        <Text style={{fontSize: 16, fontWeight: '800'}}>
          {order?.customer?.first_name} {order?.customer?.last_name}
        </Text>
        <Text style={{fontSize: 16}}>
          {order?.dropoff_address?.street}
          {', '}
          {order?.dropoff_address?.city}
          {', '}
          {order?.dropoff_address?.state}
          {', '}
          {order?.dropoff_address?.zip_code}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:' + order?.customer?.phone_number).catch(
              (error) => {
                console.log('Error when handling phone', error);
              },
            );
          }}
          disallowInterruption={true}>
          <Text style={{fontSize: 16, color: theme.brand}}>
            {order?.customer?.phone_number}
          </Text>
        </TouchableOpacity>
        <View style={{height: 10}}></View>
        <ValueMapper label={'Order Id'} value={order?.delivery_id || '--'} />
        <ValueMapper
          label={'Delivery Time'}
          value={
            order?.order?.delivery_time
              ? moment(order?.order?.delivery_time).format('h:mm A')
              : '--'
          }
        />
        <ValueMapper
          label={'Delivery Date'}
          value={
            order?.order?.delivery_time
              ? moment(order?.order?.delivery_time).format('MMM DD, YYYY')
              : '--'
          }
        />
        <View style={{height: 10}}></View>
        <ValueMapper label={'Delivery Id'} value={order?.dasher?.id || '--'} />
        {order.status == 'cancelled' && (
          <>
            {typeof order?.actual_pickup_time == 'string' &&
              order?.actual_pickup_time.length > 0 && (
                <ValueMapper
                  label={'Pickup Time'}
                  value={
                    order?.actual_pickup_time
                      ? moment(order?.actual_pickup_time).format(
                          'MMM DD, YYYY h:mm A',
                        )
                      : '--'
                  }
                />
              )}
            <ValueMapper
              label={'Cancelled At'}
              value={
                order?.updated_at
                  ? moment(order?.updated_at).format('MMM DD, YYYY h:mm A')
                  : '--'
              }
            />
          </>
        )}
        {order.status == 'scheduled' && (
          <>
            <ValueMapper
              label={'Est. Pickup Time'}
              value={
                order?.estimated_pickup_time
                  ? moment(order?.estimated_pickup_time).format(
                      'MMM DD, YYYY h:mm A',
                    )
                  : '--'
              }
            />
          </>
        )}
        {order.status == 'picked_up' && (
          <>
            <ValueMapper
              label={'Pick Up Time'}
              value={
                order?.actual_pickup_time
                  ? moment(order?.actual_pickup_time).format(
                      'MMM DD, YYYY h:mm A',
                    )
                  : '--'
              }
            />
            <ValueMapper
              label={'Delivery Time (est.)'}
              value={
                order?.estimated_delivery_time
                  ? moment(order?.estimated_delivery_time).format(
                      'MMM DD, YYYY h:mm A',
                    )
                  : '--'
              }
            />
          </>
        )}
        {order.status == 'delivered' && (
          <>
            <ValueMapper
              label={'Pick Up Time'}
              value={
                order?.actual_pickup_time
                  ? moment(order?.actual_pickup_time).format(
                      'MMM DD, YYYY h:mm A',
                    )
                  : '--'
              }
            />
            <ValueMapper
              label={'Delivered Time'}
              value={
                order?.actual_delivery_time
                  ? moment(order?.actual_delivery_time).format(
                      'MMM DD, YYYY h:mm A',
                    )
                  : '--'
              }
            />
          </>
        )}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Text style={styles.fontBasicStyle} numberOfLines={1}>
            {'Driver Contact'}
            {': '}
          </Text>
          {order?.dasher?.phone_number ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:' + order?.dasher?.phone_number).catch(
                  (error) => {
                    console.log('Error when handling phone', error);
                  },
                );
              }}
              disallowInterruption={true}>
              <Text
                style={{...styles.fontBasicStyle, color: theme.brand}}
                numberOfLines={1}>
                {order?.dasher?.phone_number}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{...styles.fontBasicStyle}} numberOfLines={1}>
              --
            </Text>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Text style={styles.fontBasicStyle} numberOfLines={1}>
            {'Support Number'}
            {': '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:' + '1800958316').catch((error) => {
                console.log('Error when handling phone', error);
              });
            }}
            disallowInterruption={true}>
            <Text style={{color: colors.brand}}>+61 1800958316</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
