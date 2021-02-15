import firebase from 'firebase/app'

type Result = {
    success?: boolean
    error?: any
  }

export const signInWithEmail = async (email: string, password: string): Promise<Result> => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      return {success: true}
    } catch (e) {
      // console.warn(e)
      return { error: e }
    }
  }

export const signUpWithEmail = async (email: string, password: string): Promise<Result> => {
  try {
     await firebase.auth().createUserWithEmailAndPassword(email, password)
     return {success: true}
  } catch (e) {
    // console.warn(e)
    return { error: e }
  }
}
