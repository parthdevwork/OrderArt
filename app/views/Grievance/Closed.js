import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {getGrievances} from '../../redux/actions';

import NoDataFound from '../../common/NoDataFound';
import {getDatesForFilter} from '../../common/utilities';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';
import DateFilter from '../../components/DateFilter';

import theme from '../../theme';

const Closed = (props) => {
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
      if (!props.grievances.length && !props.isLoaded) {
        getGrievancesData();
      }
      return () => {};
    }, [props.grievances]),
  );

  useEffect(() => {
    setPageData({
      ...pageData,
      isLoading: false,
      isSearching: false,
      isRefreshing: false,
    });
    return () => {};
  }, [props.grievances]);

  useEffect(() => {
    if (pageData.isLoading || pageData.isRefreshing || pageData.isSearching) {
      getGrievancesData();
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

  const getGrievancesData = () => {
    props.getGrievances({
      type: 'closed',
      search: pageData.search,
      page: pageData.page,
      start_date: pageData.start_date,
      end_date: pageData.end_date,
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('GrievanceDetails', {id: item.id});
      }}
      style={{
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        flexDirection: 'column',
      }}>
      <Text
        style={{
          color: theme.deliverText,
          fontSize: 20,
          fontWeight: '500',
          fontFamily: 'UberMove-Regular',
        }}>
        {item.customer && item.customer.name}
      </Text>
    </TouchableOpacity>
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

      {pageData.isRefreshing && !props.grievances.length && (
        <Loader loading={pageData.isRefreshing} inPageLoader={true} />
      )}

      {props.grievances.length > 0 ? (
        <FlatList
          style={{paddingHorizontal: 20}}
          data={props.grievances}
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
    getGrievances: (params) => dispatch(getGrievances(params)),
  };
}

const mapStateToProps = (state) => ({
  meta: state.grievance.meta,
  isRequesting: state.grievance.isRequesting,
  grievances: state.grievance.closedGrievances,
  isLoaded: state.grievance.isClosedGrievanceLoaded,
});

const _Closed = connect(mapStateToProps, bindAction)(Closed);

export default _Closed;
