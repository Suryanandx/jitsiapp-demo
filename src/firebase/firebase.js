import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


export const config = {
   apiKey: "AIzaSyDzuvlPgkvDtKPksLhuDGe1sAAEya-uOL0",
  authDomain: "video-call-meta.firebaseapp.com",
  projectId: "video-call-meta",
  storageBucket: "video-call-meta.appspot.com",
  messagingSenderId: "487754442523",
  appId: "1:487754442523:web:bb01d57532759a647815be"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const storage = app.storage();//storage
export const storageRef = storage.ref()
export const db = app.firestore();
export const database = app.database()
export default app