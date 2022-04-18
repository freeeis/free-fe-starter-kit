export function clearLoginStatus({ commit }) {
  commit('SET_CRUMBS', '');
  commit('CLEAR_CANI');
  commit('SET_THEME', '');
  commit('SET_LOCALE', '');
}
