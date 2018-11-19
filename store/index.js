import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  server: []
})

export const mutations = {
  ...firebaseMutations
}

export const actions = {
  setServerRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('server', ref)
  })
}

export const getters = {
  getServer: state => state.server
}
