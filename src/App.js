import React from "react"
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyDSJ5Hl2JOE-Dsw66I42_s8o1otRwu8NDA",
  authDomain: "chatapp-ec49d.firebaseapp.com",
  projectId: "chatapp-ec49d",
  storageBucket: "chatapp-ec49d.appspot.com",
  messagingSenderId: "69071782878",
  appId: "1:69071782878:web:37042a25e499a471aad34f",
  measurementId: "G-5TGH920ZQX"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState(auth)
  return (
    <div className="bg-red-500">
      <header className="">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
