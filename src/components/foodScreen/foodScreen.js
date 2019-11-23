import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SwipeGesture from '../swipe/swipeGesture';

const ExtraScreen: () => React$Node = () => {
  const [swipeText, setSwipeText] = React.useState('This is my swipe text');
  const [gesture, setGestureName] = React.useState('none');

  function onSwipePerformed(action) {
    /// action : 'left' for left swipe
    /// action : 'right' for right swipe
    /// action : 'up' for up swipe
    /// action : 'down' for down swipe

    switch (action) {
      case 'left': {
        console.log('left Swipe performed');
        setSwipeText('left');
        break;
      }
      case 'right': {
        console.log('right Swipe performed');
        setSwipeText('right');
        break;
      }
      case 'up': {
        console.log('up Swipe performed');
        setSwipeText('up');
        break;
      }
      case 'down': {
        console.log('down Swipe performed');
        setSwipeText('down');
        break;
      }
      default: {
        console.log('Undeteceted action');
      }
    }
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <>
      <SafeAreaView>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>EXTRA HEAR ALL ABOUT IT</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  swipesGestureContainer: {
    height: '100%',
    width: '100%',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default ExtraScreen;