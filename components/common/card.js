import React from 'react';
import { SafeAreaView, SafeAreaViewBase, KeyboardAvoidingView, View, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

const Card = (props) => {

  return (
    <ScrollView>
      <KeyboardAvoidingView 
        style={styles.containerStyle}
        keyboardVerticalOffset={100}
        behavior="position">
          {props.children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
    // padding: 5,
  }
};

export { Card };