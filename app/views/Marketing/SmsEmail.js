import React from 'react';

import {
	View,
	Text,
	Image
} from 'react-native';

import styles from './styles'

const SmsAndEmailScreen = (props) => {
	return (
		<>
			<View style={styles.container}>
				<View style={styles.pageContainer}>
					<Image style={styles.comingSoonIcon} source={require('../../icons/sand-clock.png')} />
					<Text style={styles.commingSoon}>Coming Soon...</Text>
				</View>
			</View>
		</>
	);
}

export default SmsAndEmailScreen;