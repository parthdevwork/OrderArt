import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setIvrGreetings,
  getIvrGreetings,
  getAllIvrGreetings,
  showIvrModal,
  hideIvrModal,
} from '../../redux/actions';
import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import Toast from 'react-native-simple-toast';
import {downloadFile, DocumentDirectoryPath} from 'react-native-fs';

import styles from './styles';
import theme from '../../theme';
import colors from '../../theme/colors';

const IvrGreetings = (props) => {
  const [savedIvrs, setSavedIvrs] = useState([]);
  const [playedIvr, setPlayedIvr] = useState({
    index: null,
    state: 'stoped', // playing, loading, error
    type: '',
  });

  useEffect(() => {
    props
      .getIvrGreetings()
      .then()
      .catch((e) => e);
    props
      .getAllIvrGreetings()
      .then()
      .catch((e) => e);
    return () => {
      stopSampleSound();
    };
  }, []);

  const getFileMimeType = (ext) => {
    switch (ext) {
      case 'wav':
        return 'audio/x-wav';
      case 'aifc':
        return 'audio/x-aiff';
      case 'aiff':
        return 'audio/x-aiff';
      case 'm4a':
        return 'audio/mp4';
      case 'ogg':
        return 'application/ogg';
      case 'mp3':
      case 'mp2':
      default:
        return 'audio/mpeg';
    }
  };

  const isExtTypeValid = (ext) => {
    const validExtTypes = ['wav', 'aifc', 'aiff', 'm4a', 'ogg', 'mp3', 'mp2'];
    return validExtTypes.findIndex((e) => e == ext) != -1;
  };

  const downloadAndPlayIvr = async (url, index, type) => {
    stopSound();

    setPlayedIvr({
      state: 'loading',
      index,
      type,
    });

    try {
      const ext = url.split('.')[url.split('.').length - 1];

      if (!isExtTypeValid(ext)) {
        throw '';
      }

      const path = `${DocumentDirectoryPath}/${type}_${index}.${ext}`;

      if (savedIvrs.findIndex((e) => e == path) == -1) {
        const response = await downloadFile({
          fromUrl: url,
          toFile: path,
          headers: {
            Accept: '*/*',
            'Content-Type': getFileMimeType(ext),
          },
        });

        return response.promise.then(async (res) => {
          if (res && res.statusCode === 200 && res.bytesWritten > 0) {
            setPlayedIvr({
              state: 'playing',
              index,
              type,
            });

            setSavedIvrs([...savedIvrs, path]);
            playSampleSound({
              url: path,
            });
          } else {
            setPlayedIvr({
              state: 'error',
              index,
              type,
            });
            Toast.showWithGravity(
              'Unable to play IVR',
              Toast.SHORT,
              Toast.CENTER,
            );
          }
        });
      } else {
        setPlayedIvr({
          state: 'playing',
          index,
          type,
        });

        playSampleSound({
          url: path,
        });
      }
    } catch (error) {
      if (type == 'week') {
        setPlayedIvr({
          state: 'error',
          index,
          type,
        });
        Toast.showWithGravity('Unable to play IVR', Toast.SHORT, Toast.CENTER);
      }
    }
  };

  const stopSound = () => {
    setPlayedIvr({
      index: null,
      state: 'stoped',
      type: '',
    });
    stopSampleSound();
  };

  const changeIvrModal = (item, state) => {
    stopSound();

    if (state) {
      props.showIvrModal(item);
    } else {
      props.hideIvrModal();
    }
  };

  const setIvr = (item) => {
    props
      .setIvrGreetings({
        ivr_greeting_id: item.id,
        active_ivr_greeting_id: props.selectedIvr.id,
      })
      .then((success) => {
        Toast.showWithGravity(success.message, Toast.SHORT, Toast.CENTER);

        props.hideIvrModal();
        props.getIvrGreetings();
      })
      .catch((error) => {
        let msg = 'Error in Saving IVR';

        if (error && error.data && error.data.message) msg = error.data.message;

        Toast.showWithGravity(msg, Toast.SHORT, Toast.CENTER);
      });
  };

  const renderAvailableGreetingItem = ({item, index}) => (
    <View style={styles.availableGreetingContainer}>
      <View style={styles.greetingPlayerSection}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (index == playedIvr.index && playedIvr.type == 'all') {
              stopSound();
            } else {
              downloadAndPlayIvr(item.ivr_url, index, 'all');
            }
          }}>
          {getIcon(playedIvr, index, 'all')}
        </TouchableOpacity>
        <View style={styles.titleGreeting}>
          <Text style={styles.titleGreetingText}>{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={() => setIvr(item)}>
        <Image style={styles.btnIcon} source={require('../../img/check.png')} />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 13,
            color: '#fff',
            fontFamily: 'UberMove-Bold',
          }}>
          Apply
        </Text>
      </TouchableOpacity>
    </View>
  );

  const ringToneModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isModalVisible}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View
            style={{
              padding: 20,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'UberMove-Bold',
                  color: colors.black,
                }}>
                Change Greeting For
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 15,
                  color: theme.brand,
                  textTransform: 'capitalize',
                  fontFamily: 'UberMove-Bold',
                }}>
                {props.selectedIvr && props.selectedIvr.weekday
                  ? props.selectedIvr.weekday
                  : '--'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => changeIvrModal(null, false)}>
              <Image
                style={{width: 15, height: 15, marginTop: 5}}
                source={require('../../img/close.png')}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={props.allAvailableIvrGreetings}
            renderItem={renderAvailableGreetingItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </Modal>
  );

  const getIcon = (playedTrack, index, type) => {
    if (playedTrack.index != index || playedTrack.type != type) {
      return (
        <Image
          style={styles.icon}
          source={require('../../icons/play-round-button.png')}
        />
      );
    } else if (playedTrack.state == 'loading') {
      return (
        <Image
          style={styles.icon}
          source={require('../../icons/loading.png')}
        />
      );
    } else if (playedTrack.state == 'error') {
      return (
        <Image style={styles.icon} source={require('../../icons/error.png')} />
      );
    } else if (playedTrack.state == 'playing') {
      return (
        <Image
          style={styles.icon}
          source={require('../../icons/pause-round-button.png')}
        />
      );
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.cardWrapper}>
      <View style={styles.titleSection}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (index == playedIvr.index && playedIvr.type == 'week') {
              stopSound();
            } else {
              downloadAndPlayIvr(item.ivr_url, index, 'week');
            }
          }}>
          {getIcon(playedIvr, index, 'week')}
        </TouchableOpacity>
        <View style={styles.titleGreeting}>
          <Text style={styles.titleGreetingText}>
            {item.weekday} - {item.name}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => changeIvrModal(item, true)}>
          <Image
            style={styles.btnIcon}
            source={require('../../img/shuffle.png')}
          />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              color: colors.black,
              fontFamily: 'UberMove-Bold',
            }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}></View> */}
      <View style={styles.pageContainer}>
        {props.isRequesting ? (
          <ActivityIndicator
            animating={true}
            color={theme.brand}
            size="small"
            style={{margin: 100}}
          />
        ) : props.ivrGreetingList.length > 0 ? (
          <FlatList
            data={props.ivrGreetingList}
            contentContainerStyle={{paddingBottom: 30}}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.noGreetings}>
            IVR Greetings not setup yet. Contact Orderart for more info
          </Text>
        )}
      </View>
      {ringToneModal()}
    </View>
  );
};

function bindAction(dispatch) {
  return {
    getIvrGreetings: (params) => dispatch(getIvrGreetings(params)),
    setIvrGreetings: (params) => dispatch(setIvrGreetings(params)),
    getAllIvrGreetings: (params) => dispatch(getAllIvrGreetings(params)),
    showIvrModal: (params) => dispatch(showIvrModal(params)),
    hideIvrModal: (params) => dispatch(hideIvrModal(params)),
  };
}

const mapStateToProps = (state) => ({
  isRequesting: state.greetings.isRequesting,
  ivrGreetingList: state.greetings.ivrGreetings,
  isLoaded: state.greetings.isGreetingsLoaded,
  isModalVisible: state.greetings.isModalVisible,
  allAvailableIvrGreetings: state.greetings.allAvailableIvrGreetings,
  selectedIvr: state.greetings.selectedIvr,
});

const _IvrGreetings = connect(mapStateToProps, bindAction)(IvrGreetings);

export default _IvrGreetings;
