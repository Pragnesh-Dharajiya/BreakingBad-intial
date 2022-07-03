import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getMovies, addFavorite, removeFavorite} from '../redux/action';

const Homes = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '', //Set Header Title
      headerStyle: {
        backgroundColor: '#070707', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 10}}>
          <Text style={{color: 'white', fontSize: 27, fontWeight: '700'}}>
            The Breaking bad
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={{marginRight: 10}}>
            <MaterialIcons color={'#FFFF'} size={28} name={'search'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Favorites')}
            style={{marginRight: 10}}>
            <MaterialIcons color={'#18CA75'} size={28} name={'favorite'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const movies = useSelector(state => state.movies);
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

  const ItemView = ({item}) => {
    return (
      <View style={styles.flatView}>
        <Pressable
          onPress={() =>
            navigation.navigate('Detail', {
              itemId: item.char_id,
            })
          }>
          <Image
            style={{height: 210, width: 158, borderRadius: 10}}
            source={{uri: item.img}}
          />
        </Pressable>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
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
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
          paddingBottom: 20,
        }}
        numColumns={2}
        data={movies}
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Homes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    justifyContent: 'center',
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
