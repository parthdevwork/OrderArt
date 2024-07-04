import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

const tabsConfigs = [
  {
    image: require('../../icons/home.png'),
    title: 'Home',
    component: 'Home',
  },
  {
    image: require('../../icons/shopping-bag.png'),
    title: 'Order Dashboard',
    component: 'Orders',
  },
  {
    image: require('../../icons/reception-1.png'),
    title: 'Reservations',
    component: 'Reservations',
  },
  {
    image: require('../../icons/reception.png'),
    title: 'Grievance',
    component: 'Grievance',
  },
  {
    image: require('../../icons/planning.png'),
    title: 'Manage',
    component: 'ManageRestaurant',
  },
  {
    image: require('../../icons/news.png'),
    title: 'Reports',
    component: 'Reports',
  },
  {
    image: require('../../icons/logout.png'),
    title: 'Logout',
    component: 'Login',
  },
];

const TabMenu = (props) => {
  const {image, title, component} = props;
  return (
    <TouchableOpacity
      style={styles.tabMenu}
      onPress={() => {
        props.navigation.closeDrawer();
        if (component == 'Login') {
          Alert.alert(
            'Are you sure you want to logout?',
            '',
            [
              {
                text: 'Logout',
                onPress: () => {
                  AsyncStorage.removeItem('access_token');
                  props.navigation.navigate(component);
                },
              },
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          props.navigation.navigate(component);
        }
      }}>
      <Image style={styles.tabImg} resizeMode={'stretch'} source={image} />
      <Text style={styles.tabMenuTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

function CustomDrawerContent(props) {
  return (
    <SafeAreaView>
      <View style={styles.menuContainer}>
        <View style={styles.brandContainer}>
          <Image
            style={styles.brand}
            resizeMode={'stretch'}
            source={require('../../img/logo_drawer.png')}
          />
        </View>
        <ScrollView style={{marginTop: 10}}>
          {tabsConfigs.map((menu, idx) => (
            <TabMenu
              key={idx}
              image={menu.image}
              title={menu.title}
              component={menu.component}
              {...props}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default CustomDrawerContent;
