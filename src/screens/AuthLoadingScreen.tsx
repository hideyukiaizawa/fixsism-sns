import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const AuthLoadingScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={require('../../assets/ism-logo.png')}
            style={{
                width: 120,
                height: 36,
                resizeMode: 'stretch',
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})

export default AuthLoadingScreen