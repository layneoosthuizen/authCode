import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, Image, View, Dimensions, Keyboard, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
import firebase from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { BlueBtn } from '../common/blueBtn';
import { GreenBtn } from '../common/greenBtn';
import { Card } from '../common/card';
import { CardSection } from '../common/cardsection';
import styles from '../common/styles';
import { TextInput } from 'react-native-gesture-handler';

const win = Dimensions.get('screen')

const ratio = win.width/442;

export default class Login extends Component {
  
  static navigationOptions={
    title: 'Doggie Wash - Login',
    headerStyle: {
      backgroundColor: '#033dfc',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  constructor() {
    super();
    if( Platform == 'android') {
      LogBox.ignoreLogs();
    }
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }

  async storeUser() {
    try {
      await AsyncStorage.setItem('email', this.state.email);
    }catch(err) {
      alert("Could not store user \n " + err)
    }
  }
  
  async recallUser() {
    try {
      const email = await AsyncStorage.getItem('email');
    }catch(err) {
      Alert.alert("Could not recall user \n " + err)
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  clearFields = () => {
    this.setState({
      isLoading: false,
      displayName: '',
      email: '',
      password: '',
      password1: ''
    })
  }

  signin = () => {
    if(this.state.email === '' && this.state.password === ''){
      const alertTitle = 'Alert'
      const alertText = 'Enter details to sign in!'
      if(Platform.OS === 'web') {
        alert(alertText)
      } else {
        Alert.alert(alertTitle, alertText)
      }
    } else {
      this.setState({
        isLoading: true,
      })
      try {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          const alertTitle = 'Well Done'
          const alertText = 'You are now logged in!'
          this.storeUser()
          this.recallUser()
          this.clearFields()
          if(Platform.OS === 'web') {
            alert(alertText)

          } else {
            Alert.alert(alertTitle, alertText)
          }
          this.props.navigation.navigate('Landing')
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            this.setState({
              isLoading: false,
            })
            alert('That email address is already in use!');
            this.props.navigation.navigate('SignUp')
          }
      
          if (err.code === 'auth/invalid-email') {
            this.setState({
              isLoading: false,
            })
            alert('That email address is invalid!');
            this.props.navigation.navigate('SignUp')
          }
        })
      }catch(err) {
        alert("There's a problem \n" + err)
      }
      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <Card>
          <ActivityIndicator size= 'large' color= '#9E9E9E'/>
        </Card>
      )
    }

    return (
      <Card>
        <CardSection >
        <Image
            style={{ width: win.width, resizeMode: 'contain', aspectRatio: 7 }}
            source={ require('../common/images/dog_paw.png') }>
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
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='Email'
                  value={this.state.email}
                  onChangeText={(val) => this.updateInputVal(val, 'email')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  secureTextEntry={ true }
                  style={ styles.loginInp } 
                  placeholder='Password'
                  value={this.state.password}
                  onChangeText={(val) => this.updateInputVal(val, 'password')}/>
            </ScrollView>
        </CardSection>
        <CardSection>
          <BlueBtn 
            onPress={() => { 
              this.signin() 
            }}>
            <Text >
            Sign In
            </Text>
          </BlueBtn>
        </CardSection>
        <CardSection>
          <View style={{ height: 200}}/>
        </CardSection>
      </Card>
    )
  }
};
