import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import RNShake from 'react-native-shake';

import SwipeGesture from '../swipe/swipeGesture';
import {
  increasePagination,
  decreasePagination,
  renderItems,
  sortOptions,
} from './itemScreen.helpers';
import CustomModal from '../modal/modal';

const ItemScreen: () => React$Node = props => {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(8);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [shake, setShake] = React.useState(null);
  const refExample = React.useRef('ABV_ASCENDING');
  const {searchParams} = props;

  React.useEffect(() => {
    async function fetchBeer() {
      const beerArray = [];
      let counter = 1; // needed to add pages to API call
      async function getInitialBeer(index) {
        try {
          let URL;
          if (searchParams === 'all') {
            URL = `https://api.punkapi.com/v2/beers?page=${counter}&per_page=71`;
          } else {
            URL = `https://api.punkapi.com/v2/beers?page=${counter}&per_page=71&food=${searchParams}`;
          }
          const getData = await fetch(URL);
          const response = await getData;
          if (response.status === 200) {
            const responseJSON = await response.json();
            if (responseJSON.length) {
              for (let item of responseJSON) {
                beerArray.push(item);
              }
              counter++;
              return getInitialBeer();
            } else {
              console.log('i am not returning anything');
              return false;
            }
          } else {
            console.error('data not returned');
          }
        } catch (error) {
          console.error(error);
        }
      }
      const beers = await getInitialBeer(counter); //collect all beer from API
      setData(beerArray);
    }
    fetchBeer();
  }, [searchParams]);

  const eventListener = React.useCallback(() => {
    console.log('shaking');
    switch (refExample.current) {
      case 'ABV_ASCENDING': {
        refExample.current = 'ABV_DESCENDING';
        break;
      }
      case 'ABV_DESCENDING': {
        refExample.current = 'NAME_ASCENDING';
        break;
      }
      case 'NAME_ASCENDING': {
        refExample.current = 'NAME_DESCENDING';
        break;
      }
      case 'NAME_DESCENDING': {
        refExample.current = 'ABV_ASCENDING';
        break;
      }
      default: {
        console.log('Undetected shake');
      }
    }
    setShake(refExample.current);
  }, []);
  React.useEffect(() => {
    RNShake.addEventListener('ShakeEvent', eventListener);
    return () => {
      RNShake.removeEventListener('ShakeEvent', eventListener);
    };
  }, [eventListener]);

  async function onSwipePerformed(action) {
    switch (action) {
      case 'up': {
        const newPage = decreasePagination(currentPage);
        setCurrentPage(newPage);
        break;
      }
      case 'down': {
        const lengthOfData = data.length;
        const newPage = increasePagination(currentPage, lengthOfData);
        setCurrentPage(newPage);
        break;
      }
      default: {
        console.log('Undetected action');
      }
    }
  }
  function handleClick(id) {
    const targetItem = data.filter(item => item.id === id);
    setModalData(targetItem[0]);
    setIsModalVisible(true);
  }
  function handleModalClose() {
    setIsModalVisible(!isModalVisible);
  }
  let getItems;
  if (data.length) {
    if (shake) {
      const renderRequirements = {
        currentPage, //
        data: sortOptions(data, shake),
        styles,
        handleClick,
        screenType: props.searchParams, // used to prevent duplicate keys
      };
      getItems = renderItems(renderRequirements);
    } else {
      const renderRequirements = {
        currentPage,
        data,
        styles,
        handleClick,
        screenType: props.searchParams, // used to prevent duplicate keys
      };
      getItems = renderItems(renderRequirements);
    }
  } else {
    getItems = (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
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
  console.log(shake);
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ItemScreen;
