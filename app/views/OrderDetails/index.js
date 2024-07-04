import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import theme from '../../theme';
import {connect} from 'react-redux';

import {
  getSingleOrder,
  showPrintModal,
  hidePrintModal,
  markOrderViewed,
  managePageCounter,
  printOrder,
  showOrderAcceptModal,
  hideOrderAcceptModal,
  showOrderRejectModal,
  hideOrderRejectModal,
  acceptOrder,
  rejectOrder,
  changeRejectionText,
  setIsToPrintDocket,
  changeProcessingTime,
  setIsScheduledDelivery,
  managePageCounterForAccept,
  changeOrderStatus,
} from '../../redux/actions';

import Loader from '../../components/Loader';
import colors from '../../theme/colors';

const OrderDetails = (props) => {
  const orderId = props.route.params.id;
  const {order} = props;

  useEffect(() => {
    props.getSingleOrder(orderId);
    props.markOrderViewed(orderId);

    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.showPrintModal();
          }}>
          <Image
            source={require('../../img/printer.png')}
            style={{height: 25, width: 25, marginRight: 20}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  /**
   *
   */
  const printOrder = () => {
    props.hidePrintModal();

    const params = {
      print_copies: props.print_copies,
    };

    props.printOrder(orderId, params).then(
      (res) => {
        setTimeout(() => {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
        }, 500);
      },
      (err) => {
        Toast.showWithGravity(
          err.message || 'Something went wrong',
          Toast.SHORT,
          Toast.CENTER,
        );
      },
    );
  };

  const rejectOrder = () => {
    if (!props.rejectionText) {
      Toast.showWithGravity(
        'Please add remark to proceed.',
        Toast.SHORT,
        Toast.CENTER,
      );
      return;
    }

    const params = {
      status: 'rejected',
      reason: props.rejectionText,
    };

    props.rejectOrder(orderId, params).then(
      (res) => {
        setTimeout(() => {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
        }, 500);
      },
      (err) => {
        Toast.showWithGravity(
          err.message || 'Something went wrong',
          Toast.SHORT,
          Toast.CENTER,
        );
      },
    );
  };

  const changeStatus = (status) => {
    const params = {
      status,
    };

    props.changeOrderStatus(orderId, params).then(
      (res) => {
        setTimeout(() => {
          Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
        }, 500);
      },
      (err) => {
        Toast.showWithGravity(
          err.message || 'Something went wrong',
          Toast.SHORT,
          Toast.CENTER,
        );
      },
    );
  };

  /**
   *
   */
  const acceptOrder = () => {
    if (!/^\d+$/.test(props.processingTime) && !props.isScheduledDelivery) {
      Toast.showWithGravity(
        'Either Enter Time or Select Scheduled.',
        Toast.SHORT,
        Toast.CENTER,
      );
      return;
    }

    let params = {
      status: 'cooking',
      delivery_time: props.processingTime,
      scheduled:
        props.isScheduledDelivery || Number(props.processingTime) > 180 ? 1 : 0,
    };

    if (props.isToPrintDocket) {
      params.print = props.isToPrintDocket ? 1 : 0;
      params.print_copies = props.print_copies;
    }

    props.acceptOrder(orderId, params).then((res) => {
      setTimeout(() => {
        Toast.showWithGravity(res.message, Toast.SHORT, Toast.CENTER);
      }, 500);
    });
  };

  /**
   *
   */
  const renderIngredients = (type, index) =>
    order.details[index][type].map((value, idx) => {
      const {ingredient, qty} = value;
      if (type === 'default_ingredients') {
        return (
          qty != 1 && (
            <Text
              style={[
                {...styles.fontBasicStyle},
                {color: qty > 1 ? '#3cae2d' : '#8d4340'},
              ]}
              key={ingredient.id}>
              {`${ingredient.name} (${qty == 0 ? '0' : `+${qty}`})`}
              {idx != order.details[index][type].length - 1 ? ',' : ''}
            </Text>
          )
        );
      } else if (type === 'addon_ingredients') {
        return (
          qty > 0 && (
            <Text
              style={[{...styles.fontBasicStyle}, {color: '#3cae2d'}]}
              key={ingredient.id}>
              {`${ingredient.name} (${qty == 0 ? '0' : `+${qty}`})`}
              {idx != order.details[index][type].length - 1 ? ',' : ''}
            </Text>
          )
        );
      }
    });

  const openExternalUrl = (type, value) => {
    switch (type) {
      case 'address':
        Linking.openURL(
          'https://www.google.com/maps/search/?api=1&query=' + value,
        ).catch((error) => {
          console.log('Error when handling phone', error);
        });
        break;
      case 'tel':
        Linking.openURL('tel:' + value).catch((error) => {
          console.log('Error when handling phone', error);
        });
        break;
    }
  };

  /**
   *
   */
  const ValueMapper = ({
    label,
    value,
    color = theme.gray,
    hasDivider = false,
  }) => (
    <View
      style={[
        {...styles.equalGrid},
        hasDivider
          ? {
              borderBottomColor: theme.gray,
              borderBottomWidth: 0.5,
              paddingVertical: 2,
            }
          : null,
      ]}>
      <View style={styles.orderValues}>
        <Text style={styles.fontBasicStyle}>{label}</Text>
        <Text style={[styles.fontBasicStyle, {alignSelf: 'center'}]}>:</Text>
      </View>
      <View style={{marginLeft: 10, flex: 2}}>
        {typeof value == 'string' ? (
          <Text style={[{...styles.fontBasicStyle}, {color}]}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );

  /**
   *
   */
  const printOptionModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isPrintModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View style={styles.printModalHeader}>
            <TouchableOpacity
              onPress={() => props.hidePrintModal()}
              style={{position: 'absolute', marginLeft: 20}}>
              <Image
                source={require('../../img/close.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                color: '#fff',
                alignSelf: 'center',
                fontFamily: 'UberMove-Bold',
              }}>
              Select Print Count
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 30,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.counterBtn}
              onPress={() => props.managePageCounter(false)}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{props.print_copies}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.counterBtn}
              onPress={() => props.managePageCounter(true)}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.printModalFooter}>
            <TouchableOpacity onPress={() => props.hidePrintModal()}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'UberMove-Regular',
                  color: colors.black,
                }}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => printOrder()}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'UberMove-Regular',
                  color: colors.black,
                }}>
                Print
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const orderRejectModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isRejectModalVisible}>
      <View style={styles.modalCenteredView}>
        <View style={[styles.modalView, {padding: 15}]}>
          <View style={styles.rejectPopupHeader}>
            <Text
              style={{
                color: theme.brand,
                fontSize: 18,
                fontFamily: 'UberMove-Bold',
              }}>
              Reason of Rejection
            </Text>
            <TouchableOpacity
              style={styles.rejectCloseIcon}
              onPress={() => {
                props.hideOrderRejectModal();
              }}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../../img/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 30, paddingTop: 10}}>
            <TextInput
              style={[
                styles.acceptOrderInput,
                {height: 70, fontFamily: 'UberMove-Regular'},
              ]}
              placeholder={'Remark'}
              placeholderTextColor={theme.gray}
              value={props.rejectionText}
              onChangeText={(text) => props.changeRejectionText(text)}
            />
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={() => rejectOrder()}>
              <Text
                style={{
                  fontSize: 17,
                  color: theme.darkBrand,
                  fontFamily: 'UberMove-Bold',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  /**
   *
   */
  const orderAcceptModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isAcceptModalVisible}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View style={styles.orderAcceptModal}>
            <View>
              <TextInput
                style={[
                  styles.acceptOrderInput,
                  {fontFamily: 'Roboto-Regular'},
                ]}
                placeholder={'Enter time in minutes'}
                placeholderTextColor={theme.gray}
                onChangeText={(text) => props.changeProcessingTime(text)}
                value={props.processingTime}
              />
            </View>
            <View style={{marginVertical: 25, alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontFamily: 'UberMove-Regular'}}>
                OR
              </Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <CheckBox
                value={props.isScheduledDelivery}
                style={styles.checkbox}
                onValueChange={(value) => props.setIsScheduledDelivery(value)}
                boxType={'square'}
                tintColor={theme.gray}
                onTintColor={theme.brand}
                onFillColor={theme.brand}
                onCheckColor={theme.white}
              />
              <Text
                style={{
                  fontSize: 17,
                  marginLeft: 20,
                  fontFamily: 'UberMove-Regular',
                }}>
                Scheduled Delivery
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.printModalFooter}>
            <TouchableOpacity onPress={() => props.hideOrderAcceptModal()}>
              <Text
                style={{
                  fontSize: 17,
                  color: theme.darkBrand,
                  fontFamily: 'UberMove-Bold',
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => acceptOrder()}>
              <Text
                style={{
                  fontSize: 17,
                  color: theme.darkBrand,
                  fontFamily: 'UberMove-Bold',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderOrderStatusConverter = () => {
    if (order.order_status && order.order_status.toLowerCase() == 'completed')
      return null;

    let allOrderStatus = [
      {
        key: 'Ready',
        value: 'Ready for Delivery',
        apiKey: 'ready',
      },
      {
        key: 'Out',
        value: 'Out for Delivery',
        apiKey: 'delivery',
      },
      {
        key: 'Completed',
        value: 'Completed',
        apiKey: 'completed',
      },
    ];

    const idx = allOrderStatus.findIndex(
      (status) => status.value == order.order_status,
    );
    if (idx > -1) allOrderStatus = allOrderStatus.slice(idx + 1);

    return (
      <View style={styles.orderStatusBlock}>
        {allOrderStatus.map((status) => (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            key={status.key}
            onPress={() => changeStatus(status.apiKey)}>
            <Image
              style={styles.checkImg}
              source={require('../../img/dish_unchecked.png')}
            />
            <Text style={{alignSelf: 'center', marginLeft: 5, marginRight: 20}}>
              {status.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderOrderAcceptRejectSection = () => (
    <View style={styles.printSection}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            value={props.isToPrintDocket}
            style={styles.checkbox}
            boxType={'square'}
            onValueChange={(value) => props.setIsToPrintDocket(value)}
            tintColor={theme.gray}
            onTintColor={theme.brand}
            onFillColor={theme.brand}
            onCheckColor={theme.white}
          />
          <Text style={{alignSelf: 'center', marginLeft: 10}}>
            Print Docket
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'UberMove-Bold',
            color: theme.darkestGray,
          }}>
          Print Count
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginVertical: 5,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.counterBtn}
          onPress={() => props.managePageCounterForAccept(false)}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{props.print_copies_accept}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.counterBtn}
          onPress={() => props.managePageCounterForAccept(true)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.5}
          onPress={() => {
            props.showOrderAcceptModal();
          }}>
          <Text style={{color: theme.white}}>ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[{...styles.actionButton}, {backgroundColor: '#464646'}]}
          onPress={() => {
            props.showOrderRejectModal();
          }}>
          <Text style={{color: theme.white}}>REJECT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPaymentDetailsSection = () => (
    <View style={styles.paymentDetails}>
      <Text style={[{...styles.fontBasicStyle}, {color: theme.black}]}>
        {order.customer && order.customer.name}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.fontBasicStyle}>Payment Mode :</Text>
        <Text style={styles.fontBasicStyle}>{order.payment_mode}</Text>
      </View>
      {order.customer && order.customer.address && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{flexDirection: 'row', marginVertical: 10, marginRight: 20}}
          onPress={() =>
            openExternalUrl('address', order.customer.address.full_address)
          }>
          <Image
            style={{width: 20, height: 25, marginTop: 5}}
            resizeMode={'stretch'}
            source={require('../../img/location.png')}
          />
          <Text style={[{...styles.fontBasicStyle}, {marginLeft: 10}]}>
            {order.customer &&
              order.customer.address &&
              order.customer.address.full_address}
          </Text>
        </TouchableOpacity>
      )}
      {renderPhoneWithLifeTimeOrder()}
      {order.order_status != 'Rejected'
        ? order.order_status != 'Completed' &&
          order.order_status == 'Order Placed'
          ? renderOrderAcceptRejectSection()
          : renderOrderStatusConverter()
        : null}
    </View>
  );

  const renderDetails = (idx) => (
    <View style={{}} key={idx.toString()}>
      <View style={styles.type}>
        <View style={styles.productTypeLabel}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              flex: 1,
              fontFamily: 'UberMove-Regular',
            }}>
            {order.details && order.details[idx].name}
          </Text>
          <View style={styles.typeQty}>
            <Text
              style={{
                color: theme.white,
                fontFamily: 'Roboto-Bold',
                marginLeft: 5,
              }}>
              Qty
            </Text>
            <View style={styles.qty}>
              <Text style={{color: theme.brand}}>
                {order.details && order.details[idx].quantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 15}}>
        {order.details && order.details[idx].size ? (
          <ValueMapper
            label={'Size'}
            value={order.details[idx].size}
            hasDivider={true}
          />
        ) : null}
        {order.detail && order.details[idx].chilli ? (
          <ValueMapper
            label={'Chilli'}
            value={order.details[idx].chilli}
            hasDivider={true}
          />
        ) : null}
        {order.details &&
        order.details[idx].default_ingredients &&
        order.details[idx].default_ingredients.length > 0 ? (
          <ValueMapper
            label={'Default Ingredients'}
            value={renderIngredients('default_ingredients', idx)}
            hasDivider={true}
          />
        ) : null}
        {order.details &&
        order.details[idx].addon_ingredients &&
        order.details[idx].addon_ingredients.length > 0 ? (
          <ValueMapper
            label={'Add on Ingredients'}
            value={renderIngredients('addon_ingredients', idx)}
            hasDivider={true}
          />
        ) : null}
        {order.details &&
        order.details[idx].base_1.length &&
        order.details[idx].base_1[0].ingredient ? (
          <ValueMapper
            label={'Base 1'}
            value={order.details[idx].base_1[0].ingredient.name}
            hasDivider={true}
          />
        ) : null}
        {order.details &&
        order.details[idx].base_2.length &&
        order.details[idx].base_2[0].ingredient ? (
          <ValueMapper
            label={'Base 2'}
            value={order.details[idx].base_2[0].ingredient.name}
            hasDivider={true}
          />
        ) : null}
        {order.details &&
        order.details[idx].base_3.length &&
        order.details[idx].base_3[0].ingredient ? (
          <ValueMapper
            label={'Base 3'}
            value={order.details[idx].base_3[0].ingredient.name}
            hasDivider={true}
          />
        ) : null}
        {order.details && order.details[idx].options.length > 0 && (
          <ValueMapper
            label={'Dish Options'}
            value={order.details[idx].options.join(', ')}
            hasDivider={true}
          />
        )}
      </View>
    </View>
  );

  const renderOrderValues = () => (
    <ScrollView style={{backgroundColor: theme.white}}>
      {order.details && order.details.map((d, idx) => renderDetails(idx))}
    </ScrollView>
  );

  const renderPhoneWithLifeTimeOrder = () => (
    <View style={styles.personHistory}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.personPhoneContainer}
        onPress={() => openExternalUrl('tel', order.customer.contact)}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../img/order_call.png')}
        />
        <Text style={{padding: 5}}>
          {order.customer && order.customer.contact}
        </Text>
      </TouchableOpacity>
      <View>
        <Text>Lifetime Order</Text>
        <Text>Amount Value</Text>
      </View>
      <View>
        <Text>$ {order.customer && order.customer.lifetime_order_amount}</Text>
      </View>
    </View>
  );

  return props.isRequesting && !order.id ? (
    <Loader loading={props.isRequesting} />
  ) : (
    <>
      <View style={styles.container}>
        {/* <View style={styles.headerView}></View> */}
        <View style={styles.pageContainer}>
          <View
            style={{
              height: 100,
              paddingVertical: 15,
              paddingHorizontal: 15,
              backgroundColor: theme.white,
            }}>
            <ValueMapper
              label={'Order Date'}
              value={order.order_placed_at}
              color={theme.deliverText}
            />
            <ValueMapper
              label={'Delivery Time'}
              value={order.order_expected_at}
              color={theme.deliverText}
            />
          </View>
          {renderOrderValues()}
        </View>
      </View>
      {renderPaymentDetailsSection()}
      {printOptionModal()}
      {orderAcceptModal()}
      {orderRejectModal()}
    </>
  );
};

function bindAction(dispatch) {
  return {
    managePageCounter: (params) => dispatch(managePageCounter(params)),
    markOrderViewed: (params) => dispatch(markOrderViewed(params)),
    getSingleOrder: (params) => dispatch(getSingleOrder(params)),
    printOrder: (id, data) => dispatch(printOrder(id, data)),
    showPrintModal: () => dispatch(showPrintModal()),
    hidePrintModal: () => dispatch(hidePrintModal()),
    showOrderAcceptModal: () => dispatch(showOrderAcceptModal()),
    hideOrderAcceptModal: () => dispatch(hideOrderAcceptModal()),
    showOrderRejectModal: () => dispatch(showOrderRejectModal()),
    hideOrderRejectModal: () => dispatch(hideOrderRejectModal()),
    rejectOrder: (id, data) => dispatch(rejectOrder(id, data)),
    acceptOrder: (id, data) => dispatch(acceptOrder(id, data)),
    changeRejectionText: (value) => dispatch(changeRejectionText(value)),
    changeProcessingTime: (value) => dispatch(changeProcessingTime(value)),
    setIsToPrintDocket: (value) => dispatch(setIsToPrintDocket(value)),
    setIsScheduledDelivery: (value) => dispatch(setIsScheduledDelivery(value)),
    managePageCounterForAccept: (params) =>
      dispatch(managePageCounterForAccept(params)),
    changeOrderStatus: (id, data) => dispatch(changeOrderStatus(id, data)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.orders.isRequesting,
  order: state.orders.singleOrderDetail,
  isPrintModalVisible: state.orders.isPrintModalVisible,
  isAcceptModalVisible: state.orders.isAcceptModalVisible,
  isRejectModalVisible: state.orders.isRejectModalVisible,
  isScheduledDelivery: state.orders.isScheduledDelivery,
  isToPrintDocket: state.orders.isToPrintDocket,
  rejectionText: state.orders.rejectionText,
  processingTime: state.orders.processingTime,
  print_copies: state.orders.print_copies,
  print_copies_accept: state.orders.print_copies_accept,
});

const _OrderDetailsScreen = connect(mapStateToProps, bindAction)(OrderDetails);

export default _OrderDetailsScreen;
