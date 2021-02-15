import React, {useCallback, useLayoutEffect} from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import {WebView} from "react-native-webview"


const WebScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const url = (route.params as any ).url

  const renderHeaderLeft = useCallback(() => {
    return (
      <View style={styles.headerLeftWrapper}>
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
            <AntDesign name="caretdown" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    )
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    })
  }, [navigation, renderHeaderLeft])

  return(
    <View style={styles.container}>
      <WebView 
      source={{uri: url}}
      allowsBackForwardNavigationGestures={true}
      scalesPageToFit={true}
      startInLoadingState={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLeftWrapper: {
    paddingLeft: 24,
  },
  text: {
    color:"#fff",
  },
})

export default WebScreen