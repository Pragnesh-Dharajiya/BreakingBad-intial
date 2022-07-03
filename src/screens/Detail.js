import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ImageBackgroundBase,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getMovies, addFavorite, removeFavorite} from '../redux/action';

const Detail = ({route, navigation}) => {
  const {itemId} = route.params;
  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       title: '', //Set Header Title
  //       headerStyle: {
  //         backgroundColor: '#070707', //Set Header color
  //       },
  //       headerTintColor: '#fff', //Set Header text color
  //       headerTitleStyle: {
  //         fontWeight: 'bold', //Set Header text style
  //       },
  //       headerLeft: () => (
  //         <TouchableOpacity style={{marginLeft: 10}}>
  //           <Text style={{color: 'white', fontSize: 27, fontWeight: '700'}}>
  //             The Breaking bad
  //           </Text>
  //         </TouchableOpacity>
  //       ),
  //       headerRight: () => (
  //         <View style={{flexDirection: 'row'}}>
  //           <TouchableOpacity
  //             onPress={() => navigation.navigate('Search')}
  //             style={{marginRight: 10}}>
  //             <MaterialIcons color={'#FFFF'} size={28} name={'search'} />
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => navigation.navigate('Favorites')}
  //             style={{marginRight: 10}}>
  //             <MaterialIcons color={'#18CA75'} size={28} name={'favorite'} />
  //           </TouchableOpacity>
  //         </View>
  //       ),
  //     });
  //   }, [navigation]);
  const movies = useSelector(state => state.movies);
  const favorites = useSelector(state => state.favorites);

  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const exists = movie => {
    if (favorites.filter(item => item.char_id === movie.char_id).length > 0) {
      return true;
    }
    return false;
  };

  const thisProduct = movies.find(prod => prod.char_id === itemId);
  console.log(thisProduct);
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: '65%',
          width: '100%',
          borderRadius: 10,
          shadowOpacity: 10,
          opacity: 0.45,
        }}
        source={{uri: thisProduct.img}}></Image>
      <View
        style={{
          position: 'absolute',
          //   backgroundColor: 'red',
          width: '90%',
          height: '15%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons color={'#FFFF'} size={28} name={'arrow-back'} />
        </Pressable>
        <MaterialIcons
          color={exists(thisProduct) ? '#18CA75' : '#3D3D3D'}
          size={28}
          name={exists(thisProduct) ? 'favorite' : 'favorite-outline'}
        />
      </View>
      <View
        style={{position: 'absolute', marginTop: '30%', alignItems: 'center'}}>
        <Image
          style={{
            height: 288,
            width: 210,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
          }}
          source={{uri: thisProduct.img}}></Image>
        <Text
          style={{
            fontSize: 38,
            fontWeight: '600',
            color: 'white',
            marginTop: 30,
          }}>
          {thisProduct.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            marginTop: 5,
          }}>
          {thisProduct.nickname}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#CA184E',
            marginTop: 5,
            fontWeight: '700',
          }}>
          {thisProduct.status}
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#18CA75',
                marginLeft: 40,
                fontWeight: '700',
              }}>
              Potrayed
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginLeft: 40,
              }}>
              {thisProduct.portrayed}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',

                fontWeight: '300',
                width: '50%',
                textAlign: 'center',
              }}>
              {thisProduct.birthday}
            </Text>
            <Octicons size={16} name={'gift'} color={'white'} />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: '#18CA75',
              marginLeft: 32,
              fontWeight: '700',
            }}>
            Occupation
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginLeft: 32,
              width: '60%',
            }}>
            {thisProduct.occupation}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: '#18CA75',
              marginLeft: 32,
              fontWeight: '700',
            }}>
            Appeared in
          </Text>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row', marginLeft: 25}}>
              {thisProduct.appearance.map((item, key) => (
                <View
                  style={{
                    backgroundColor: '#1A1A1A',
                    margin: 10,
                    height: 30,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}>
                    {'Season ' + item}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              marginLeft: 32,
              width: '60%',
            }}>
            {thisProduct.occupation}
          </Text>
        </View>
      </View>

      {/* <FlatList
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
      /> */}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    // justifyContent: 'center',
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
