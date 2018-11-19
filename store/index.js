import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  server: null,
  serverStatus: false
})

export const mutations = {
  ...firebaseMutations
}

export const actions = {
  setServerRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('server', ref)
  }),
  setServerStatusRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('serverStatus', ref)
  })
}

export const getters = {
  getServer: state => state.server['.value'],
  getServerStatus: state => state.serverStatus['.value']
}
