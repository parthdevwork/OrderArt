import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MessageCard from './MessageCard';
import CampingButton from './CampingButton';
import CustomTextinput from './CustomTextinput';

const EditSmsModal = ({...props}) => {
  const [description, setDescription] = useState(props?.item?.sms_content);

  const handleDone = () => {
    props.onEditDone(description);
    props.onPress();
  };

  return (
    <View style={styles.modaleView}>
      <TouchableOpacity style={styles.modalHeader} onPress={props.onPress}>
        <AntDesign name="arrowleft" size={25} style={{width: '20%'}} />
        <Text style={{fontSize: 22, fontFamily: 'UberMove-Bold'}}>
          Edit SMS
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 25}}>
        <CustomTextinput
          label={'Please enter the text'}
          textInputStyle={{height: 100}}
          multiline={true}
          onChangeText={(txt) => setDescription(txt)}
          value={description}
          item={props.item}
        />

        <MessageCard
          showEditIcon={false}
          inputStyle={{marginTop: 10}}
          item={props.item}
          description={description}
          text={description}
        />
        <CampingButton
          name={'Done'}
          inputStyle={{marginTop: 20}}
          onPress={handleDone}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modaleView: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
});

export default EditSmsModal;
