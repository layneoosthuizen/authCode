import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BlueBtn = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'normal',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    paddingTop: 7,
  },
  buttonStyle: {
    flex: 1,
    height: 50,
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#037bfc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  }
};

export { BlueBtn };