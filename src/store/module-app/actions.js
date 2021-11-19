export function clearLoginStatus({ commit }) {
  commit('SET_CRUMBS', '');
  commit('CLEAR_CANI');
}
