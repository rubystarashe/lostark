import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  server: null,
  serverStatus: false,
  updated: null
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
  }),
  setUpdatedRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('updated', ref)
  })
}

export const getters = {
  getServer: state => (state.server || [])['.value'],
  getServerStatus: state => state.serverStatus['.value'],
  getUpdated: state => (state.updated || [])['.value']
}
