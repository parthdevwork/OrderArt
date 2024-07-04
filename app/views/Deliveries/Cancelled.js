import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import NoDataFound from '../../common/NoDataFound'
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URLS } from '../../configs/url';
import Axios from 'axios';
import OrderCard from './OrderCard'
import theme from '../../theme'
import { getDatesForFilter } from '../../common/utilities'
import DateFilter from '../../components/DateFilter'

const Cancelled = (props) => {
	const [orders, setOrders] = useState([]);
	const [meta, setMeta] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [isRequesting, setIsRequesting] = useState(false);
	const [pageData, setPageData] = useState({
		page: 1,
		search: '',
		...getDatesForFilter(1, 'YYYY-MM-DD'),
		isSearching: false,
		isRefreshing: false,
		isLoading: false
	});

	const [fabState, setFabState] = useState({
		open: false,
		value: 1,
		isChange: false
	})

	useFocusEffect(
		React.useCallback(() => {
			if (!orders.length && !isLoaded) {
				getOrdersData()
			}
			return () => { };
		}, [orders])
	);

	useEffect(() => {
		if (pageData.isLoading || pageData.isRefreshing || pageData.isSearching) {
			getOrdersData()
		}
		return () => { };
	}, [pageData])

	useEffect(() => {
		setPageData({
			...pageData,
			isLoading: false,
			isSearching: false,
			isRefreshing: false
		})
		return () => { };
	}, [orders])

	useEffect(() => {
		setPageData({
			...pageData,
			...getDatesForFilter(fabState.value, 'YYYY-MM-DD'),
			page: fabState.isChange ? 1 : pageData.page,
			isRefreshing: fabState.isChange
		})
	}, [fabState.value])

	const getOrdersData = async () => {
		setIsRequesting(true);
		const token = await AsyncStorage.getItem('access_token');

		let headers = {
			accept: 'application/json',
			'content-type': 'application/x-www-form-urlencoded',
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		} else return;

		let ordersRequest = await Axios.get(
			API_URLS.BASE_URL_V2 + 'doordash-logs',
			{
				headers,
				params: {
					status: 'cancelled',
					page: pageData.page,
					'per-page': 20,
					search: pageData.search,
					start_date: pageData.start_date,
					end_date: pageData.end_date,
					sort: '-id',
				}
			},
		);

		if (
			ordersRequest &&
			ordersRequest.status == 200 &&
			ordersRequest.data &&
			ordersRequest.data.status == 200
		) {
			setMeta(ordersRequest.data.meta);
			setOrders(
				pageData.page == 1 ?
					ordersRequest.data.data :
					[...orders, ...ordersRequest.data.data]
			);
		}
		setIsLoaded(true);
		setIsRequesting(false);
	}

	const onRefresh = () => {
		setPageData({
			...pageData,
			page: 1,
			search: '',
			isRefreshing: true
		})
	}

	const onSearch = (text) => {
		setPageData({
			...pageData,
			page: 1,
			search: text,
			isSearching: true
		})
	}

	const onEndReached = () => {
		setPageData({
			...pageData,
			page: pageData.page + 1,
			isLoading: true,
		})
	}

	const renderItem = ({ item }) => (
		<OrderCard order={item} />
	);

	const renderData = () => (
		<>
			<View style={[{ height: 50 }]}>
				<SearchBar value={pageData.search} placeholder={'Search'} isSearching={pageData.isSearching} onSearch={onSearch} />
			</View>

			{/* {pageData.isRefreshing && orders.length && <Loader loading={pageData.isRefreshing} inPageLoader={true} />} */}
			{orders.length > 0 ?
				<FlatList
					style={{ paddingHorizontal: 20 }}
					data={orders}
					renderItem={renderItem}
					keyExtractor={item => item.id.toString()}
					ListFooterComponent={
						pageData.isLoading && <ActivityIndicator animating={true} color={theme.brand} size="small" style={{ margin: 20 }} />
					}
					refreshing={pageData.isRefreshing}
					onRefresh={onRefresh}
					scrollEventThrottle={16}
					onEndReached={() => {
						if (meta.pageCount > meta.currentPage && !pageData.isLoading) {
							onEndReached()
						}
					}}
				/> : !isRequesting ? <NoDataFound /> : <ActivityIndicator animating={true} color={theme.brand} size="small" style={{ margin: 20 }} />
			}
			<DateFilter filterState={fabState} setFilterState={setFabState} filterType={'past'}></DateFilter>
		</>
	)

	return (
		renderData()
	);
}

export default Cancelled;