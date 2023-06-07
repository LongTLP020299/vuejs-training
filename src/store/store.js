import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      displayName: null,
      email: null
    };
  },
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setDisplayName(state, displayName) {
      state.displayName = displayName;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
  getters: {
    getDisplayName(state) {
      return state.displayName;
    },
    getIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    getEmail(state, email) {
      state.email = email;
    }
  }
});

export default store;