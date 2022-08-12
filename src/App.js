import React, { useState, useRef } from "react"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

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

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault()
    const {uid} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    })
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <div ref={dummy}> </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>🤿</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved'
  return (
    <div className={messageClass === 'sent' ? 'bg-blue-600' : 'bg-gray-600'}>
      <p>{text}</p>
    </div>
  )
}

export default App;
