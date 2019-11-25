import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
/*
 Primary navigation
*/
import FoodScreen from './foodScreen/foodScreen';
import PercentScreen from './percentScreen/percentScreen';
import SearchScreen from './searchScreen/searchScreen';
/*
 Secondary navigation
*/

import Items from './itemScreen/itemScreen';

const tabBarOptions = {
  style: {
    backgroundColor: '#e60000',
    color: 'black',
  },
  labelStyle: {
    color: 'white',
  },
  tabStyle: {
    borderRadius: 25,
  },
  indicatorStyle: {
    marginLeft: 12,
    height: '100%',
    width: '20%',
    color: 'white',
    backgroundColor: '#333',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
};
const secondaryTabBarOptions = {
  style: {
    alignItems: 'stretch',
    backgroundColor: '#333',
  },
  indicatorStyle: {
    backgroundColor: '#333',
    borderRadius: 5,
  },
  tabStyle: {
    borderRadius: 10,
    justifyContent: 'center',
  },
  labelStyle: {
    color: 'white',
  },
};

const SecondaryNavigator = createMaterialTopTabNavigator(
  {
    All: {screen: props => <Items searchParams={'all'} />},
    Pizza: {screen: props => <Items searchParams={'pizza'} />},
    Steak: {screen: props => <Items searchParams={'steak'} />},
  },
  {
    tabBarOptions: secondaryTabBarOptions,
  },
);

const MainNavigator = createMaterialTopTabNavigator(
  {
    Home: SecondaryNavigator,
    Food: {screen: FoodScreen},
    Percent: {screen: PercentScreen},
    Search: {screen: SearchScreen},
  },
  {
    tabBarOptions,
  },
);

export default MainNavigator;
