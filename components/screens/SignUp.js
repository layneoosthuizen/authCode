import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Text, Image, View, Dimensions, Keyboard, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import firebase from '../../config/firebase'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BlueBtn } from '../common/blueBtn';
import { Card } from '../common/card';
import { CardSection } from '../common/cardsection';
import styles from '../common/styles';

const win = Dimensions.get('screen')

const ratio = win.width/442;

export default class SignUp extends Component {

  static navigationOptions={
    title: 'Doggie Wash - Sign Up',
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
      this.dbRef = firebase.firestore().collection('users');
      this.state = {
        userType: '',
        displayName: '',
        email: '',
        password: '',
        password1: '',
        addr1: '',
        addr2: '',
        city: '',
        code: '',
        country: '',
        ownerChk: false,
        washerChk: false,
        isLoading: false,
      }
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
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
      alert("Could not recall user \n " + err)
    }
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUserData() {
    if(this.state.displayName === '') {
      Alert.alert('The display name field cannot be empty.')
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({
        userType: this.state.userType,
        displayName: this.state.displayName,
        email: this.state.email,
        addr1: this.state.addr1,
        addr2: this.state.addr2,
        city: this.state.city,
        code: this.state.code,
        country: this.state.country,
      }).then((res) => {
        this.setState({
          userType: '',
          displayName: '',
          email: '',
          addr1: '',
          addr2: '',
          city: '',
          code: '',
          country: '',
        });
        }).catch((err) => {
          Alert.alert("Error found: \n" + err)
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  checkPasswords = () => {
    if(this.state.password != this.state.password1) {
      const alertTitle = 'Alert'
      const alertText = 'Passwords do not match'
      if(Platform.OS === 'web')   {
        alert(alertText)
      } else {
        Alert.alert(alertTitle, alertText)
      }
      this.clearFields();
    } else {
      this.checkUserType();
    }
  }

  clearFields = () => {
    this.setState({
      userType: '',
      isLoading: false,
      displayName: '',
      email: '',
      password: '',
      password1: '',
      ownerChk: false,
      washerChk: false,
    })
  }

  checkUserType() {
    if(this.state.ownerChk === true) {
      this.setState({
        userType: 'Owner'
      }),
      this.registerUser()
    } else {
      this.setState({
        userType: 'Washer'
      }),
      this.registerUser()
    } 
    if(this.state.ownerChk === false && this.state.washerChk === false) {
        Alert.alert('Please select a user type.')
        return;
    }
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === ''){
      const alertTitle = 'Alert'
      const alertText = 'Enter details to signup!'
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
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          const alertTitle = 'Well Done'
          const alertText = 'You have been added!'
          this.storeUser()
          this.storeUserData()
          this.recallUser()
          this.clearFields()
          if(Platform.OS === 'web') {
            alert(alertText)
            this.clearFields()
          } else {
            Alert.alert(alertTitle, alertText)
          }
          this.props.navigation.navigate('Landing')
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
          <CheckBox 
            style={ styles.ownerChk }
            center
            title='Owner'
            checkedColor='green'
            checkedTitle='Owner Selected'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={ this.state.ownerChk }
            onPress={() => {
              this.setState({ 
                ownerChk: !this.state.ownerChk,
                washerChk: false 
              })
            }}
          />
          <CheckBox 
            style={ styles.washerChk }
            center
            title='Washer'
            checkedColor='green'
            checkedTitle='Washer Selected'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={ this.state.washerChk }
            onPress={() => {
              this.setState({ 
                washerChk: !this.state.washerChk,
                ownerChk: false
              })
            }}
          />
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
              <TextInput 
                style={ styles.loginInp } 
                placeholder='Display Name'
                value={this.state.displayName}
                onChangeText={(val) => this.updateInputVal(val, 'displayName')}/>
            </ScrollView>
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
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  secureTextEntry={ true }
                  style={ styles.loginInp } 
                  placeholder='Confirm Password'
                  value={this.state.password1}
                  onChangeText={(val) => this.updateInputVal(val, 'password1')}
                  />
            </ScrollView>
        </CardSection>          
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='Address 1'
                  value={this.state.addr1}
                  onChangeText={(val) => this.updateInputVal(val, 'addr1')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='Address 2'
                  value={this.state.addr2}
                  onChangeText={(val) => this.updateInputVal(val, 'addr2')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='City'
                  value={this.state.city}
                  onChangeText={(val) => this.updateInputVal(val, 'city')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='Code'
                  value={this.state.code}
                  onChangeText={(val) => this.updateInputVal(val, 'code')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  placeholder='Country'
                  value={this.state.country}
                  onChangeText={(val) => this.updateInputVal(val, 'country')}/>
            </ScrollView>
        </CardSection>
        <CardSection>
          <BlueBtn onPress={() => {
              this.checkPasswords();
            }
          }>
            <Text >
            Create Account
            </Text>
          </BlueBtn>
        </CardSection>
      </Card>
    )
  }
};
