import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import SwipeGesture from '../swipe/swipeGesture';
import {
  increasePagination,
  decreasePagination,
  renderItems,
} from './itemScreen.helpers';
import CustomModal from '../modal/modal';

// TODO: Add up down/swipe gesture
// Add modal
// colour navigation
// tidy up
// add varying tabs

const BrewScreen: () => React$Node = props => {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(8);
  const [APIpage, setAPIpage] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  function onSwipePerformed(action) {
    switch (action) {
      case 'up': {
        console.log('up');
        const newPage = decreasePagination(currentPage);
        setCurrentPage(newPage);
        break;
      }
      case 'down': {
        const lengthOfData = data.length;
        if (currentPage + 18 > lengthOfData) {
          // possibly stop this from firing at some point
          getBeers(APIpage + 1);
          setAPIpage(APIpage + 1);
        }
        const newPage = increasePagination(currentPage, lengthOfData);
        setCurrentPage(newPage);
        break;
      }
      default: {
        console.log('Undetected action');
      }
    }
  }
  async function getBeers(index) {
    try {
      const URL = `https://api.punkapi.com/v2/beers?page=${index}&per_page=71`;
      const getData = await fetch(URL);
      const response = await getData;
      if (response.status === 200) {
        const responseJSON = await response.json();
        if (responseJSON.length) {
          setData(currentData => [...currentData, ...responseJSON]);
        } else {
          console.log('i am not returning anything');
        }
      } else {
        console.error('data not returned');
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getBeers(1);
  }, []);
  function handleClick(id) {
    const targetItem = data[id - 1];
    setModalData(targetItem);
    setIsModalVisible(true);
    console.log('click');
  }
  function handleModalClose() {
    setIsModalVisible(!isModalVisible);
  }
  let getItems;
  if (data.length) {
    const renderRequirements = {
      currentPage,
      data,
      styles,
      handleClick,
    };
    getItems = renderItems(renderRequirements);
  }
  let renderModal;
  if (modalData) {
    renderModal = (
      <CustomModal
        itemInformation={modalData}
        visible={isModalVisible}
        handleClose={handleModalClose}
      />
    );
  }
  return (
    <>
      <SafeAreaView>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          {renderModal}
          <SwipeGesture
            gestureStyle={styles.swipesGestureContainer}
            onSwipePerformed={onSwipePerformed}>
            <View style={styles.beerContainer}>{getItems}</View>
          </SwipeGesture>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  swipesGestureContainer: {
    height: '100%',
    alignItems: 'stretch',
  },
  beerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  beerImage: {
    width: 100,
    height: 125,
    resizeMode: 'contain',
  },
  beer: {
    alignItems: 'center',
    width: '30%',
    marginTop: 20,
  },
});

export default BrewScreen;
