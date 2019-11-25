import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

const FoodScreen: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>EXTRA HEAR ALL ABOUT IT</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodScreen;
