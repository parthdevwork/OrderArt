import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import CampingTypeCard from './CampingTypeCard';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const CampingType = ({...props}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    if (props.route.params !== undefined) {
      setSelectedItem(parseInt(props?.route?.params?.selectedData?.id));
    } else {
      setSelectedItem(0);
    }
  }, [props.route.params]);

  useEffect(() => {
    fetchType();
  }, [selectedItem]);

  const fetchType = async () => {
    const token = await AsyncStorage.getItem('access_token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.orderart.com.au/campaigns/campaign-categories',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setTypeData(response.data.data);
      })
      .catch((error) => {
        console.log('**Error**', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginHorizontal: 10}}>
        <FlatList
          data={typeData}
          renderItem={({item}) => (
            <CampingTypeCard
              item={item}
              onPress={() => {
                setSelectedItem(item.id);
                props.navigation.navigate('camping', {
                  selectType: item,
                });
              }}
              selectedItem={selectedItem}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CampingType;
