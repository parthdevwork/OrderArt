import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';

const CampingTypeCard = ({...props}) => {
  return (
    // <View style={styles.container}>
    //   <View style={{marginStart: 10, width: '88%'}}>
    //     <Text style={styles.title}>{props.item.title}</Text>
    //     <Text style={styles.description}>{props.item.description}</Text>
    //   </View>
    //   <Pressable
    //     activeOpacity={0.7}
    //     style={styles.boxView}
    //     onPress={props.onPress}>
    //     <View
    //       style={[
    //         styles.checkBox,
    //         {
    //           borderWidth: props.selectedItem === props.item.id ? 0 : 1,
    //           backgroundColor:
    //             props.selectedItem === props.item.id
    //               ? colors.darkBrand
    //               : colors.white,
    //         },
    //       ]}>
    //       {props.selectedItem === props.item.id && (
    //         <AntDesign name="check" color={colors.white} size={20} />
    //       )}
    //     </View>
    //   </Pressable>
    // </View>
    <Pressable
      style={[
        styles.container,
        {
          borderWidth: props.selectedItem === props.item.id ? 1 : 0,
          borderColor:
            props.selectedItem === props.item.id
              ? colors.darkBrand
              : colors.white,
        },
      ]}
      onPress={props.onPress}>
      <View style={{marginStart: 10, width: '88%'}}>
        <Text style={styles.title}>{props.item.category_name}</Text>
        <Text style={styles.description}>{props.item.category_type}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    // borderWidth: 1,
    // borderColor: colors.gray,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    letterSpacing: 1,
    color: colors.black,
    fontFamily: 'UberMove-Medium',
  },
  description: {
    fontSize: 16,
    // color: colors.darkBrand,
    color: colors.gray,
    fontFamily: 'UberMove-Regular',
  },
  boxView: {
    marginRight: 10,
    justifyContent: 'center',
  },
  checkBox: {
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CampingTypeCard;
