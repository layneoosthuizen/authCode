import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, Image, View, Dimensions } from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { BlueBtn } from '../common/blueBtn'
import { GreenBtn } from '../common/greenBtn';
import { Card } from '../common/card';
import { CardSection } from '../common/cardsection';
import { Logout } from '../common/logout';
import styles from '../common/styles';

const win = Dimensions.get('screen')

const ratio = win.width/442;

export default class Home extends Component {
  
  static navigationOptions={
    title: 'Doggie Wash - Home',
    headerStyle: {
      backgroundColor: '#033dfc',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  logout = () => {
    firebase.auth().signOut();
  }

  async removeUser() {
    try {
      await AsyncStorage.removeItem('email')
      console.log('Data removed')
    }
    catch(err) {
      alert("Could not recall user \n " + err)
    }
  }

    render() {
      return (
        <Card>
          <CardSection >
            <Ionicons 
            style={ styles.settings }
            name="settings"
            size={20}
            color="red"
            />
          </CardSection>
          <CardSection >
            <Image
              style={{ height: 200, width: win.width, resizeMode: 'contain', aspectRatio: 3.88 }}
              source={ require('../common/images/doggie_pic.png') }>
            </Image>
          </CardSection>
          <CardSection>
            <View style={{ height: 200}}>
              <Text style={ styles.narrative }>
                Doggie Washes is a site where doggie owners and washers can get together to arrange for the care
                of their happy dogs.
              </Text>
            </View>
          </CardSection>
          <CardSection>
            <BlueBtn 
              onPress={() => this.props.navigation.navigate('Contact')}>
              <Text >
              Contact
              </Text>
            </BlueBtn>
          </CardSection>
          <CardSection>
            <GreenBtn onPress={() => this.props.navigation.navigate('Landing')}>
              <Text>
                Landing
              </Text>
            </GreenBtn>
          </CardSection>
          <CardSection>
            <Logout onPress={() => {
              this.logout()
              this.removeUser()
              this.props.navigation.navigate('Landing')
              }}>
              <Text >
                Logout
              </Text>
            </Logout>
          </CardSection>
        </Card>
      )
    }
  };
