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
  modalContainer: {
    backgroundColor: 'rgba(100,100,100, 0.5)',
    padding: 35,
    height: '100%',
  },
  modalBody: {
    position: 'relative',
    alignSelf: 'baseline',
    backgroundColor: '#333',
    alignItems: 'center',
    borderRadius: 20,
    flexGrow: 1,
    marginTop: 50,
  },
  scrollViewBody: {
    alignSelf: 'baseline',
    marginTop: 50,
  },
  modalClose: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: '#e60000',
    borderRadius: 20,
    padding: 10,
  },
  modalCloseText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemBody: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 30,
    alignSelf: 'baseline',
  },
  itemInfo: {
    flex: 1,
    width: 50,
  },
  itemImageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    height: 100,
    padding: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 20,
  },
  itemImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  itemHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  itemSubHeading: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemTextsmaller: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: 'white',
  },
  itemDescription: {
    paddingTop: 12,
    fontSize: 14,
    color: 'white',
  },
  itemText: {
    color: 'white',
  },
  swipesGestureContainer: {
    // flex: 1,
    // width: '100%',
    height: '100%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  beerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    // marginTop: 450,
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
