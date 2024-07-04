import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../../theme';
import styles from './styles';

const Card = ({onPress, grievance}) => {
  const CardHeader = () => (
    <View style={({...styles.equalGrid}, {flexDirection: 'column'})}>
      {/* <View style={styles.headerContainer}>
				<Text style={styles.headerText}>
					99 Grills Restro Admin
				</Text>
			</View> */}
      <View style={styles.orderAmountRow}>
        <Text
          style={{fontSize: 20, color: '#000', fontFamily: 'UberMove-Bold'}}>
          {grievance.customer && grievance.customer.name}
        </Text>
        {/* <View style={styles.price}>
          <Text
            style={{
              fontSize: 20,
              color: theme.white,
              fontFamily: 'UberMove-Regular',
            }}>
            $ 10
          </Text>
        </View> */}
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

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <CardHeader />
      <View style={{marginTop: 5}}>
        <ValueMapper
          label={'Order No.'}
          value={grievance.order_id}
          color={theme.deliverText}
        />
        <ValueMapper
          label={'Entry Time'}
          value={grievance.last_modified && grievance.last_modified.at}
        />
        <ValueMapper label={'Type'} value={grievance.subject} />
      </View>
    </TouchableOpacity>
  );
};

export default Card;
