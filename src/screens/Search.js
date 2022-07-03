// // Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getMovies, addFavorite, removeFavorite} from '../redux/action';

const Search = ({navigation}) => {
  const favorites = useSelector(state => state.favorites);

  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };

  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites.filter(item => item.char_id === movie.char_id).length > 0) {
      return true;
    }
    return false;
  };
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/characters')
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.flatView}>
        <View>
          <Image
            style={{height: 210, width: 158, borderRadius: 10}}
            source={{uri: item.img}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={{width: '80%'}}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() =>
                  exists(item)
                    ? handleRemoveFavorite(item)
                    : handleAddFavorite(item)
                }
                activeOpacity={0.7}
                style={{
                  marginTop: 15,
                }}>
                <MaterialIcons
                  color={exists(item) ? '#18CA75' : '#3D3D3D'}
                  size={28}
                  name={exists(item) ? 'favorite' : 'favorite-outline'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subname} numberOfLines={1} ellipsizeMode="tail">
            {item.nickname}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#242424',
          flex: 0.1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'flex-end',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={() => navigation.goBack()}>
          <MaterialIcons color={'#FFFF'} size={28} name={'arrow-back'} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search"
          placeholderTextColor={'#FFFF'}
        />
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={() => setSearch('')}>
          <MaterialIcons color={'#FFFF'} size={28} name={'close'} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.8}}>
        {filteredDataSource.length === 0 ? (
          <View style={{marginLeft: 20, marginTop: 30}}>
            <Text style={{fontSize: 24, color: 'green'}}>
              No Character Found
            </Text>
            <Text style={{fontSize: 24, color: 'white'}}>Try Again</Text>
          </View>
        ) : (
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 20,
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 20,
    margin: 5,
    color: '#FFFFFF',
    borderWidth: 0,
    fontSize: 30,
    fontWeight: '100',
    width: '80%',
  },
  email: {
    color: 'red',
  },
  flatView: {
    width: '45%',
    marginTop: 35,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 14,
    width: '95%',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subname: {
    fontFamily: 'Verdana',
    fontSize: 12,
    width: '70%',
    color: '#FFFFFF',
  },
});

export default Search;
