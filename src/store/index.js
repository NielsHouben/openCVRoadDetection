import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      tSpeed: 0,
      aSpeed: 0,
      dupASpeed: 0,
    },
    mutations: {
      tSpeedUpdate (state, value) {
        state.tSpeed = value;
      },
      aSpeedUpdate (state, value) {
        state.aSpeed = value;
      },
      dupASpeedUpdate (state) {
        state.dupASpeed++;
      }
    },
    actions: {
      tSpeedUpdate ({ commit }, value) {
        commit('tSpeedUpdate', value);
      },
      aSpeedUpdate ({ commit }, value) {
        commit('aSpeedUpdate', value);
      },
      dupASpeed ({ commit, root }) {
        commit('dupASpeedUpdate');
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  });

  return Store;
});
