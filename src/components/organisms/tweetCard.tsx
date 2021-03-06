import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../repositories/firebase'
import { useUser } from '../../services/hooks/user'
import { useTweet } from '../../services/hooks/tweet'
import { fromNow } from '../../services/date'
import { useNavigation, StackActions } from '@react-navigation/native'
import Avatar from '../../components/atoms/avatar'
import CircleSkeleton from '../atoms/circleSkeleton'
import BoxSkeleton from '../atoms/boxSkeleton'
import Spacer from '../../components/atoms/spacer'
import FileGallery from '../../components/moleculars/fileGallery'
import Hyperlink from 'react-native-hyperlink'

const FULL_WIDTH = Dimensions.get('window').width

type TweetCardProps = {
  tweetID: string
  writerUID: string
  onPressCard?: (event: GestureResponderEvent) => void
  onPressAvatar?: (event: GestureResponderEvent) => void
}

const TweetCard = ({ tweetID, writerUID, onPressCard, onPressAvatar }: TweetCardProps) => {
  const [firebaseUser] = useAuthState(auth)
  const [user, userLoading] = useUser(writerUID)
  const navigation = useNavigation()
  const [tweet, tweetLoading] = useTweet(writerUID, tweetID)

  const openWebSite = useCallback(
    (url: string) => {
      navigation.dispatch(StackActions.push('Web', {url}))
    },
    [navigation]
  )

  // MEMO: スケルトンカードを表示
  if (userLoading || tweetLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.inner}>
          <TouchableOpacity onPress={onPressAvatar}>
            <View style={styles.avatarWrapper}>
              <CircleSkeleton size="m" />
            </View>
          </TouchableOpacity>
          <Spacer layout="vertical" size="s" />
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeaderWrapper}>
              <BoxSkeleton width={FULL_WIDTH - 100} height={20} />
            </View>
            <Spacer size="m" />
            <View>
              <BoxSkeleton width={FULL_WIDTH - 200} height={24} />
              <Spacer size="s" />
              <BoxSkeleton width={FULL_WIDTH - 100} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.root} onPress={onPressCard}>
      <View style={styles.inner}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Avatar size="m" uri={(user && user.thumbnailURL) ?? undefined} />
          </TouchableOpacity>
        </View>
        <Spacer layout="vertical" size="s" />
        <View style={styles.contentWrapper}>
          <View style={styles.contentHeaderWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userText}>
              <Text style={styles.nameText}>{user.name} </Text>
            </Text>
            <Spacer layout="vertical" size="s" />
            <Text style={styles.dateText}>{fromNow(tweet.createdAt)}</Text>
          </View>
          <Spacer size="xs" />
          <View>
            <Hyperlink
            linkStyle={{color: '#2980b9'}}
            onPress={(url: string) => {
              openWebSite(url)
            }}>
              <Text style={styles.tweetText}>{tweet.text}</Text>
            </Hyperlink>
          </View>
          {tweet.fileURLs.length > 0 && (
            <React.Fragment>
              <Spacer size="s" />
              <FileGallery fileURLs={tweet.fileURLs} />
            </React.Fragment>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarWrapper: {},
  contentWrapper: {
    flex: 1,
  },
  contentHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingTop: 12,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userText: {
    flex: 1, // for ellipsizeMode
  },
  idText: {
    fontSize: 14,
    color: 'gray',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  tweetText: {
    fontSize: 16,
  },
  countText: {
    fontSize: 12,
    color: 'gray',
  },
})

export default TweetCard