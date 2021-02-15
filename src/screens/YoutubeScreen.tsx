import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {WebView} from "react-native-webview"


const YoutubeScreen = () => {

  return(
    <View style={styles.container}>
      <WebView 
      source={{uri: 'https://www.youtube.com/user/FXismOIKAWA'}}
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

export default YoutubeScreen