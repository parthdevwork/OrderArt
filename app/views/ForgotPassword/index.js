import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import FloatingLabelInput from '../../components/FloatingLabelInput'
import styles from './styles';

const ForgotPassword = (props) => {
	const [value, setValue] = useState('');

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={false}>
			<View style={styles.containerContent}>
				<Image
					style={styles.logo}
					resizeMode={'stretch'}
					source={require('../../img/logo.png')}
				/>
				<View style={styles.inputWrapper}>
					<FloatingLabelInput
						label="Email"
						value={value}
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(value) => setValue(value)}
					/>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => props.navigation.navigate('Home')}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default ForgotPassword;
