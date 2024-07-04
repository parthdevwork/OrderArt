import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';
import styles from './styles';

const CardHeader = ({reservation}) => (
  <View style={styles.equalGrid}>
    <View style={{flex: 1}}>
      <Text style={{fontSize: 18, fontFamily: 'UberMove-Bold'}}>
        {reservation
          ? `${reservation.first_name} ${reservation.last_name}`
          : '--'}
      </Text>
    </View>
    <View style={styles.orderAmount}>
      <Text style={styles.heading}>
        {reservation.details &&
          reservation.details.length &&
          reservation.details[0].quantity}
      </Text>
      <View style={{flexDirection: 'row'}}>
        {reservation.viewed == 0 && (
          <Image
            style={styles.newImg}
            source={require('../../img/new_icon.png')}
          />
        )}
        {/* <View style={styles.price}>
          <Text style={{color: '#fff'}}>$ 10</Text>
        </View> */}
      </View>
    </View>
  </View>
);

const ValueMapper = ({label, value, color = theme.gray}) => (
  <View style={styles.equalGrid}>
    <View style={styles.orderValues}>
      <Text style={styles.fontBasicStyle} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.fontBasicStyle}>:</Text>
    </View>
    <View style={{flex: 1, marginLeft: 10}}>
      <Text style={[{...styles.fontBasicStyle}, {color}]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

const ReservationCard = ({reservation = {}, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      <CardHeader reservation={reservation} />
      <View style={{marginTop: 5}}>
        <ValueMapper label={'Order No.'} value={reservation.id || '--'} />
        <ValueMapper
          label={'Status'}
          value={reservation.status || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Order Date'}
          value={reservation.order_date || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Reservation Date'}
          value={reservation.reservation_date || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Guests'}
          value={reservation.guests || '--'}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Event'}
          value={reservation.event || '--'}
          color={theme.deliverText}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ReservationCard;
