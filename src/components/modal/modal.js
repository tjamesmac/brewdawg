import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import Dropdown from '../dropDown/dropDown';

const CustomModal = props => {
  const {visible, handleClose} = props;
  const {
    name,
    tagline,
    abv,
    description,
    food_pairing,
    image_url,
  } = props.itemInformation;
  let imageURL = image_url;
  const placeHolder = 'https://images.punkapi.com/v2/keg.png';
  const food = food_pairing.map((item, index) => {
    return (
      <Text style={styles.itemText} key={index + ' food'}>
        {item}
      </Text>
    );
  });
  if (image_url === null) {
    imageURL = placeHolder;
  }
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View>
          <View style={styles.modalBody}>
            <TouchableHighlight style={styles.modalClose} onPress={handleClose}>
              <Text style={styles.modalCloseText}>CLOSE</Text>
            </TouchableHighlight>
            <View style={styles.itemBody}>
              <View style={styles.itemInfo}>
                <ScrollView>
                  <Text style={styles.itemHeading}>{name}</Text>
                  <Text style={styles.itemSubHeading}>{tagline}</Text>
                  <Text style={styles.itemTextsmaller}>ABV: {abv}</Text>
                  <Text style={styles.itemSubHeading}>Description:</Text>
                  <Dropdown style={styles.itemDescription} info={description} />
                  <Text style={styles.itemSubHeading}>Pairs with:</Text>
                  <Dropdown style={styles.itemSubHeading} info={food} />
                </ScrollView>
              </View>
              <View style={styles.itemImageContainer}>
                <Image style={styles.itemImage} source={{uri: imageURL}} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
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

export default CustomModal;
