import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { LogBox, Platform } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import * as ScreenOrientation from 'expo-screen-orientation';

import Landing from './components/screens/Landing';
import Login from './components/screens/Login';
import Home from './components/screens/Home';
import Contact from './components/screens/Contact';
import SignUp from './components/screens/SignUp';


export default class App extends Component {

  constructor() {
    super();
    if( Platform == 'android') {
      LogBox.ignoreLogs();
    }
  }
  render() {
    return < AppContainer />;
  }

  AppContainer = createAppContainer(AppNavigator);
}



const AppNavigator = createStackNavigator({
  Landing: {
    screen: Landing,
  },
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Contact: {
    screen: Contact
  },
  SignUp: {
    screen: SignUp
  }
},{
  initialRouteName: "Landing"
 });

const AppContainer = createAppContainer(AppNavigator);




