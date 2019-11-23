import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigation from './Navigation.js';

const NavigationContainer = createAppContainer(Navigation);

function Head() {
  return (
    <View style={styles.header}>
      <Text>BrewDawg</Text>
    </View>
  );
}

function App() {
  return (
    <View style={styles.app}>
      <Head />
      <NavigationContainer style={styles.navContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: 'red',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  navContainer: {
    backgroundColor: 'red',
  },
});
export default App;
