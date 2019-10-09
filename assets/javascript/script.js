const places_key = 'AIzaSyD_d7IeC3P6-D6zxivF0UKXFaDzcUSpLzw'
const weather_key = '293d2af700b3172c991c0eea176c15ac'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1VvQndstw_OK8IX6iNE5vT6IU6KIhrwA",
  authDomain: "adventure-time-254203.firebaseapp.com",
  databaseURL: "https://adventure-time-254203.firebaseio.com",
  projectId: "adventure-time-254203",
  storageBucket: "adventure-time-254203.appspot.com",
  messagingSenderId: "1024268930368",
  appId: "1:1024268930368:web:64efbc745a009c3ccbfea5"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

let locationGeometry
let displayName
let uid

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    displayName = user.displayName
    uid = user.uid
    // let email = user.email
    // let emailVerified = user.emailVerified
    // let photoURL = user.photoURL
    // let isAnonymous = user.isAnonymous
    // let providerData = user.providerData
    document.querySelector('#user-name').innerHTML = `<b>${displayName}</b>`
  }
})

document.querySelector('body').addEventListener('click', e => {
  if (e.target.id === 'sign-out') {
    firebase.auth().signOut()
    displayName = ''
    uid = ''
    window.location.href = '../../index.html'
  }
})

document.querySelector('#user-name').innerHTML = displayName ? `<b>${displayName}</b>` : ''

db.collection("favorites")