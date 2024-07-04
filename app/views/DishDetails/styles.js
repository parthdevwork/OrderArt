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
		right: 0,
		left: 0,
		height: '100%',
		flexDirection: 'column',
		position: 'absolute',
		marginTop: 20,
		paddingHorizontal: 20,
		paddingBottom: 30
	},
	dishImg: {
		height: 220,
		width: '100%',
		borderRadius: 5
	},
	listContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: theme.white,
		marginTop: 20,
		paddingHorizontal: 20,
		padding: 20
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: theme.brand,
		borderBottomWidth: 1,
		paddingVertical: 20,
		alignItems: 'center'
	},
	listText: {
		width: '90%',
		color: theme.darkGray,
		fontSize: 16
	},
	img: {
		height: 20,
		width: 20
	},
	btn: {
		flexDirection: 'row'
	}
})

export default styles