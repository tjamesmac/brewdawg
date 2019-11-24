import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
export function increasePagination(currentPage, lengthOfData) {
  const page = currentPage;
  const itemsPerPage = 9;
  if (currentPage <= lengthOfData - itemsPerPage) {
    return page + itemsPerPage;
  } else {
    return page;
  }
}

export function decreasePagination(currentPage) {
  const page = currentPage;
  const threshold = 8;
  const itemsPerPage = 9;
  if (currentPage > threshold) {
    return page - itemsPerPage;
  } else {
    return page;
  }
}

export function renderItems(itemRequirements) {
  let {currentPage, data, styles} = itemRequirements;
  const pageRange = data.slice(currentPage - 8, currentPage + 1);

  const items = pageRange.map((item, index) => {
    let imageURL = item.image_url;
    const placeHolder = 'https://images.punkapi.com/v2/keg.png';
    if (imageURL === null) {
      imageURL = placeHolder;
    }
    return (
      <View key={item.id} style={styles.beer}>
        <View style={styles.imageContainer}>
          <Image style={styles.beerImage} source={{uri: imageURL}} />
        </View>
        <Text>{item.name}</Text>
        <Text>{item.abv} ABV</Text>
      </View>
    );
  });
  return items;
}
