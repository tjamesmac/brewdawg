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
import Home from './brewScreen/brewScreen';

const tabBarOptions = {
  style: {
    paddingTop: 50,
  },
  title: 'Brew dawg',
  headerStyle: {
    backgroundColor: 'red',
  },
};
const secondaryTabBarOptions = {
  style: {
    // paddingTop: 50,
  },
};
const SecondaryNavigator = createMaterialTopTabNavigator(
  {
    All: Home,
    Pizza: Home,
    Steak: Home,
  },
  secondaryTabBarOptions,
);
const MainNavigator = createMaterialTopTabNavigator(
  {
    Home: SecondaryNavigator,
    Food: {screen: FoodScreen},
    Percent: {screen: PercentScreen},
    Search: {screen: SearchScreen},
  },
  tabBarOptions,
);

export default MainNavigator;
