import { requests } from 'boot/axios';
import Store from '@/store';
const store = Store();

export function canI (url) {
  if (store && store.state.app.canI) {
    const storedCanI = store.state.app.canI.find((ci) => ci && ci.url === url);
    if (storedCanI && typeof storedCanI.can !== 'undefined') {
      return new Promise(((resolve) => {
        resolve(!!storedCanI.can);
      }));
    }
  }

  return requests.postRequest('can_i', { url }).then((d) => {
    let can = d && d.data && d.data.can;
    const urlList = url.split(',');
    can = Array.isArray(can) ? can : [can];

    for (let i = 0; i < urlList.length; i += 1) {
      const u = urlList[i];

      store.commit('app/ADD_CANI', { url: u, can: (can[i] || false) });
    }

    if (can.length === 1) return can[0];

    return can;
  }).catch(() => false);
}
