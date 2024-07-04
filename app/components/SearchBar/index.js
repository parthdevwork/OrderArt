import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';

const searchIcon = require('../../icons/search.png');

function SearchBar({
  placeholder = 'Search',
  onSearch,
  value,
  isSearching = false,
}) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const onSubmit = () => {
    onSearch(searchValue);
  };

  return (
    <>
      <View style={[styles.searchBlock]}>
        <View
          style={[
            {
              width: 17,
              height: 17,
            },
          ]}>
          <Image style={[styles.searchIcon]} source={searchIcon} />
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchBar}
          placeholder={placeholder}
          placeholderTextColor={theme.gray}
          onChangeText={(text) => setSearchValue(text)}
          onBlur={onSubmit}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          value={searchValue}
        />
        {isSearching && (
          <ActivityIndicator
            animating={true}
            color="#000"
            style={{marginRight: 5, marginLeft: 5}}
          />
        )}

        {/* <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Simple Button pressed')}>
					<Text style={styles.searchButtonText}>Search</Text>
				</TouchableOpacity> */}
      </View>
    </>
  );
}

export default SearchBar;
