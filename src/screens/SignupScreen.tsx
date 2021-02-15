import React, { useState, useCallback } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { signUpWithEmail } from '../services/auth/email'
import FilledButton from '../components/atoms/filledButton'
import Spacer from '../components/atoms/spacer'

const SignupScreen = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPressSignUpEmail = useCallback(async (email: string, password:string) => {
    const { success, error } = await signUpWithEmail(email, password)
    if (success) {
        return alert('ログインしました！')
      }
    if (error) {
      return alert('新規登録に失敗しました。')
    }
    }, [])

  return (
    <View style={styles.root}>
      <Spacer size="m" />
      <Text style={styles.title}>
        新規登録
      </Text>
      <Spacer size="m" />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email Address"
      />
      <Spacer size="s" />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
      />
      <Spacer size="m" />
      <View style={styles.buttonWrapper}>
        <FilledButton text="送信" fontSize={16} onPress={() => onPressSignUpEmail(email, password)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#000',
    alignItems: "center",
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    width: "100%",
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: "#fff"
  },
  buttonWrapper: {
    width: "60%",
  },
})


export default SignupScreen
