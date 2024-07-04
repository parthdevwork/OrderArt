import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const CreatedDone = ({ ...props }) => {
  const navigation = useNavigation();

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
          <TouchableOpacity style={styles.pageVeiw} onPress={props.onClose}>
            <AntDesign name="close" size={17} color={'#6f787c'} />
          </TouchableOpacity>
          <View style={styles.checkViewOuterlayer}>
            <View style={styles.checkViewInnerlayer}>
              <Feather name="check" size={58} color={'white'} style={{}} />
            </View>
          </View>

          <Text style={styles.createText}>Campaign Created</Text>
          <Text style={styles.campaignDescription}>
            Your campaign has been created successfully.
          </Text>
          <TouchableOpacity style={styles.goHomeButton} onPress={() => { navigation.navigate("Home") }}>
            <Text style={styles.goHomeText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pageVeiw: {
    height: 40,
    width: 40,
    marginTop: 30,
    borderRadius: 20,
    borderColor: '#e8e8e8',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  checkViewOuterlayer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 130,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#92e2d9',
    backgroundColor: '#baeeea',
    marginTop: 25,
  },
  checkViewInnerlayer: {
    height: 100,
    width: 100,
    borderRadius: 55,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#27cebb',
    alignItems: 'center',
  },
  createText: {
    color: '#f0364e',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 25,
  },
  campaignDescription: {
    width: '75%',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    color: '#949c9f',
    fontWeight: '600',
  },
  goHomeButton: {
    paddingVertical: 15,
    backgroundColor: '#dbdfe4',
    width: '60%',
    borderRadius: 25,
    marginTop: 250,
  },
  goHomeText: {
    textAlign: 'center',
    color: '#4c4e53',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default CreatedDone;
