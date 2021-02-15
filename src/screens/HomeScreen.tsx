import React, {useCallback} from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import Spacer from '../components/atoms/spacer'
import OutlinedButton from '../components/atoms/outlinedButton'

const WebScreen = () => {

  const navigation = useNavigation()

  const goToBlog = useCallback(() => {
      navigation.dispatch(StackActions.push('Blog'))
      }, [navigation])

  const goToYoutube = useCallback(() => {
    navigation.dispatch(StackActions.push('Youtube'))
    }, [navigation])
  

  return (
      <View style={styles.root}>
        <View style={styles.buttonsWrapper}>
          <OutlinedButton fontSize={24} text={"FXism公式ブログ"} onPress={goToBlog} />
          <Spacer size="m" />
          <OutlinedButton fontSize={24} text={"FXism Official YouTube"} onPress={goToYoutube} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
  buttonsWrapper: {
    position: 'absolute',
    top: 160,
    alignSelf: 'center',

  },
})

export default WebScreen