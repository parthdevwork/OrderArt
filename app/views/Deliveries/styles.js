// OrderCard
import { StyleSheet } from 'react-native'
import theme from '../../theme'

const styles = StyleSheet.create({
	autoAccept: {
		paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	autoAcceptText: {
		fontSize: 16,
		fontWeight: '500',
		color: theme.white,
		marginRight: 5
	},
	card: {
		backgroundColor: '#fff',
		padding: 20,
		marginBottom: 20,
		flexDirection: 'column',
		...theme.cardBorder,
	},
	fontBasicStyle: {
		fontSize: 16,
		color: theme.black
	},
	heading: {
		fontFamily: "Roboto-Bold",
		fontSize: 19
	},
	equalGrid: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	newImg: {
		height: 30,
		width: 30,
		marginRight: 15
	},
	orderAmount: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	price: {
		backgroundColor: theme.brand,
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 20,
	},

	// 
	orderValues: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	trackerIcon: {
		height: 23,
		width: 17
	}
})


export default styles