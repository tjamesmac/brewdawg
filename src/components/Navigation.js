import React from 'react';
import {View, Text} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
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
    backgroundColor: 'red',
    // borderRadius: 20,
    color: 'black',
  },
  labelStyle: {
    color: 'black',
  },
  tabStyle: {
    borderRadius: 25,
  },
  indicatorStyle: {
    height: '100%',
    color: 'white',
    backgroundColor: 'gray',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
};
const secondaryTabBarOptions = {
  style: {
    alignItems: 'stretch',
    backgroundColor: 'darkgrey',
  },
  indicatorStyle: {
    // height: '100%',
    backgroundColor: 'darkgrey',
    borderRadius: 5,
  },
  tabStyle: {
    // backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
  },
};

const SecondaryNavigator = createMaterialTopTabNavigator(
  {
    All: Items,
    // Pizza: Items,
    // Steak: Items,
  },
  {
    tabBarOptions: secondaryTabBarOptions,
    // tabBarComponent: props => <Tabs {...props} />,
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

const Tabs = props => {
  console.log(props);
  const {routes} = props.navigation.state;
  const tab = routes.map(item => {
    return (
      <View>
        <Text>{item.routeName}</Text>
      </View>
    );
  });

  return <>{tab}</>;
};

export default MainNavigator;
