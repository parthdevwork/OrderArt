import { StyleSheet } from 'react-native';
import theme from '../../theme'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	headerView: {
		...theme.headerBar
	},
	pageContainer: {
		right: 20,
		left: 20,
		height: '100%',
		flexDirection: 'column',
		position: 'absolute',
		marginTop: 20
	},
	modalCenteredView: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040',
	},
	modalView: {
		height: '90%',
		width: '90%',
		backgroundColor: "white",
	},
	checkImg: {
		height: 20,
		width: 20
	},
	modalFooter: {
		width: '100%',
		borderTopColor: theme.lightGray,
		borderTopWidth: 1,
		paddingHorizontal: 20,
		marginTop: 10,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 50,
		marginBottom: 10,
	},
})

export default styles