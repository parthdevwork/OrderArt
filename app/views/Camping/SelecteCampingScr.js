import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Campaign from './Capmping';

const data = [
  {
    id: 1,
    name: 'Camping',
  },
  {
    id: 2,
    name: 'Analytics',
  },
];

const SelecteCampingScr = () => {
  const [selectedId, setSelectedId] = useState(1);
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {data?.map((item) => {
        return (
          <TouchableOpacity onPress={() => setSelectedId(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
      {selectedId === 1 && <Campaign />}
    </View>
  );
};

export default SelecteCampingScr;
