export const state = (): { token: null | string; loggedIn: boolean;name:string} => ({
  token: null,
  loggedIn: false,
  name:""
})

export type State = ReturnType<typeof state>

export const getters = {
  token: (state: State) => state.token,
  auth: (state: State) => state.loggedIn,
  name: (state: State) => state.name,

}

export const mutations = {
  setToken(state: State, token: string) {
    state.token = token
    state.loggedIn = token !== null
  },
  setName(state: State, name: string) {
    state.name = name
    // state.loggedIn = token !== null
  },
}
