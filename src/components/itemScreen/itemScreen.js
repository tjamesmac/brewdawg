import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import RNShake from 'react-native-shake';
import SwipeGesture from '../swipe/swipeGesture';
import {
  increasePagination,
  decreasePagination,
  renderItems,
  getBeers,
} from './itemScreen.helpers';
import CustomModal from '../modal/modal';

// TODO: Add up down/swipe gesture
// colour navigation
// tidy up
// add varying tabs

const BrewScreen: () => React$Node = props => {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(8);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [sortedData, setSortedData] = React.useState({
    type: 'ABV_ASCENDING',
    data: [],
  });
  const {searchParams} = props;

  React.useEffect(() => {
    async function fetchBeer() {
      const beerArray = [];
      let counter = 1;
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
              // console.log(responseJSON);
              // beerArray.push(responseJSON);
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
      setData(currentData => [...currentData, ...beerArray]);
    }
    fetchBeer();
  }, [props, searchParams]);

  const eventListener = React.useCallback(() => {
    console.log('shaking');
    switch (sortedData.type) {
      case 'ABV_ASCENDING': {
        const sortedArray = [].concat(data).sort((a, b) => {
          return a.abv - b.abv;
        });
        const sort = {type: 'ABV_DESCENDING', data: sortedArray};
        setSortedData(sort);
        break;
      }
      case 'ABV_DESCENDING': {
        const sortedArray = [].concat(data).sort((a, b) => {
          return b.abv - a.abv;
        });
        const sort = {type: 'NAME_ASCENDING', data: sortedArray};
        setSortedData(sort);
        break;
      }
      case 'NAME_ASCENDING': {
        const sortedArray = [].concat(data).sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        const sort = {type: 'NAME_DESCENDING', data: sortedArray};
        setSortedData(sort);
        break;
      }
      case 'NAME_DESCENDING': {
        const sortedArray = [].concat(data).sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        const sort = {type: 'ABV_ASCENDING', data: sortedArray};
        setSortedData(sort);
        break;
      }
      default: {
        console.log('Undetected shake');
      }
    }
  }, [data, sortedData.type]);

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

        // this was the intial idea for loading data

        // if (currentPage + 18 > lengthOfData) {
        //   const newBeers = await getBeers(APIpage + 1, searchParams); // needs to check if any more beers available
        //   if (newBeers) {
        //     setData(currentData => [...currentData, ...newBeers]);
        //     setAPIpage(APIpage + 1);
        //   }
        // }
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
    const renderRequirements = {
      currentPage, //
      data: sortedData.data,
      styles,
      handleClick,
      screenType: props.searchParams, // used to prevent duplicate keys
    };
    getItems = renderItems(renderRequirements);
  } else {
    getItems = <Text>Loading...</Text>;
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
