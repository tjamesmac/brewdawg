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
import Home from './brewScreen/brewScreen';

const tabBarOptions = {
  style: {
    // backgroundColor: 'red',
    borderRadius: 20,
  },
  labelStyle: {},
  tabStyle: {
    // backgroundColor: 'blue',
    // width: 100,
    // marginRight: 10,
    // paddingRight: 10,
    borderRadius: 25,
  },
  indicatorStyle: {
    height: '100%',
    // width: 150,
    // backgroundColor: 'gray',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // borderBottomWidth: 5,
    // borderBottomColor: 'white',
  },
};
const secondaryTabBarOptions = {
  style: {
    alignItems: 'stretch',
  },
  indicatorStyle: {
    // height: '100%',
    // backgroundColor: 'orange',
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
    All: Home,
    Pizza: Home,
    Steak: Home,
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
