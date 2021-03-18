import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, Image, View, Dimensions, Keyboard, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { BlueBtn } from '../common/blueBtn';
import { GreenBtn } from '../common/greenBtn';
import { Card } from '../common/card';
import { CardSection } from '../common/cardsection';
import styles from '../common/styles';
import { firestore } from 'firebase';
import { useState } from 'react/cjs/react.development';
import { event } from 'react-native-reanimated';

const win = Dimensions.get('screen')

const ratio = win.width/442;

export default class Contact extends Component {

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
  
  constructor() {
    super();
    if( Platform == 'android') {
      LogBox.ignoreLogs();
    }
    this.dbRef = firebase.firestore().collection("users")
    this.state = {
      userType: '',
      sEmail: '',
      id: '',
      dName: '',
      mail: '',
      add1: '',
      add2: '',
      city1: '',
      code1: '',
      country1: '',
      ownerChk: false,
      washerChk: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.recallUser()
  }

  getRcrd() { 
    if(this.state.sEmail === '') {
      this.recallUser()
    }
    try {
      this.dbRef
      .where('email', '==', this.state.sEmail)
      .get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          const ide = doc.id
          const { userType, displayName, email, addr1, addr2, city, code, country } = doc.data()
          this.setState ({
            id: ide,
            userType: userType,
            dName: displayName,
            mail: email,
            add1: addr1,
            add2: addr2,
            city1: city,
            code1: code,
            country1: country,
          })
          if(this.state.userType === 'Owner') {
            this.setState({
              ownerChk: true
            })
          } else {
            this.setState({
              washerChk: true
            })
          }
        });
      })

    }catch(err) {
      console.log("Error: \n" + err );
    }
  }

  clearFields = () => {
    this.setState({
      userType: '',
      sEmail: '',
      dName: '',
      mail: '',
      dName: '',
      mail: '',
      add1: '',
      add2: '',
      city1: '',
      code1: '',
      country1: '',
      ownerChk: false,
      washerChk: false,
      isLoading: false,
      options: [
        {
          title: 'Owner',
          checked: false
        },
        {
          title: 'Washer',
          checked: false
        },
      ]
    })
  }

  async recallUser() {
    try {
      let loggedInUser = await AsyncStorage.getItem("email");
      this.setState({
        sEmail: loggedInUser
      })
      this.getRcrd()
    }catch(err) {
      alert(err)
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUserData() {
    this.setState({
      isLoading: true,
    })
    try {
      const updatedbRef = firebase.firestore().collection('users')
      .doc(this.state.id)   
      updatedbRef.set({
        userType: this.state.userType,
        displayName: this.state.dName,
        email: this.state.mail,
        addr1: this.state.add1,
        addr2: this.state.add2,
        city: this.state.city1,
        code: this.state.code1,
        country: this.state.country1,
      })
      .then((docRef) => {
        this.setState({
          isLoading: false
        })
      })
      this.clearFields()
      this.getRcrd()
      alert("Your info has been updated.")
    } catch(err) {
      console.log(err)
      this.setState({
        isLoading: false
      })
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
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            center
            title='Owner'
            style={{ }}
            checkedColor='green'
            checkedTitle="I'm a Pet Owner"
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={ this.state.ownerChk }
            onPress={() => {
              this.setState({ 
                ownerChk: !this.state.ownerChk,
                washerChk: false,
                userType: 'Owner'
              })
            }}
          />
          <CheckBox 
            style={ styles.washerChk }
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            center
            title='Washer'
            checkedColor='green'
            checkedTitle="I'm a Pet Washer"
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={ this.state.washerChk }
            onPress={() => {
              this.setState({ 
                washerChk: !this.state.washerChk,
                ownerChk: false,
                userType: 'Washer'
              })
            }}
          />
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
              <TextInput 
                style={ styles.loginInp } 
                selectTextOnFocus = { true }
                clearButtonMode = { 'unless-editing' }
                defaultValue={ this.state.dName }
                onChangeText={(val) => this.updateInputVal(val, 'dName')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView /*onBlur={Keyboard.dismiss}*/>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  clearButtonMode = { 'unless-editing' }
                  defaultValue={ this.state.mail }
                  onChangeText={(val) => this.updateInputVal(val, 'mail')}
                  />
            </ScrollView>
        </CardSection>        
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  clearButtonMode = { 'unless-editing' }
                  multiline = { true }
                  defaultValue={ this.state.add1 }
                  onChangeText={(val) => this.updateInputVal(val, 'add1')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  multiline = { true }
                  clearButtonMode = { 'unless-editing' }
                  defaultValue={ this.state.add2 }
                  onChangeText={(val) => this.updateInputVal(val, 'add2')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  clearButtonMode = { 'unless-editing' }
                  defaultValue={ this.state.city1 }
                  onChangeText={(val) => this.updateInputVal(val, 'city1')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  clearButtonMode = { 'unless-editing' }
                  defaultValue={ this.state.code1 }
                  onChangeText={(val) => this.updateInputVal(val, 'code1')}/>
            </ScrollView>
        </CardSection>
        <CardSection >
            <ScrollView onBlur={Keyboard.dismiss}>
                <TextInput 
                  style={ styles.loginInp } 
                  selectTextOnFocus = { true }
                  clearButtonMode = { 'unless-editing' }
                  defaultValue={ this.state.country1 }
                  onChangeText={(val) => this.updateInputVal(val, 'country1')}/>
            </ScrollView>
        </CardSection>
        <CardSection>
          <BlueBtn 
            onPress={() => {
              this.storeUserData()
            }
          }>
            <Text >
            Update User
            </Text>
          </BlueBtn>
        </CardSection>
        <CardSection>
          <GreenBtn onPress={() => {
              this.props.navigation.navigate('Landing')
            }
          }>
            <Text >
          Back to Landing
            </Text>
          </GreenBtn>
        </CardSection>
      </Card>
    )
  }
};