import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import colors from '../../theme/colors';
import { formatDate } from '../../utilities/Halper/fomatDate';

const DateTimeModal = ({ open, onRequestClose, onSave, onDateChange}) => {
  const [date, setDate] = useState(new Date());
 
  // const formatDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };

  const handleSavePressed = () => {
    const formattedDate = formatDate(date);
    const hours = date.getHours();
    if (hours < 8 || hours > 18) {
      onSave(null, "Error in Saving. Campaigns should be scheduled between 8 AM to 6 PM in restaurant timezone");
    } else {
      onSave(formattedDate, null);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onRequestClose}>
      <Pressable style={styles.modalView} onPress={onRequestClose}>
        <View style={styles.centerView}>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setDate(date);
              onDateChange(date);
            }}
            onDateChange={(date) => setDate(date)}
            mode="datetime"
            is24hourSource="locale"
            locale="en-AU"
          />
          <View style={styles.modelBottomRow}>
            <TouchableOpacity
              onPress={onRequestClose}
              style={styles.cancelBtn}>
              <Text style={styles.modalBtnTxt}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSavePressed}>
              <Text style={styles.modalBtnTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  saveBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelBottomRow: {
    flexDirection: 'row',
    height: 55,
    borderTopWidth: 1,
    borderColor: '#f0364e',
    marginTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.lighterBrand,
  },
  modalBtnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default DateTimeModal;
