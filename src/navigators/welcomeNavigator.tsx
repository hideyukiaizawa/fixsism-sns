import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {Image} from 'react-native'
import WelcomeScreen from '../screens/WelcomeScreen'
import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: false, animationEnabled: false }}>
    <Stack.Screen
      name="Main"
      component={WelcomeScreen}
      options={{
        // eslint-disable-next-line react/display-name
        headerTitle: () => (
          <Image source={require('../../assets/ism-logo.png')}
            style={{
                width: 120,
                height: 36,
                resizeMode: 'stretch',
            }}
            />
        ),
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="Signin"
      component={SigninScreen}
      options={{
        headerTitle: () => (
          <Image source={require('../../assets/ism-logo.png')}
            style={{
                width: 120,
                height: 36,
                resizeMode: 'stretch',
            }}
          />
        ),
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#000',
        },
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        headerTitle: () => (
          <Image source={require('../../assets/ism-logo.png')}
            style={{
                width: 120,
                height: 36,
                resizeMode: 'stretch',
            }}
          />
        ),
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#000',
        },
      }}
    />
  </Stack.Navigator>
)

export default WelcomeNavigator