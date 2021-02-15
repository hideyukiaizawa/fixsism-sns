import React from 'react'
import { View, StyleSheet } from 'react-native'
import {WebView} from "react-native-webview"

const BlogScreen = () => {

  return(
    <View style={styles.container}>
      <WebView 
      source={{uri: 'https://fxism.jp/'}}
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
export default BlogScreen