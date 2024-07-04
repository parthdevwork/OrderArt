import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import MessageCard from './MessageCard';
import CampingButton from './CampingButton';
import colors from '../../theme/colors';
import DateTimeModal from './DateTimeModal';
import {FlatList} from 'react-native';
import Textfeild from './Textfeild';
import SelectCardType from './SelectCardType';
import EditSmsModal from './EditSmsModal';
import CreatedDone from './CreatedDone';
import VerificationCodeSent from './VerificationCodeSent';
import theme from '../../theme';
import {formatDate} from '../../utilities/Halper/fomatDate';
import moment from 'moment';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const selecteCardData = [
  {
    id: 1,
    type: 'All Customers',
    icon: 'phone',
    data: [
      {
        id: 0,
        subData: '123456789 demo',
      },
      {
        id: 1,
        subData: '123456789 demo',
      },
    ],
  },
  {
    id: 2,
    type: 'Search & Select',
    icon: 'search',
  },
];
const searchdata = [
  {
    id: 1,
    name: 'seacrh by number ',
  },
  {
    id: 2,
    name: 'search by name',
  },
];
const data = [
  {
    id: 1,
    name: 'Create',
  },
  {
    id: 2,
    name: 'Analytics',
  },
];

const Campaign = ({...props}) => {
  const [selectedType, setSelectedType] = useState(0);
  const intialDate = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [open, setOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [searchtypeId, setSearchTypeId] = useState(1);
  const [selectedCheckData, setSelectedCheckData] = useState([]);

  const [selectMessageData, setSelectMessageData] = useState(null);

  const [selectTypeData, setSelectTypeData] = useState(null);
  const [selectedId, setSelectedId] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isVerificationCode, setIsVerificationCode] = useState(false);
  const [campingName, setCampingName] = useState('');
  const [campingData, setCampingData] = useState('');
  const [contactList, setContactList] = useState([]);
  const [createCapingData, setCreateCapingData] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState();
  const refRBSheet = useRef();
  const refSearch = useRef();
  const [error, setError] = useState(null);
  const [contactinfo, setContactinfo] = useState();
  let contactId;
  if (selectedCheckData.length > 0) {
    contactId = selectedCheckData.map((item) => item.id);
  }

  useEffect(() => {
    getCamping();
    getContactList(page);
  }, []);

  const getCamping = async () => {
    const token = await AsyncStorage.getItem('access_token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.orderart.com.au/campaigns/restaurant-campaign-categories',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const lastdata = response?.data?.data?.length - 1;
        setCampingData(response?.data?.data[lastdata]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditSms = (editedMessage) => {
    setSelectMessageData((prevData) => ({
      ...prevData,
      sms_content: editedMessage,
    }));
  };
  const getContactList = async (pageNumber) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('access_token');
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.orderart.com.au/campaigns/subscribed-customers?page=${pageNumber}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      if (response.data.data.length > 0) {
        setContactList((prevList) => [...prevList, ...response.data.data]);
        setPage(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getContactList(page);
    }
  };
  // useEffect(() => {
  //   const formattedDate = formatDate(date);
  //   setDate(formattedDate)

  // }, []);

  useEffect(() => {
    if (props.route.params !== undefined) {
      setSelectMessageData(props.route.params.selectMessage);
      setSelectTypeData(props.route.params.selectType);
    }
  }, [props.route.params]);

  const handleCheckboxToggle = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id],
    }));

    setSelectedCheckData((prevState) => {
      if (prevState.some((selectedItem) => selectedItem.id === item.id)) {
        return prevState.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        return [...prevState, item];
      }
    });
  };

  const removeFromSelectedData = (item) => {
    setSelectedCheckData((prevState) =>
      prevState.filter((selectedItem) => selectedItem.id !== item.id),
    );

    setCheckedItems((prevState) => ({
      ...prevState,
      [item.id]: false,
    }));
  };
  const clearAll = () => {
    setSelectedCheckData([]);
    setCheckedItems({});
  };

  const renderJsonData1 = () => {
    const dataToShow =
      (selectedType === 2 &&
        selectedCheckData !== undefined &&
        selectedCheckData.slice(0, 6)) ||
      [];

    return (
      <FlatList
        data={dataToShow}
        renderItem={({item, index}) => (
          <View key={index} style={styles.sampleData}>
            <Text style={{color: '#878e94', fontFamily: 'UberMove-Regular'}}>
              {item.contactNumber}{' '}
            </Text>
            <Text style={{color: '#878e94', fontFamily: 'UberMove-Regular'}}>
              {item.firstName} {item.lastName}
            </Text>
            <TouchableOpacity onPress={() => removeFromSelectedData(item)}>
              <Feather name="x" size={20} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
      />
    );
  };
  console.log('-=-=-=-=-=-=-=--=>', selectMessageData);
  const filteredUserData = contactList.filter((item) => {
    if (activeCall) {
      return true;
    } else {
      if (textInput === '') return true;
      if (searchtypeId === 1)
        return item.contactNumber
          .toLowerCase()
          .includes(textInput.toLowerCase());
      if (searchtypeId === 2)
        return item.firstName.toLowerCase().includes(textInput.toLowerCase());
      return false;
    }
  });

  // const createCampaigns = async () => {
  //   const token = await AsyncStorage.getItem('access_token');
  //   let data = JSON.stringify({
  //     campaign_name: campingName,
  //     campaign_type: 1,
  //     sms_content_id: 0,
  //     sms_content_text: selectMessageData.sms_content,
  //     scheduled_datetime: selectedDate.toString(),
  //     target_users: selectedCheckData,
  //     subscribed_customers: contactId,
  //     customers_list: null,
  //   });

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://api.orderart.com.au/campaigns/scheduled-campaign',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: data,
  //   };
  //   if (error) {
  //     console.log('===========================>');
  //     Toast.showWithGravity(
  //       'Error in Saving.Campaigns should be scheduled between 8 AM to 6 PM in restaurant timezone',
  //       Toast.SHORT,
  //       Toast.CENTER,
  //     );
  //   } else {
  //     axios
  //       .request(config)
  //       .then((response) => {
  //         setCreateCapingData(response?.data?.data);
  //         setTimeout(() => {
  //           Toast.showWithGravity(
  //             response.data.message || 'Saved sucessfully.',
  //             Toast.SHORT,
  //             Toast.CENTER,
  //           );
  //         }, 100);
  //         setIsVerificationCode(true);
  //       })
  //       .catch((error) => {

  //         console.log('Error', error);
  //         Toast.showWithGravity(
  //           'Error in Saving.Campaigns should be scheduled between 8 AM to 6 PM in restaurant timezone',
  //           Toast.SHORT,
  //           Toast.CENTER,
  //         );
  //       });
  //   }
  // };

  const createCampaigns = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      let data = JSON.stringify({
        campaign_name: campingName,
        campaign_type: 1,
        sms_content_id: 0,
        sms_content_text: selectMessageData.sms_content,
        scheduled_datetime: selectedDate.toString(),
        target_users: selectedCheckData,
        subscribed_customers: contactId,
        customers_list: null,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.orderart.com.au/campaigns/scheduled-campaign',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      setCreateCapingData(response?.data?.data);
      setTimeout(() => {
        Toast.showWithGravity(
          response.data.message || 'Saved successfully.',
          Toast.SHORT,
          Toast.CENTER,
        );
      }, 100);
      setIsVerificationCode(true);
    } catch (error) {
      console.log('Error', error);
      Toast.showWithGravity(
        'Error in Saving. Campaigns should be scheduled between 8 AM to 6 PM in restaurant timezone',
        Toast.SHORT,
        Toast.CENTER,
      );
    }
  };

  const verifyCamping = async () => {
    try {
      if (!verifyOtp) {
        setTimeout(() => {
          Toast.showWithGravity('Please Enter OTP', Toast.SHORT, Toast.CENTER);
        }, 100);
        return;
      }

      if (verifyOtp.length < 6) {
        setTimeout(() => {
          Toast.showWithGravity(
            'Please Enter valid OTP',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
        return;
      }

      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        setTimeout(() => {
          Toast.showWithGravity(
            'Authorization token missing',
            Toast.SHORT,
            Toast.CENTER,
          );
        }, 100);
        return;
      }

      const data = JSON.stringify({
        campaign_id: createCapingData.id,
        campaign_otp: verifyOtp,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.orderart.com.au/campaigns/validate-campaign-creation-otp',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log('responseresponse', response);

      setTimeout(() => {
        Toast.showWithGravity(
          response.data.message || 'OTP Verified.',
          Toast.SHORT,
          Toast.CENTER,
        );
      }, 100);

      setIsVerificationCode(false);
      refRBSheet.current.close();
      setIsDone(true);
    } catch (error) {
      console.log(
        'Error:',
        JSON.stringify(error?.response?.data?.error.message),
      );
      setIsVerificationCode(true);
      setTimeout(() => {
        Toast.showWithGravity(
          JSON.stringify(error?.response?.data?.error.message),
          Toast.SHORT,
          Toast.CENTER,
        );
      }, 100);
    }
  };

  const onSave = (selectedDate, errorMessage) => {
    if (errorMessage) {
      setError(errorMessage); // Set the error message in state
    } else {
      setSelectedDate(selectedDate); // Set the selected date in state
      setError(null); // Clear any previous error message
    }
    setOpen(false); // Close the modal
  };
  console.log('=-=-=-=>', selectTypeData?.category_name);
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.lighterGray}}>
      <View style={{marginHorizontal: 15}}>
        <View style={styles.tabView}>
          {data?.map((item) => {
            return (
              <TouchableOpacity onPress={() => setSelectedId(item.id)}>
                <Text style={styles.tabTxt}>{item.name}</Text>
                <View
                  style={{
                    borderBottomColor:
                      selectedId === item.id ? colors.darkBrand : colors.white,
                    borderBottomWidth: selectedId === item.id ? 1.5 : 0,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedId === 1 && (
          <>
            <View style={styles.btnView}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '92%', flexDirection: 'row'}}>
                  <AntDesign
                    name="mobile1"
                    size={20}
                    color={'#52c7b9'}
                    style={{marginHorizontal: 10}}
                  />
                  <Text style={styles.btnTxt}>Campaign Type</Text>
                </View>
                {selectTypeData != null || campingData != undefined ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('campingType', {
                        selectedData:
                          selectTypeData != null || campingData != undefined
                            ? selectTypeData
                            : campingData.campaign_sms_category,
                      })
                    }>
                    <AntDesign name="edit" size={20} color={colors.brand} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('campingType', {
                        selectedData:
                          campingData != undefined
                            ? campingData.campaign_sms_category
                            : '',
                      })
                    }>
                    <AntDesign
                      name="right"
                      size={18}
                      color={colors.gray}
                      style={{marginEnd: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {selectTypeData != null || campingData != undefined ? (
                <View style={{marginStart: 20, marginTop: 10}}>
                  <Text style={styles.selectTitle}>
                    {selectTypeData != null || campingData != undefined
                      ? selectTypeData?.category_name
                      : campingData?.campaign_sms_category?.category_name}
                  </Text>
                  <Text style={styles.selectDescription}>
                    {selectTypeData != null || campingData != undefined
                      ? selectTypeData?.category_type
                      : campingData?.campaign_sms_category?.category_type}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* date time view */}
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => setOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '92%', flexDirection: 'row'}}>
                  <AntDesign
                    name="clockcircleo"
                    size={20}
                    color={'#52c7b9'}
                    style={{marginHorizontal: 10}}
                  />
                  <Text style={styles.btnTxt}>Scheduled Date Time</Text>
                </View>

                {selectedDate !== '' ? (
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <AntDesign name="edit" size={20} color={colors.brand} />
                  </TouchableOpacity>
                ) : (
                  <AntDesign
                    name="right"
                    size={18}
                    color={colors.gray}
                    style={{marginEnd: 10}}
                  />
                )}
              </View>
              {selectedDate !== '' || campingData != undefined ? (
                <View style={{marginStart: 20, marginTop: 10}}>
                  <Text style={styles.selectTitle}>
                    {/* {date ? formatDate(date) : campingData.created_on}{' '}
                    {date ? formatTime(date) : ''} */}
                    {!selectedDate ? intialDate : selectedDate.toString()}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>

            {/* select SMS view */}

            {selectMessageData ? (
              // <MessageCard
              //   item={selectMessageData}
              //   text={''}
              //   inputStyle={{marginTop: height * 0.015}}
              //   onPress={() =>
              //     props.navigation.navigate('sms', {
              //       typeId:
              //         selectTypeData != null || campingData != undefined
              //           ? selectTypeData.id
              //           : campingData.campaign_sms_category.id,
              //       typename: selectTypeData
              //         ? selectTypeData?.category_name
              //         : null,
              //     })
              //   }
              //   showEditIcon={true}
              //   onEditPress={() => refRBSheet.current.open()}
              //   onEdit={() =>
              //     props.navigation.navigate('sms', {
              //       selectedItem: selectMessageData,
              //       typeId:
              //         selectTypeData != null || campingData != undefined
              //           ? selectTypeData.id
              //           : campingData.campaign_sms_category.id,
              //       typename: selectTypeData
              //         ? selectTypeData?.category_name
              //         : null,
              //     })
              //   }
              // />
              <MessageCard
                item={selectMessageData}
                text={selectMessageData.sms_content}
                inputStyle={{marginTop: height * 0.015}}
                onPress={() =>
                  props.navigation.navigate('sms', {
                    typeId:
                      selectTypeData != null || campingData != undefined
                        ? selectTypeData.id
                        : campingData.campaign_sms_category.id,
                    typename: selectTypeData
                      ? selectTypeData?.category_name
                      : null,
                  })
                }
                showEditIcon={true}
                onEditPress={() => refRBSheet.current.open()}
                onEdit={() =>
                  props.navigation.navigate('sms', {
                    selectedItem: selectMessageData,
                    typeId:
                      selectTypeData != null || campingData != undefined
                        ? selectTypeData.id
                        : campingData.campaign_sms_category.id,
                    typename: selectTypeData
                      ? selectTypeData?.category_name
                      : null,
                  })
                }
              />
            ) : (
              <TouchableOpacity
                style={styles.btnView}
                onPress={() =>
                  props.navigation.navigate('sms', {
                    typeId:
                      selectTypeData != null || campingData != undefined
                        ? selectTypeData?.id
                        : campingData?.campaign_sms_category?.id,
                    typename: selectTypeData
                      ? selectTypeData?.category_name
                      : null,
                  })
                }>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '92%', flexDirection: 'row'}}>
                    <AntDesign
                      name="message1"
                      size={20}
                      color={'#52c7b9'}
                      style={{marginHorizontal: 10}}
                    />
                    <Text style={styles.btnTxt}>Select SMS</Text>
                  </View>
                  <AntDesign
                    name="right"
                    size={18}
                    color={colors.gray}
                    style={{marginEnd: 10}}
                  />
                </View>
              </TouchableOpacity>
            )}

            <View style={styles.btnView}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: '92%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="mobile1"
                    size={20}
                    color={'#52c7b9'}
                    style={{marginHorizontal: 10}}
                  />
                  <TextInput
                    value={campingName}
                    onChangeText={(txt) => setCampingName(txt)}
                    style={[styles.btnTxt, {marginEnd: 15}]}
                    placeholderTextColor={theme.gray}
                    placeholder="Camping Name "
                  />
                </View>
              </View>
            </View>

            <View style={styles.selectedTypeView}>
              {selecteCardData.map((item) => {
                return (
                  <SelectCardType
                    item={item}
                    selectedId={selectedType}
                    onPress={() => {
                      setSelectedType(item.id);
                      if (item.id === 2) {
                        refSearch.current.open();
                      }
                    }}
                  />
                );
              })}
            </View>

            {renderJsonData1()}
            {selectedType === 2 &&
              selectedCheckData !== undefined &&
              selectedCheckData.length > 0 && (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.addMore}
                    onPress={() => refSearch.current.open()}>
                    <Text
                      style={{
                        fontFamily: 'UberMove-Regular',
                        fontSize: Platform.OS == 'android' ? 12 : '',
                      }}>
                      + Add more
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.addMore, {marginStart: 10}]}
                    onPress={clearAll}>
                    <Text style={{fontFamily: 'UberMove-Regular'}}>
                      Clear All
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            <CampingButton
              inputStyle={{marginTop: height * 0.05}}
              name={'Create'}
              onPress={createCampaigns}
            />
          </>
        )}
      </View>
      <DateTimeModal
        visible={open}
        onRequestClose={() => {
          setOpen(false);
          setSelectedDate('');
        }}
        onSave={onSave}
        open={open}
        onDateChange={setSelectedDate}
      />
      <RBSheet
        ref={refSearch}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: '83%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: colors.white,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.customerView}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.chooseCustomer}>Choose Customer</Text>
            <Textfeild
              placeholder={'search using name, number  '}
              showSeacrhIcon={true}
              inputStyle={{marginTop: 20, width: '90%'}}
              onChangeText={(text) => setTextInput(text)}
              value={textInput}
            />

            <View style={styles.searchby}>
              <FlatList
                data={searchdata}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setSearchTypeId(item.id)}
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            searchtypeId === item.id ? '#f0364e' : '#e0e3e8',
                          borderColor:
                            searchtypeId === item.id ? '#776bc7' : null,
                          borderWidth: searchtypeId === item.id ? 1 : null,
                        },
                      ]}>
                      <Text
                        style={{
                          color: searchtypeId === item.id ? '#fff' : 'black',
                          fontWeight: searchtypeId === item.id ? '600' : '300',
                          fontSize: Platform?.OS == 'android' ? 12 : '',
                          fontFamily: 'UberMove-Bold',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
          <View style={{flex: 1, marginBottom: 50}}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{flexGrow: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredUserData}
                renderItem={({item, index}) => (
                  <View style={styles.flatListView}>
                    <TouchableOpacity
                      style={[
                        styles.flatListTouchable,
                        {
                          backgroundColor: checkedItems[item.id]
                            ? '#f0364e'
                            : 'white',
                          borderColor: checkedItems[item.id]
                            ? '#f0364e'
                            : 'black',
                        },
                      ]}
                      onPress={() => handleCheckboxToggle(item)}>
                      {checkedItems[item.id] && (
                        <Feather name="check" size={18} color="white" />
                      )}
                    </TouchableOpacity>

                    <View style={{flexDirection: 'column', marginLeft: 25}}>
                      <Text style={{fontSize: 16, fontFamily: 'UberMove-Bold'}}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text style={styles.flatlistTextfont}>
                        {item.contactNumber}
                      </Text>
                      <Text style={styles.flatlistTextfont}>{item.email}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() =>
                  loading ? (
                    <ActivityIndicator size="large" color={colors.brand} />
                  ) : null
                }
              />
            </ScrollView>
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: '95%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: colors.white,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <EditSmsModal
          onPress={() => refRBSheet.current.close()}
          item={selectMessageData}
          onEditDone={handleEditSms}
        />
        {/* <EditSmsModal
          onPress={() => refRBSheet.current.close()}
          item={selectMessageData}
        /> */}
      </RBSheet>
      <CreatedDone
        visible={isDone}
        onClose={() => setIsDone(false)}
        onGoHome={() => {
          setIsVerificationCode(true);
          setIsDone(false);
        }}
      />
      <VerificationCodeSent
        visible={isVerificationCode}
        onClose={() => setIsVerificationCode(false)}
        // onOpen={() => {
        //   setIsVerificationCode(false);
        //   setIsDone(true);
        // }}
        campingData={createCapingData}
        onVerify={verifyCamping}
        onChangeText={setVerifyOtp}
      />
    </ScrollView>
  );
};

export default Campaign;

const styles = StyleSheet.create({
  sampleData: {
    backgroundColor: '#f3f4f8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#e3e4e7',
  },
  addMore: {
    backgroundColor: '#c3f1ed',
    borderRadius: 10,
    borderColor: '#52c7b9',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: 10,
    width: width * 0.28,
  },
  btnView: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 10,
  },
  selectSmsView: {
    // borderWidth: 1,
    // borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxt: {
    color: colors.black,
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'UberMove-Regular',
  },
  cancelBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.white,
  },
  saveBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelBottomRow: {
    flexDirection: 'row',
    height: 55,
    borderTopWidth: 1,
    borderColor: '#f0364e',
    marginTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.lighterBrand,
  },
  modalBtnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'UberMove-Bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  selectedTypeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    width: '100%',
  },
  customerView: {
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  searchByView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    width: '50%',
  },
  selectTitle: {
    color: colors.gray,
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'UberMove-Bold',
  },
  selectDescription: {
    color: colors.black,
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: 'UberMove-Regular',
  },
  searchby: {
    height: 50,
  },

  textfont: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'UberMove-Bold',
  },
  FlatList: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 18,
  },
  flatListTouchable: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    marginLeft: 10,
  },
  flatlistTextfont: {
    marginTop: 2,
    color: '#5140af',
    fontFamily: 'UberMove-Regular',
  },
  flatListView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  searchByListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 138,
  },
  chooseCustomer: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'UberMove-Bold',
  },
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  tabTxt: {
    fontSize: 18,
    letterSpacing: 1,
    color: colors.black,
    marginBottom: 8,
    fontFamily: 'UberMove-Bold',
  },
});
