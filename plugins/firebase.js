import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'

const config = require('~/firebase_config.json')

const serviceAccount = require('~/serviceAccountKey.json')

firebase.initializeApp({ ...config, ...serviceAccount })
const db = firebase.database()

Vue.prototype.db = db
Vue.db = db

export default ({store}) => {
  store.dispatch('setServerRef', db.ref('lostark/queue/'))
  store.dispatch('setServerStatusRef', db.ref('lostark/status/'))
  store.dispatch('setUpdatedRef', db.ref('lostark/updated/'))
}
