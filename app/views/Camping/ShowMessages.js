import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axois from 'axios';
import ValentineSmsCard from './ValentineSmsCard';
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';

const ShowMessages = ({...props}) => {
  const [selectId, setSelectId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [messageType, setMessageType] = useState([]);
  const navigation = useNavigation();
  console.log('++', props);
  const data = [
    {
      id: '1',
      description: 'This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: 'https://www.google.co.in',
      charcter: 150,
    },
    {
      id: '2',
      description: ' This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: ' https://www.google.co.in',
      charcter: 120,
    },
    {
      id: '3',
      description: ' This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: ' https://www.google.co.in',
      charcter: 152,
    },
    {
      id: '4',
      description: ' This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: ' https://www.google.co.in',
      charcter: 160,
    },
    {
      id: '5',
      description: ' This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: ' https://www.google.co.in',
      charcter: 180,
    },
    {
      id: '6',
      description: 'This is a Sample sms. This content will be sent.',
      gamil: 'mailto:axy@gmail.com ',
      link: 'https://www.google.co.in',
      charcter: 150,
    },
  ];

  useEffect(() => {
    if (props.route.params !== undefined) {
      if (props.route.params.selectedItem != undefined) {
        setSelectId(props.route.params.selectedItem.id);
      }
      setTypeId(parseInt(props.route.params.typeId));
    } else {
      setSelectId(data[0].id);
    }
  }, [props.route.params]);

  useEffect(() => {
    fetchData();
  }, [typeId]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token && typeId) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.orderart.com.au/campaigns/category/${typeId}/sms-contents`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axois
        .request(config)
        .then((response) => {
          setMessageType(response.data.data);
        })
        .catch((error) => {
          console.log('***error***', error);
        });
    } else {
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white', height: 40, marginTop: 10}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            justifyContent: 'flex-start',

            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Image
            style={{width: 25, height: 25}}
            resizeMode="stretch"
            source={require('../../img/left-arrow.png')}
          />
          <Text
            style={{
              fontSize: 22,
              color: theme.deliverText,
              marginLeft: 40,
              fontFamily: 'UberMove-Bold',
            }}>
            {props?.route ? props?.route?.params?.typename : null}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 15, marginTop: 5}}>
        <FlatList
          data={messageType}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ValentineSmsCard
              item={item}
              index={index}
              onPress={() => {
                setSelectId(item.id);
                props.navigation.navigate('camping', {
                  selectMessage: item,
                });
              }}
              selectData={selectId}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ShowMessages;

const styles = StyleSheet.create({});
