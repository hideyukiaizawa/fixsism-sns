import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { signInGoogle } from '../services/auth/google'
import { useNavigation, StackActions } from '@react-navigation/native'
import FilledButton from '../components/atoms/filledButton'
import Spacer from '../components/atoms/spacer'
import TextButton from '../components/atoms/textButton'

const WelcomeScreen = () => {

  const navigation = useNavigation()

  const goToSignin = useCallback(
    () => {
      navigation.dispatch(StackActions.push('Signin'))
    },
    [navigation]
  )

  const goToSignup = useCallback(
    () => {
      navigation.dispatch(StackActions.push('Signup'))
    },
    [navigation]
  )

  const onPressSignInGoogle = useCallback(async () => {
    const { canceled, error } = await signInGoogle()
    if (canceled) {
      return alert('ログインに失敗しました')
    }
    if (error) {
      return alert('ログインをキャンセルしました')
    }
  }, [])

  return (
    <View style={styles.root}>
      <Text style={styles.messageText}>ようこそ！</Text>
      <Text style={styles.messageText}>「FXism」へ</Text>
      <Spacer size="xl" />
      <View style={styles.buttonWrapper}>
        <FilledButton text="Googleアカウントでログイン" fontSize={18} onPress={onPressSignInGoogle} />
      </View>
      <Spacer size="l" />
      <TextButton text="メールアドレスでログインする" color="#fff" fontSize={14} onPress={goToSignin} />
      <Spacer size="s" />
      <TextButton text="メールアドレスで新規登録する" color="#fff" fontSize={14} onPress={goToSignup} />
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
    padding: 24,
  },
  buttonWrapper: {
    width: '100%',
  },
  messageText: {
    fontSize: 36,
    color: "#fff",
    lineHeight: 36 * 1.4,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})


export default WelcomeScreen
