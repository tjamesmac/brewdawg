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
  const {currentPage, data, styles, handleClick, screenType} = itemRequirements;
  const pageRange = data.slice(currentPage - 8, currentPage + 1);

  const items = pageRange.map((item, index) => {
    let imageURL = item.image_url;
    const placeHolder = 'https://images.punkapi.com/v2/keg.png';
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

export async function getBeers(index, searchParams) {
  try {
    let URL;
    console.log(searchParams);
    if (searchParams === 'all') {
      URL = `https://api.punkapi.com/v2/beers?page=${index}&per_page=71`;
    } else {
      URL = `https://api.punkapi.com/v2/beers?page=${index}&per_page=71&food=${searchParams}`;
    }
    const getData = await fetch(URL);
    const response = await getData;
    if (response.status === 200) {
      const responseJSON = await response.json();
      if (responseJSON.length) {
        return responseJSON;
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

//  const eventListener = React.useCallback(() => {
//     console.log('shaking');
//     switch (refExample.current) {
//       case 'ABV_ASCENDING': {
// const sortedArray = [].concat(data).sort((a, b) => {
//   return a.abv - b.abv;
// });
//         const sort = {type: 'ABV_DESCENDING', data: sortedArray};
//         refExample.current = 'ABV_DESCENDING';
//         // setSortedData(sort);
//         console.log('up');
//         break;
//       }
//       case 'ABV_DESCENDING': {
//         const sortedArray = [].concat(data).sort((a, b) => {
//           return b.abv - a.abv;
//         });
//         const sort = {type: 'NAME_ASCENDING', data: sortedArray};
//         refExample.current = 'NAME_ASCENDING';
//         // setSortedData(sort);
//         console.log('down');
//         break;
//       }
//       case 'NAME_ASCENDING': {
//         const sortedArray = [].concat(data).sort((a, b) => {
//           return a.name.localeCompare(b.name);
//         });
//         const sort = {type: 'NAME_DESCENDING', data: sortedArray};
//         refExample.current = 'NAME_DESCENDING';
//         // setSortedData(sort);
//         console.log('yes');
//         break;
//       }
//       case 'NAME_DESCENDING': {
// const sortedArray = [].concat(data).sort((a, b) => {
//   return b.name.localeCompare(a.name);
// });
//         const sort = {type: 'ABV_ASCENDING', data: sortedArray};
//         refExample.current = 'ABV_ASCENDING';
//         console.log('no');
//         break;
//       }
//       default: {
//         console.log('Undetected shake');
//       }
//     }
//   }, [data]);

//   React.useEffect(() => {
//     RNShake.addEventListener('ShakeEvent', eventListener);
//     console.log(refExample.current, 'this is the ref inside the event');
//     if (refExample.current === 'ABV_ASCENDING') {
//       console.log('I AM ASCENDING');
//     } else {
//       console.log(refExample, 'help');
//     }
//     return () => {
//       RNShake.removeEventListener('ShakeEvent', eventListener);
//     };
//   }, [eventListener]);
