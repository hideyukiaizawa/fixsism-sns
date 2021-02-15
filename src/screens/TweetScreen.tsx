import React, { useCallback } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import { useTweet } from '../services/hooks/tweet'
import Separator from '../components/atoms/separator'
import TweetCard from '../components/organisms/tweetCard'

const TweetScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tweetID = (route.params as any).tweetID
  const [tweet, loading] = useTweet(uid, tweetID)

  return (
    <View style={styles.root}>
      <ScrollView>
        {!loading && tweet && <TweetCard tweetID={tweetID} writerUID={uid} />}
        <Separator />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
})

export default TweetScreen