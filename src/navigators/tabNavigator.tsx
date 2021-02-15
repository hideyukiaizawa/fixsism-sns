import React from 'react'
import { Image } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../repositories/firebase'
/* screens */
import UserScreen from '../screens/UserScreen'
import UpdateUserScreen from '../screens/UpdateUserScreen'
import YoutubeScreen from '../screens/YoutubeScreen'
import BlogScreen from '../screens/BlogScreen'
import AnalyzerScreen from '../screens/AnalyzerScreen'
import NotificationScreen from '../screens/NotificationScreen'
import CreateTweetScreen from '../screens/CreateTweetScreen'
import TweetScreen from '../screens/TweetScreen'
import WebScreen from '../screens/WebScreen'

const Stack = createStackNavigator()

const BlogStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main" mode="modal">
      <Stack.Screen
        name="Main"
        component={BlogScreen}
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
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle:{
              color: "#fff",
              fontWeight: "bold",
          },    
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
    
  )
}

const YoutubeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main" mode="modal">
      <Stack.Screen
        name="Main"
        component={YoutubeScreen}
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
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle:{
              color: "#fff",
              fontWeight: "bold",
          },    
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
    
  )
}

const AnalyzerStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main" mode="modal">
      <Stack.Screen
        name="Main"
        component={AnalyzerScreen}
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
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle:{
              color: "#fff",
              fontWeight: "bold",
          },    
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
    
  )
}


const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main" mode="modal">
      <Stack.Screen
        name="Main"
        component={NotificationScreen}
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
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle:{
              color: "#fff",
              fontWeight: "bold",
          },    
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
      name="Tweet"
      component={TweetScreen}
      options={{
        headerTitle: '投稿内容',
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#000',
        },
      }}
    />
    <Stack.Screen
      name="Web"
      component={WebScreen}
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
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle:{
            color: "#fff",
            fontWeight: "bold",
        },    
        headerTintColor: "#fff",
      }}
    />
      <Stack.Screen
      name="CreateTweet"
      component={CreateTweetScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{
        headerTitle: 'ユーザー',
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: '#000',
        },
      }}
    />
  </Stack.Navigator>
    
  )
}


const UserStackNavigator = () => {
  const [user] = useAuthState(firebase.auth())
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={UserScreen}
        options={{
          headerTitle: "マイページ",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: "#fff",
        }}
        initialParams={{ uid: user?.uid }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUserScreen}
        options={{
          headerTitle: '変更',
          headerBackTitleVisible: false,
        }}
        initialParams={{ uid: user?.uid }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
  initialRouteName="HomeTab"
  tabBarOptions={{ 
    showLabel: false,
    activeTintColor: "#900",
    inactiveTintColor: "#999",
    style:{
        backgroundColor: "#000",
    }
   }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({color}) => {
        if (route.name === 'BlogTab') {
          return <MaterialCommunityIcons color={color} name="home" size={24} />
        }
        if (route.name === 'YoutubeTab') {
          return <MaterialCommunityIcons color={color} name="youtube" size={24} />
        }
        if (route.name === 'AnalyzerTab') {
          return <AntDesign color={color} name="barschart" size={24} />
        }
        if (route.name === 'NotificationTab') {
          return <MaterialCommunityIcons color={color} name="bell" size={24} />
        }
        if (route.name === 'UserTab') {
          return <MaterialCommunityIcons color={color} name="account" size={24} />
        }
      },
    })}
  >
    <Tab.Screen name="BlogTab" component={BlogStackNavigator} />
    <Tab.Screen name="YoutubeTab" component={YoutubeStackNavigator} />
    <Tab.Screen name="AnalyzerTab" component={AnalyzerStackNavigator} />
    <Tab.Screen name="NotificationTab" component={NotificationStackNavigator} />
    <Tab.Screen name="UserTab" component={UserStackNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
