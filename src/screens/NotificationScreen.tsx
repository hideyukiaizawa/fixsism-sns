import React, { useCallback, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { useIsmTweetsPaginator } from '../services/hooks/tweet'
import TweetList from '../components/organisms/tweetList'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MaterialIcons } from '@expo/vector-icons'
import { auth } from '../repositories/firebase'
import Fab from '../components/atoms/fab'

const HomeScreen = () => {
  const admin_uid = process.env.ADMIN_UID
  const navigation = useNavigation()
  const [firebaseUser] = useAuthState(auth)
  const [onFetch, { values, loading }] = useIsmTweetsPaginator()

  useEffect(() => {
    onFetch({ initialize: true })
  }, [onFetch])

  const goToTweet = useCallback(
    (uid: string, tweetID: string) => {
      navigation.dispatch(StackActions.push('Tweet', { uid, tweetID }))
    },
    [navigation]
  )

  const goToUser = useCallback(
    (uid) => {
      navigation.dispatch(StackActions.push('User', { uid }))
    },
    [navigation]
  )
  
  const goToCreateTweet = useCallback(() => {
    navigation.dispatch(StackActions.push('CreateTweet'))
  }, [navigation])

  return (
    <View style={styles.root}>
      <TweetList
        data={values.map((value) => ({ tweetID: value.id, writerUID: value.writer.ref.id }))}
        refreshing={loading}
        onRefresh={() => onFetch({ initialize: true })}
        onEndReached={() => onFetch({ initialize: false })}
        onPressCard={goToTweet}
        onPressAvatar={goToUser}
      />

      {firebaseUser.uid===admin_uid && (
        <View style={styles.fabWrapper}>
          <Fab onPress={goToCreateTweet}>
            <MaterialIcons name="edit" size={24} color="#ffffff" />
          </Fab>
      </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
  headerLeftWrapper: {
    paddingLeft: 24,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
})

export default HomeScreen