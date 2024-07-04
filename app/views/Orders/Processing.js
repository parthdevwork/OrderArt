import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {getOrders} from '../../redux/actions';

import NoDataFound from '../../common/NoDataFound';
import {getDatesForFilter} from '../../common/utilities';
import OrderCard from './OrderCard';

import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';
import DateFilter from '../../components/DateFilter';

import theme from '../../theme';

const ProcessingOrders = (props) => {
  const [pageData, setPageData] = useState({
    page: 1,
    search: '',
    start_date: null,
    end_date: null,
    isSearching: false,
    isRefreshing: false,
    isLoading: false,
  });
  const [fabState, setFabState] = useState({
    open: false,
    value: 0,
    isChange: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (!props.orders.length && !props.isLoaded) {
        getOrdersData();
      }
      return () => {};
    }, [props.orders]),
  );

  useEffect(() => {
    setPageData({
      ...pageData,
      isLoading: false,
      isSearching: false,
      isRefreshing: false,
    });
    return () => {};
  }, [props.orders]);

  useEffect(() => {
    if (pageData.isLoading || pageData.isRefreshing || pageData.isSearching) {
      getOrdersData();
    }
    return () => {};
  }, [pageData]);

  useEffect(() => {
    setPageData({
      ...pageData,
      ...getDatesForFilter(fabState.value, 'YYYY-MM-DD'),
      page: fabState.isChange ? 1 : pageData.page,
      isRefreshing: fabState.isChange,
    });
  }, [fabState.value]);

  const onRefresh = () => {
    setPageData({
      ...pageData,
      page: 1,
      search: '',
      isRefreshing: true,
    });
  };

  const onSearch = (text) => {
    setPageData({
      ...pageData,
      page: 1,
      search: text,
      isSearching: true,
    });
  };

  const onEndReached = () => {
    setPageData({
      ...pageData,
      page: pageData.page + 1,
      isLoading: true,
    });
  };

  const getOrdersData = () => {
    props.getOrders({
      type: 'processing',
      search: pageData.search,
      page: pageData.page,
      start_date: pageData.start_date,
      end_date: pageData.end_date,
    });
  };

  const renderItem = ({item}) => (
    <OrderCard
      order={item}
      onPress={() => props.navigation.navigate('OrderDetails', {id: item.id})}
    />
  );

  const renderData = () => (
    <>
      <View style={[{height: 50}]}>
        <SearchBar
          value={pageData.search}
          placeholder={'Search'}
          isSearching={pageData.isSearching}
          onSearch={onSearch}
        />
      </View>

      {pageData.isRefreshing && !props.orders.length && (
        <Loader loading={pageData.isRefreshing} inPageLoader={true} />
      )}

      {props.orders.length > 0 ? (
        <FlatList
          style={{paddingHorizontal: 20}}
          data={props.orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            pageData.isLoading && (
              <ActivityIndicator
                animating={true}
                color={theme.brand}
                size="small"
                style={{margin: 20}}
              />
            )
          }
          refreshing={pageData.isRefreshing}
          onRefresh={onRefresh}
          scrollEventThrottle={16}
          onEndReached={() => {
            if (
              props.meta.pageCount > props.meta.currentPage &&
              !pageData.isLoading
            ) {
              onEndReached();
            }
          }}
        />
      ) : !props.isRequesting ? (
        <NoDataFound />
      ) : (
        <ActivityIndicator
          animating={true}
          color={theme.brand}
          size="small"
          style={{margin: 20}}
        />
      )}

      <DateFilter
        filterState={fabState}
        setFilterState={setFabState}
        filterType={'past'}></DateFilter>
    </>
  );

  return renderData();
};

function bindAction(dispatch) {
  return {
    getOrders: (params) => dispatch(getOrders(params)),
  };
}

const mapStateToProps = (state) => ({
  meta: state.orders.meta,
  isRequesting: state.orders.isRequesting,
  orders: state.orders.processingOrdersList,
  isLoaded: state.orders.isProcessingOrderListLoaded,
});

const _ProcessingOrdersScreen = connect(
  mapStateToProps,
  bindAction,
)(ProcessingOrders);

export default _ProcessingOrdersScreen;
