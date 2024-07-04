import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'

const styles = StyleSheet.create({

	fabOverLayar: {
		zIndex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		position: "absolute",
		top: 0,
		left: 0,
		// backgroundColor: "rgba(0,0,0,0.1)"
	},

	fabButton: {
		width: 50,
		height: 50,
		borderRadius: 30,
		backgroundColor: theme.brand,
		position: 'absolute',
		bottom: 20,
		right: 20,
		zIndex: 1,

		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOpacity: 0.8,
		elevation: 6,
		shadowRadius: 5,
		shadowOffset: { width: 1, height: 1 },

		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},

	fabOptions: {
		zIndex: 1,
		position: "absolute",
		minWidth: 150,
		backgroundColor: theme.white,
		borderRadius: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		bottom: 80,
		right: 20,
		overflow: "hidden",

		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOpacity: 0.8,
		elevation: 6,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 3 },
	},

	fabOptionsItem: {
		padding: 7,
		color: theme.darkGray,
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#fafafa',
	},

	filterIcon: {
		height: 25,
		width: 25,
	},

	fabOptionsIcon: {
		width: 5,
		height: 5,
		margin: 7
	},

	filterSelectedIndicator: {
		width: 15,
		height: 15,
		backgroundColor: 'rgb(44,185,68)',
		position: "absolute",
		top: 0,
		right: 0,
		borderRadius: 10
	}
})


export default styles