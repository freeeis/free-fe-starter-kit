<template>
  <div>
    <mourning></mourning>
    <q-layout view="hhh lpr fff" class="admin-layout" @scroll="scrollTop = $event.position;">
      <q-header class="print-hide">
        <div class="header-inner full-width bg-primary">
          <q-toolbar class="admin-main-toolbar">
            <q-toolbar-title class="cursor-pointer" @click="toPortal">
              <q-img class="logo" src="icons/icon-128x128.png" width="40px" height="40px"></q-img>
              {{ $t(ctx.config.siteName) }}
            </q-toolbar-title>

            <q-space></q-space>

            <theme-switch reload></theme-switch>

            <select-locales></select-locales>

            <q-btn flat class="user-profile-btn">
              <q-avatar>
                <q-img v-if="userAvatar?.id" :src="$filter('serverImage', userAvatar?.id || userAvatar)" round></q-img>
                <q-img v-else :src="userAvatar" round></q-img>
              </q-avatar>
              <span class="user-name ellipsis q-ml-md">
                {{ userName }}
                <div class="date-label">{{ $filter('normalDate', new Date()) }}</div>
              </span>
              <e-icon class="user-profile-menu-icon"
                :name="ucMenuShown ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"></e-icon>
              <q-menu content-class="user-profile-menu" fit @input="ucMenuChanged">
                <q-list style="min-width: 191px">
                  <q-item>
                    <q-item-section>
                      <q-btn class="logout-btn" flat :label="$t('LOGOUT')" v-close-popup @click="logoutClicked" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
        </div>
      </q-header>

      <q-page-container>
        <q-page class="admin-page row q-pa-md">
          <div class="leveled-menu-wrapper">
            <leveled-menus :menus="menus" group="top"
              :showIcon="true" class="admin-menu col print-hide">
            </leveled-menus>
          </div>
          <div class="col admin-main-content-wrapper">
            <bread-crumbs
              class="admin-main-bread-crumbs print-hide q-mb-md"></bread-crumbs>
            <router-view class="admin-page-router-view" style="height: calc(100% - 60px);" />
          </div>
        </q-page>
      </q-page-container>

      <q-footer class="row backend-footer">
        <div class="row full-width justify-center items-center">
          <div>{{ $t('服务平台后台管理') }}</div>
          <div class="q-mx-md">© 2022-{{ (new Date()).getFullYear() }}</div>
          <div class="cursor-pointer" @click="toICP">{{ ICP }}</div>
        </div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { mapStores } from 'pinia';
import useAppStore from '@/stores/app.js';
import { useObjectData, objectDataProps } from 'free-fe-core-modules/composible/useObjectData.js';

export default defineComponent({
  name: 'WebLayout',
  components: {
  },
  props: {
    ...objectDataProps,
    Logout: {
      type: Function,
    },
  },
  meta: {
    title: '服务平台',
  },
  setup(props, ctx) {
    const {
      data,
      refreshData,
    } = useObjectData(props, ctx);
    const router = useRouter();

    return {
      data,
      refreshData,
      router,
    };
  },
  data() {
    return {
      ucMenuShown: false,
      menus: [],
      scrollTop: 0,
      contactInfo: {},
      ICP: '京ICP备xxxxxxxx号',
    };
  },
  created() {
  },
  computed: {
    ...mapStores(useAppStore),
    userName() {
      return this.ctx.modules.account.store().user?.Name || this.$t('未知用户');
    },

    userAvatar() {
      if (!this.ctx.modules.account.store().user) return '';

      const {
        Avatar,
      } = this.ctx.modules.account.store().user;

      if (Avatar) {
        return Avatar[0] || Avatar;
      }

      if (this.ctx.modules.account.store().user.role) {
        return `admin/${this.ctx.modules.account.store().user.role}`;
      }

      return 'icons/icon-128x128.png';
    },
  },
  beforeCreate() {
    this.getRequest('/menu/menus', { category: '后台主菜单' }).then((d) => {
      if (d && d.msg === 'OK' && d.data.menus) {
        this.menus = d.data.menus;
      }
    });
  },
  methods: {
    fieldChanged(f) {
      if  (this.changedFields.indexOf(f.Name) < 0) {
        this.changedFields.push(f.Name);
      }

      Object.setValue(this.changedData, f.Name, Object.nestValue(this.myData, f.Name));
    },
    toPortal() {
      // window.open('/', '_self');
      this.router.push('/')
    },
    ucMenuChanged(s) {
      this.ucMenuShown = s;
    },
    logoutClicked() {
      if (this.Logout) {
        this.Logout();
      } else {
        this.getModule('account')
          .utils.logout()
          .then(() => {
            // clear info to store
            this.ctx.modules.account.store().clearLoginStatus();
            this.router.replace('/');
          });
      }
    },
    showNotifyDialog(options, func, errFunc) {
      this.$MsgDialog({ type: '', ...options })
        .then(() => {
          if (func && typeof func === 'function') {
            func();
          }
        })
        .catch(errFunc || (() => {}));
    },
    toICP() {
      this.showNotifyDialog();
      // window.open('https://beian.miit.gov.cn');
    },
  },
  beforeUnmount() {
    this.appStore.SET_CRUMBS(undefined);
  },
});
</script>

<style lang="scss" scoped>
.admin-layout {
  background: $bodyBackground;
  position: absolute;
  min-width: $contentMinWidth;

  .header-inner {
    &>div {
      max-width: $contentMaxWidth;
      margin: 0 auto;
    }
  }

  .admin-page {
    min-width: $contentMinWidth;
    max-width: $contentMaxWidth;
    margin: 0 auto;
  }

  .user-profile-menu-icon {
    font-size: 16px;
  }

  .leveled-menu-wrapper {
    min-width: 180px;
  }

  .backend-footer {
    height: 60px;
  }
}
</style>
