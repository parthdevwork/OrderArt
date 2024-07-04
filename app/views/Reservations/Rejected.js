import React, {useState, useEffect} from 'react'
import { FlatList, ActivityIndicator, View} from 'react-native'
import { connect } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

import { getReservations } from "../../redux/actions";

import NoDataFound from '../../common/NoDataFound'
import { getDatesForFilter } from '../../common/utilities'

import Loader from '../../components/Loader'
import SearchBar from '../../components/SearchBar'
import DateFilter from '../../components/DateFilter'

import theme from '../../theme'

import ReservationCard from './ReservationCard'

const RejectedReservations = (props) => {
	const [pageData, setPageData] = useState({
		page: 1,
		search: '',
		start_date: null,
		end_date: null,
		isSearching: false,
		isRefreshing: false,
		isLoading: false
	});
	
	const [fabState, setFabState] = useState({
		open: false,
		value: 0,
		isChange: false
	})

	useFocusEffect(
		React.useCallback(() => {
			if (!props.reservations.length && !props.isLoaded) {
				getReservationsData()
			}
			return () => { };
		}, [props.reservations])
	);

	useEffect(() => {
		setPageData({
			...pageData,
			isLoading: false,
			isSearching: false,
			isRefreshing: false
		})
		return () => {};
	}, [props.reservations])

	useEffect(() => {
		if (pageData.isLoading || pageData.isRefreshing || pageData.isSearching){
			getReservationsData()
		}
		return () => {};
	}, [pageData])

	useEffect(() => {
		setPageData({
			...pageData,
			...getDatesForFilter(fabState.value),
			page: fabState.isChange ? 1 : pageData.page,
			isRefreshing: fabState.isChange
		})
	}, [fabState.value])

	const onRefresh = () =>	{
		setPageData({
			...pageData,
			page:1,
			search: '',
			isRefreshing: true
		})
	}

	const onSearch = (text) => {
		setPageData({
			...pageData,
			page:1,
			search: text,
			isSearching: true
		})
	}

	const onEndReached = () => {
		setPageData({
			...pageData,
			page: pageData.page+1,
			isLoading: true,
		})
	}

	const getReservationsData = () => {
		props.getReservations({
			status: 'rejected',
			search: pageData.search,
			page: pageData.page,
			start_date: pageData.start_date,
			end_date: pageData.end_date,
		})
	}

	const renderItem = ({ item }) => (
		<ReservationCard reservation={item} onPress={() => props.navigation.navigate('ReservationDetails', { id: item.id })} />
	);
	
	const renderData = () => (
		<>
			<View style={[{height: 50}]}>
				<SearchBar value={pageData.search} placeholder={'Search'} isSearching={pageData.isSearching} onSearch={onSearch}/>
			</View>

			{pageData.isRefreshing && !props.reservations.length && <Loader loading={pageData.isRefreshing} inPageLoader={true} />}

			{props.reservations.length > 0 ?
				<FlatList
					style={{ paddingHorizontal: 20 }}
					data={props.reservations}
					renderItem={renderItem}
					keyExtractor={item => item.id.toString()}
					ListFooterComponent={
						pageData.isLoading && <ActivityIndicator animating = {true} color={theme.brand} size = "small" style={{ margin: 20 }} />
					}
					refreshing={pageData.isRefreshing}
					onRefresh={onRefresh}
					scrollEventThrottle={16}
					onEndReached={() => {
						if(props.meta.pageCount > props.meta.currentPage && !pageData.isLoading) {
							onEndReached()
						}
					}}
				/> : !props.isRequesting ? <NoDataFound /> : <ActivityIndicator animating = {true} color={theme.brand} size = "small" style={{ margin: 20 }} />
			}

			<DateFilter
				filterState={fabState}
				setFilterState={setFabState}
			></DateFilter>
		</>
	)

	return (
		renderData()
	)
}

function bindAction(dispatch) {
	return {
		getReservations: params => dispatch(getReservations(params)),
	};
}

const mapStateToProps = state => ({
	meta: state.reservations.meta,
	isRequesting: state.reservations.isRequesting,
	reservations: state.reservations.rejectedReservationList,
	isLoaded: state.reservations.isRejectedReservationListLoaded,
});

const _RejectedReservationsScreen = connect(
	mapStateToProps,
	bindAction
)(RejectedReservations);

export default _RejectedReservationsScreen;