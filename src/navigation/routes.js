import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homes from '../screens/Homes';
import Favorites from '../screens/Favorites';
import Search from '../screens/Search';
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator();

const RouteApp = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homes} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteApp;
