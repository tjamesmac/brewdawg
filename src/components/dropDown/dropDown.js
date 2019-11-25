import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Dropdown = props => {
  const [expansion, setExpansion] = React.useState(false);
  const {info} = props;
  const common = {
    paddingTop: 12,
    fontSize: 14,
    color: 'white',
  };
  const initialStyle = {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
  };
  const expandedStyle = {};
  const styles = expansion === false ? initialStyle : expandedStyle;
  function handleClick() {
    setExpansion(!expansion);
  }
  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <View style={styles}>
        <Text style={common} numberOfLines={expansion === false ? 2 : 0}>
          {info}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Dropdown;
