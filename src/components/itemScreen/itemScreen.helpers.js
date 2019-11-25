import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

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
  const {currentPage, data, styles, handleClick} = itemRequirements;
  const pageRange = data.slice(currentPage - 8, currentPage + 1);

  const items = pageRange.map((item, index) => {
    let imageURL = item.image_url;
    const placeHolder = 'https://images.punkapi.com/v2/keg.png'; // generic placeholder for null
    if (imageURL === null) {
      imageURL = placeHolder;
    }

    return (
      <TouchableOpacity
        onPress={() => handleClick(item.id)}
        key={item.id}
        style={styles.beer}>
        <View style={styles.imageContainer}>
          <Image style={styles.beerImage} source={{uri: imageURL}} />
        </View>
        <Text>{item.name}</Text>
        <Text>{item.abv} ABV</Text>
      </TouchableOpacity>
    );
  });
  return items;
}

export function sortOptions(items, sort) {
  switch (sort) {
    case 'ABV_ASCENDING': {
      const sortedArray = [].concat(items).sort((a, b) => {
        return a.abv - b.abv;
      });
      return sortedArray;
    }
    case 'ABV_DESCENDING': {
      const sortedArray = [].concat(items).sort((a, b) => {
        return b.abv - a.abv;
      });
      return sortedArray;
    }
    case 'NAME_ASCENDING': {
      const sortedArray = [].concat(items).sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return sortedArray;
    }
    case 'NAME_DESCENDING': {
      const sortedArray = [].concat(items).sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return sortedArray;
    }
  }
}
