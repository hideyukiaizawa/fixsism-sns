import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signout } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import Spacer from '../components/atoms/spacer'
import Avatar from '../components/atoms/avatar'
import OutlinedButton from '../components/atoms/outlinedButton'

const UserScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid = (route.params as any).uid
  const [firebaseUser] = useAuthState(auth)
  const [user, loading] = useUser(uid)

  const showThumbnailURL = useMemo(() => {
    if (user && user.thumbnailURL) {
      return user.thumbnailURL
    }
    return undefined
  }, [user])

  const isMy = useMemo(() => {
    return firebaseUser.uid === uid
  }, [firebaseUser, uid])

  const onPressLogout = useCallback(() => {
    signout()
  }, [])

  const goToUpdateUser = useCallback(() => {
    navigation.navigate('UpdateUser')
  }, [navigation])

  return (
    <View style={styles.root}>
      <Spacer size="xxl" />
      <View style={styles.headSection}>
        <View style={styles.thumbnailWrapper}>
          <Avatar size="l" uri={showThumbnailURL} />
        </View>
        <View style={styles.actionAreaWrapper}>
        {isMy && (
            <View style={styles.row}>
              <OutlinedButton text="変更" onPress={goToUpdateUser} />
              <Spacer layout="vertical" size="xs" />
              <OutlinedButton text="ログアウト" color="#FF3333" onPress={onPressLogout} />
            </View>
          )}
        </View>
      </View>

      <Spacer size="xxl" />

      <View style={styles.section}>
        <Text style={styles.nameText}>{loading ? '読み込み中' : user.name}</Text>
      </View>

      <Spacer size="s" />

      <View style={styles.section}>
        <Text>{loading ? '読み込み中' : user.profile}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  headSection: {
    width: '100%',
    position: 'relative',
  },
  section: {
    width: '100%',
    paddingHorizontal: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    position: 'absolute',
    top: -30,
    left: 24,
  },
  actionAreaWrapper: {
    position: 'absolute',
    top: 16,
    right: 24,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 12,
    color: 'gray',
  },
  followCountText: {
    fontSize: 12,
  },
  followLabelText: {
    fontSize: 12,
    color: 'gray',
  },
})

export default UserScreen
