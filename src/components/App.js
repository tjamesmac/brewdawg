import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigation from './Navigation.js';

const NavigationContainer = createAppContainer(Navigation);

function Head() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>BrewDawg</Text>
    </View>
  );
}

function App() {
  return (
    <View style={styles.app}>
      <Head />
      <NavigationContainer style={styles.navContainer} screenProps={'hello'} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#e60000',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  navContainer: {
    backgroundColor: '#e60000',
  },
});
export default App;
