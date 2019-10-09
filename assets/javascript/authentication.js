firebase.auth().signOut()
document.querySelector('#user-name').innerHTML = ''
// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth())

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '../../location.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '#',
  // Privacy policy url.
  privacyPolicyUrl: '#'
}

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig)