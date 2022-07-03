import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {removeFavorite} from '../redux/action';

const Favorites = ({navigation}) => {
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
          <Text style={{color: '#18CA75', fontSize: 27, fontWeight: '700'}}>
            Favorites
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{marginRight: 10}}>
            <MaterialIcons color={'#FFFF'} size={28} name={'close'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#070707',
      }}>
      <View style={{flex: 1}}>
        {favorites.length === 0 ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={{color: 'red', fontSize: 18}}>
              Add a movie to the list.
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 20,
            }}
            renderItem={({item}) => {
              return (
                <View style={{width: '45%', marginTop: 35}}>
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
                      <Text
                        style={{
                          fontFamily: 'Verdana',
                          fontSize: 14,
                          width: '95%',
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleRemoveFavorite(item)}
                        activeOpacity={0.7}
                        style={{
                          marginTop: 15,
                        }}>
                        <MaterialIcons
                          color="#18CA75"
                          size={32}
                          name="favorite"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Verdana',
                      fontSize: 12,
                      width: '70%',
                      color: '#FFFFFF',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.nickname}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Favorites;
