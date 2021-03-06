import React from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import Separator from '../../components/atoms/separator'
import TweetCard from './tweetCard'

// TweetListItem
// -------------------------
type TweetListItemProps = {
  tweetID: string
  writerUID: string
  onPressCard?: (uid: string, tweetID: string) => void
  onPressAvatar?: (uid: string) => void
}

const TweetListItem = ({ tweetID, writerUID, onPressCard, onPressAvatar }: TweetListItemProps) => {
  return (
    <TweetCard
      tweetID={tweetID}
      writerUID={writerUID}
      onPressCard={() => onPressCard(writerUID, tweetID)}
      onPressAvatar={() => onPressAvatar(writerUID)}
    />
  )
}

// ListEmptyComponent
// -------------------------
const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>投稿が見つかりません</Text>
    </View>
  )
}

// UserList
// -------------------------
type TweetListProps = {
  data: { tweetID: string; writerUID: string }[]
  refreshing: boolean
  onRefresh: () => void
  onEndReached: () => void
  onPressCard?: (uid: string, tweetID: string) => void
  onPressAvatar?: (uid: string) => void
}

const TweetList = ({ data, refreshing, onRefresh, onEndReached, onPressCard, onPressAvatar }: TweetListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.tweetID}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => (
        <TweetListItem
          tweetID={item.tweetID} 
          writerUID={item.writerUID}
          onPressCard={onPressCard}
          onPressAvatar={onPressAvatar}
        />
      )}
      ListEmptyComponent={<ListEmptyComponent />}
    />
  )
}

const styles = StyleSheet.create({
  emptyWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
  },
})

export default TweetList