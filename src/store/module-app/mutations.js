export function SET_CRUMBS(state, cs) {
  state.crumbs = cs;
}

export function ADD_CANI(state, c) {
  if (state.canI && state.canI.findIndex((ci) => ci.url === c.url) < 0) {
    state.canI.push({ url: c.url, can: c.can });
  }
}

export function CLEAR_CANI(state) {
  state.canI = [];
}

export function SET_THEME(state, t) {
  state.theme = t;
  localStorage.setItem('theme', t);
}

export function SET_LOCALE(state, l) {
  state.locale = l;

  localStorage.setItem('locale', l);
}
