import { useState, useEffect, useRef, useCallback } from 'react'
import { Tweet, buildTweet } from '../../entities/Tweet'
import { db } from '../../repositories/firebase'
import { CloneTweet, buildCloneTweet } from '../../entities/CloneTweet'

export const useIsmTweetsPaginator = (
  per = 10
): [
  (option: { initialize: boolean }) => void,
  { values: CloneTweet[]; loading: boolean; error: firebase.firestore.FirestoreError | null }
] => {
  const admin_uid = process.env.ADMIN_UID
  const [values, setValues] = useState<CloneTweet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)
  const lastSnapshot = useRef<firebase.firestore.DocumentData | null>(null)
  const isFirstFetched = useRef<boolean>(false)
  const isProcessing = useRef<boolean>(false)

  const onInitialize = useCallback(async () => {
    try {
      if (isProcessing.current) return
      isProcessing.current = true
      setLoading(true)
      lastSnapshot.current = null

      const targetsRef  = db.collection('users').doc(admin_uid).collection('tweets').orderBy('createdAt', 'desc')
      const query = targetsRef.limit(per)
      const snapshot = await query.get()
      const targets = snapshot.docs.map((doc) => buildCloneTweet(doc.id, doc.data()))

      if (snapshot.docs.length === per) {
        lastSnapshot.current = snapshot.docs[snapshot.docs.length - 1]
      } else {
        lastSnapshot.current = null
      }

      setValues(targets)
      setLoading(false)
      isFirstFetched.current = true
      isProcessing.current = false
    } catch (e) {
      setError(e)
      setLoading(false)
      isProcessing.current = false
    }
  }, [per])

  const onNext = useCallback(async () => {
    try {
      if (isProcessing.current) return
      if (isFirstFetched.current && !lastSnapshot.current) return
      isProcessing.current = true

      const targetsRef = db.collectionGroup('tweets').orderBy('createdAt', 'desc')
      const query = targetsRef.startAfter(lastSnapshot.current).limit(per)
      const snapshot = await query.get()
      const targets = snapshot.docs.map((doc) => buildCloneTweet(doc.id, doc.data()))

      if (snapshot.docs.length === per) {
        lastSnapshot.current = snapshot.docs[snapshot.docs.length - 1]
      } else {
        lastSnapshot.current = null
      }

      setValues((prev) => [...prev, ...targets])
      isProcessing.current = false
    } catch (e) {
      setError(e)
      setLoading(false)
      isProcessing.current = false
    }
  }, [per])

  const onFetch = useCallback(
    async ({ initialize }: { initialize: boolean }) => {
      if (initialize) {
        await onInitialize()
      } else {
        await onNext()
      }
    },
    [onInitialize, onNext]
  )

  return [onFetch, { values, loading, error }]
}

export const useTweet = (
  uid: string,
  tweetID: string
): [Tweet | null, boolean, firebase.firestore.FirestoreError | null] => {
  const [value, setValue] = useState<Tweet | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)

  useEffect(() => {
    const targetRef = db.collection('users').doc(uid).collection('tweets').doc(tweetID)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setValue(null)
          setLoading(false)
          return
        }

        const targetValue = buildTweet(uid, snapshot.data())
        setValue(targetValue)
        setLoading(false)
      },
      error: (error) => {
        console.warn(error)
        setError(error)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [tweetID, uid])

  return [value, loading, error]
}

