import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, Image, View, Dimensions, Platform, Alert } from 'react-native';
import firebase from '../../config/firebase'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

import { BlueBtn } from '../common/blueBtn';
import { GreenBtn } from '../common/greenBtn';
import { Card } from '../common/card';
import { CardSection } from '../common/cardsection';
import styles from '../common/styles';

const win = Dimensions.get('screen')

const ratio = win.width/442;

export default class Landing extends Component {
  
  constructor() {
    super();
    if( Platform == 'android') {
      LogBox.ignoreLogs();
    }
  }
  
  static navigationOptions={
    title: 'Doggie Wash',
    headerStyle: {
      backgroundColor: '#033dfc',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  async recallUser() {
    try {
      const email = await AsyncStorage.getItem('email');
      if(email != null) {
        this.props.navigation.navigate('Home')
      }else {
        this.props.navigation.navigate('Login')
      }
    }catch(err) {
      alert(err)
    }
  }
 
    render() {
      return (
        <Card>
          <CardSection >
            <Image
              style={{ width: win.width, resizeMode: 'contain', aspectRatio: 7, backgroundColor: '#FFFFFF' }}
              source={ require('../common/images/dog_paw.png') }>
            </Image>
          </CardSection>
          <CardSection>
            <View>
              <Text style={ styles.h2 } >
                Welcome to Doggie Wash
              </Text>
              <Text style={ styles.narrative }>
                A place where doggie owners and washers can get together to arrange for the care
                of their happy dogs.
              </Text>
            </View>
          </CardSection>
          <CardSection >
            <Image
              style={{ height: 300, width: win.width, resizeMode: 'contain', aspectRatio: 2 }}
              source={ require('../common/images/doggie_pic.png') }>
            </Image>
          </CardSection>        
          <CardSection>
            <BlueBtn 
              onPress={() => {
                this.recallUser()
                }}>
              <Text >
              Washers
              </Text>
            </BlueBtn>
          </CardSection>
          <CardSection>
            <GreenBtn onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text>
              SignUp
              </Text>
            </GreenBtn>
          </CardSection>
          <CardSection>
            <View style={{ height: 200}}/>
          </CardSection>
        </Card>
      )
    }
  };

 