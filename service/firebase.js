import * as firebase from 'firebase'
import 'firebase/firestore'
// const firebase = require('firebase')
// const firestore = require ('firebase/firestore')

firebase.initializeApp({
  apiKey: 'AIzaSyAYI6g6LhzhqAQVnRxCyzoz_N-aWVh45xw',
  authDomain: 'peeph-wedding.firebaseapp.com',
  // databaseURL: 'https://pgoshcooks.firebaseio.com',
  projectId: 'peeph-wedding'
  // storageBucket: 'pgoshcooks.appspot.com',
  // messagingSenderId: '918920855224'
})

export default {
  db: firebase.firestore()
}
