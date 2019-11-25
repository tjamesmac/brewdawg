import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

const PercentScreen: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Percent Screen!</Text>
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

export default PercentScreen;
