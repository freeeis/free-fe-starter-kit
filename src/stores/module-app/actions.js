export default {
  clearLoginStatus() {
    this.SET_CRUMBS();
    this.CLEAR_CANI();
    this.SET_THEME();
    this.SET_LOCALE();
  },

  SET_CRUMBS(cs) {
    this.crumbs = cs || '';
  },

  ADD_CANI(c) {
    if (this.canI && this.canI.findIndex((ci) => ci.url === c.url) < 0) {
      this.canI.push({
        url: c.url,
        can: c.can
      });
    }
  },

  CLEAR_CANI() {
    this.canI = [];
  },

  SET_THEME(t) {
    this.theme = t || '';
    localStorage.setItem('theme', t || '');
  },

  SET_LOCALE(l) {
    this.locale = l || '';

    localStorage.setItem('locale', l || '');
  },

}
