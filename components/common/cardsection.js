import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CardSection = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView         
      style={styles.containerStyle}
        // keyboardVerticalOffset={100}
        // behavior="position"
        >
        {props.children}
      </KeyboardAvoidingView>
    </ScrollView>

  );
};

const styles = {
  ...Platform.select({
    android: {
      containerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#FFFFFF',
        position: 'relative',
      } 
    },
    default: {
      containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        alignItems: 'center',
        borderColor: '#FFFFFF',
      }
    }
  })
};

export { CardSection };