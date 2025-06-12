<template>
  <div class="login-wrapper absolute-center" :class="tab">
    <div class="login-title full-width row items-center justify-center no-wrap text-white text-center">
      <div class="icon q-mr-sm">
        <q-img src="/icons/icon-128x128.png" width="60px" height="60px"></q-img>
      </div>
      <div class="title">
        {{ ctx.config?.siteName }}
      </div>
    </div>
    <div class="login-form-wrapper q-px-lg q-py-md">
      <q-tabs
        v-if="tab !== 'recover'"
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        narrow-indicator
      >
        <q-tab class="login-type-tab" name="login" :label="$t('账号登录')" />
        <q-tab class="login-type-tab" name="register" :label="$t('验证码登录')" />
      </q-tabs>

      <q-tab-panels class="tab_panels" v-model="tab" animated>
        <q-tab-panel name="login">
          <div class="form_content">
            <div
              v-if="failed"
              class="log-failed-error text-negative q-mb-md">{{$t('账号、密码或验证码错误！')}}</div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
              <q-input
                outlined
                v-model="mobile"
                :placeholder="$t('账号/手机号/邮箱')"
                autocomplete="username"
                :rules="[(val => !!val || $t('请输入账号、手机号或邮箱'))]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input
                outlined
                :type="isPwd1 ? 'password' : 'new-password'"
                v-model="pwd"
                autocomplete="current-password"
                :placeholder="$t('密码')"
                :rules="[(val) => !!val || $t('请输入密码')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" size="20px" />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-mr-sm"
                    @click="isPwd1 = !isPwd1"
                  />
                </template>
              </q-input>

              <q-input
                outlined
                v-model="captcha"
                :placeholder="$t('图形验证码')"
                :rules="[(val) => !!val || $t('请输入图形验证码')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="grain" size="20px" />
                </template>
                <template v-slot:after>
                  <captcha ref="captcha" class="captcha" @change="changeCaptcha"></captcha>
                </template>
              </q-input>

              <div class="row">
                <q-btn
                  flat
                  class="login-btn col login bg-primary text-white"
                  :label="$t('登录')"
                  type="submit"
                />
              </div>

              <div class="form-actions row items-center justify-around text-grey-8 q-mt-md">
                <div @click="tab='register'">去注册</div>
                <div @click="tab='recover'">修改密码</div>
              </div>
            </q-form>
          </div>
        </q-tab-panel>

        <q-tab-panel name="register">
          <div class="form_content">
            <div
              v-if="failed"
              class="log-failed-error text-negative q-mb-md">{{$t('账号、密码或验证码错误！')}}</div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
              <q-input
                ref="mobile"
                outlined
                v-model="mobile"
                :placeholder="$t('手机号')"
                autocomplete="username"
                :rules="[phoneOrEmailValidator]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-mobile" size="18px" />
                </template>
              </q-input>
              <q-input
                outlined
                v-model="code"
                :placeholder="$t('验证码')"
                autocomplete="new-password"
                :rules="[(val) => !!val || $t('请输入验证码')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" size="20px" />
                </template>
                <template v-slot:after>
                  <q-btn class="btn_mess" flat
                    dense
                    :disabled="loading || !!codeCounterLeft"
                    :label="codeCounterLeft ? `${codeCounterLeft}s` : $t('获取验证码')"
                    @click="sendVerificationCode" >
                    <counter ref="codeCounter"
                      :counts="60"
                      @change="codeCounterLeft = $event"
                      @clear="codeCounterLeft=''"></counter>
                  </q-btn>
                  <!-- <q-btn
                    flat
                    class="btn_mess" bense
                    :label="$t('获取验证码')" @click="sendVerificationCode"/> -->
                </template>
              </q-input>

              <q-input
                outlined
                v-model="captcha"
                :placeholder="$t('图形验证码')"
                autocomplete="new-password"
                :rules="[(val) => !!val || $t('请输入图形验证码')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="grain" size="20px" />
                </template>
                <template v-slot:after>
                  <captcha ref="captcha" class="captcha" @change="changeCaptcha"></captcha>
                </template>
              </q-input>

              <!-- <q-input
                outlined
                v-model="inviteCode"
                :placeholder="$t('申请码')"
                autocomplete="new-password"
                :dense="dense"
                style="padding-bottom: 20px;"
              >
                <template v-slot:prepend>
                  <q-icon name="workspace_premium" size="20px" />
                </template>
              </q-input> -->

              <div class="row">
                <q-btn
                  flat
                  class="login-btn col login bg-primary text-white"
                  :label="$t('登录或注册')"
                  type="submit"
                />
              </div>

              <div class="form-actions row items-center justify-around text-grey-8 q-mt-md">
                <div @click="tab='login'">去登录</div>
                <div @click="tab='recover'">修改密码</div>
              </div>
            </q-form>
          </div>
        </q-tab-panel>

        <q-tab-panel name="recover">
          <div class="form_content">
            <q-form @submit="onRecover" @reset="onReset" class="q-gutter-xs">
              <q-input
                ref="mobile"
                outlined
                v-model="mobile"
                :placeholder="$t('手机号/邮箱')"
                autocomplete="username"
                :rules="[(val) => !!val || $t('请输入手机号或邮箱')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-mobile" size="18px" />
                </template>
              </q-input>
              <q-input
                outlined
                v-model="code"
                :placeholder="$t('验证码')"
                autocomplete="new-password"
                :rules="[(val) => !!val || $t('请输入验证码')]"
                :dense="dense"
                :max-length="6"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" size="20px" />
                </template>
                <template v-slot:after>
                  <q-btn class="btn_mess" flat
                    dense
                    :disabled="loading || !!codeCounterLeft"
                    :label="codeCounterLeft ? `${codeCounterLeft}s` : $t('获取验证码')"
                    @click="sendVerificationCode" >
                    <counter ref="codeCounter"
                      :counts="60"
                      @change="codeCounterLeft = $event"
                      @clear="codeCounterLeft=''"></counter>
                  </q-btn>
                  <!-- <q-btn
                    flat
                    class="btn_mess" bense
                    :label="$t('获取验证码')" @click="sendVerificationCode"/> -->
                </template>
              </q-input>
              <q-input
                outlined
                v-model="captcha"
                :placeholder="$t('图形验证码')"
                autocomplete="new-password"
                :rules="[(val) => !!val || $t('请输入图形验证码')]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="grain" size="20px" />
                </template>
                <template v-slot:after>
                  <captcha ref="captcha" class="captcha" @change="changeCaptcha"></captcha>
                </template>
              </q-input>

              <q-input
                outlined
                :type="isPwd1 ? 'password' : 'new-password'"
                v-model="pwd"
                autocomplete="new-password"
                :placeholder="$t('密码')"
                :rules="[
                  (val) => validatorPwd3(val) || '密码长度在6-16位，必须包含数字、大写字母、小写字母、特殊字符'
                ]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" size="20px" />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-mr-sm"
                    @click="isPwd1 = !isPwd1"
                  />
                </template>
              </q-input>

              <q-input
                outlined
                :type="isPwd2 ? 'password' : 'new-password'"
                v-model="pwd2"
                autocomplete="new-password"
                :placeholder="$t('确认密码')"
                :rules="[
                  ((val) => val === pwd || $t('两次输入密码不一致'))]"
                :dense="dense"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" size="20px" />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-mr-sm"
                    @click="isPwd1 = !isPwd1"
                  />
                </template>
              </q-input>

              <div class="row">
                <q-btn
                  flat
                  class="login-btn col login bg-primary text-white"
                  :label="$t('重置密码')"
                  type="submit"
                />
              </div>

              <div class="form-actions row items-center justify-around text-grey-8 q-mt-md">
                <div @click="tab='login'">去登录</div>
                <div @click="tab='register'">去注册</div>
              </div>
            </q-form>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
// import store from '@/store';
import captcha from '../../components/captcha.vue';
import counter from '../../components/counter.js';
import useAppStore from '@/stores/app';

export default {
  name: 'LoginPage',
  props: {
    dense: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
      mobile: '',
      pwd: null,
      isPwd1: true,
      code: '',
      codeCounterLeft: '',
      accept: false,
      tab: 'login',
      captcha: '',
      captchaId: '',
      failed: false,

      pwd2: '',
      isPwd2: true,

      // inviteCode: '',
    };
  },
  computed: {
    validatorPwd3() {
      return this.ctx.modules['core-modules'].validators.validatorPwd3;
    },
    userName() {
      const accountStore = this.ctx.modules.account.store();
      if (accountStore.user
        && accountStore.user.Name) {
        return accountStore.user.Name;
      }

      return undefined;
    },
  },
  components: {
    captcha,
    counter,
  },
  watch: {
    tab() {
      this.pwd = '';
      this.mobile = '';
      this.captcha = '';
      this.accept = false;
      this.failed = false;
    },
  },
  methods: {
    phoneOrEmailValidator(d) {
      return this.ctx.modules['core-modules'].validators.validatorPhoneOrEmail(d);
    },
    sendVerificationCode() {
      if (!this.$refs.mobile.validate()) {
        return;
      }

      if (!this.mobile || !this.ctx.modules.account) return;

      this.loading = true;

      this.ctx.modules.account.utils
        .sendCode(this.mobile, {
          register: 'login',
          recover: 'recover',
        }[this.tab] || 'login', this.tab === 'register' ? undefined : true)
        .then((d) => {
          this.loading = false;
          if (d && d.msg === 'OK') {
            this.$q.notify(this.$t('notifyCodeSent'));
            this.$refs.codeCounter.start();
          } else {
            // this.$q.notify(this.$t('notifyCodeSendFailed'));
            this.loading = false;
          }
        })
        .catch(() => {
          // this.$q.notify(this.$t('notifyCodeSendFailed'));
          this.loading = false;
        });
    },
    onRegister() {},
    changeCaptcha(cid) {
      this.captchaId = cid;
    },
    onSubmit() {
      if (!this.mobile || (!this.pwd && !this.code) || !this.ctx.modules.account) return;

      this.loading = true;

      this.ctx.modules.account.utils
        .login(this.mobile, this.pwd || this.code, {
          // invite: this.inviteCode || undefined,
          captcha: {
            captcha: this.captcha,
            id: this.captchaId,
          },
        })
        .then((d) => {
          this.loading = false;
          if (d && d.msg === 'OK') {
            // set info to store
            const data = (d && d.data) || {};
            const accountStore = this.ctx.modules.account.store();
            accountStore.SET_USER(data);

            // clear cached canI list
            const appStore = useAppStore();
            appStore.CLEAR_CANI();

            if (data.llt || data.llf) {
              let { llt } = data;

              if (llt) {
                llt = new Date(llt).toLocaleString();
              }

              this.$q.notify({
                message: `
                <div class="text-left" style="">
                  <p>${this.$t('上次登录时间')}: ${llt || this.$t('未知')}</p>
                  <p>${this.$t('上次登录后失败次数')}: <span style="color:${data.llf ? 'red' : ''}">${data.llf || 0}</span></p>
                </div>`,
                timeout: 5000,
                html: true,
              });
            }

            this.$router.replace(this.$route.query.redirect || '/admin');
          } else {
            // this.$q.notify(this.$t('notifyLoginFailed'));

            this.$refs.captcha.refresh();
            this.failed = true;
          }
        })
        .catch(() => {
          // this.$q.notify(this.$t('notifyLoginFailed'));
          this.$refs.captcha.refresh();
          this.failed = true;
          this.loading = false;
        });
    },

    onRecover() {
      if (!this.mobile || (!this.pwd && !this.code) || !this.ctx.modules.account) return;

      this.loading = true;

      this.ctx.modules.account.utils
        .recover(this.mobile, this.code, this.pwd, {
          captcha: {
            captcha: this.captcha,
            id: this.captchaId,
          },
        })
        .then((d) => {
          if (d && d.msg === 'OK') {
            this.$q.notify(this.$t('notifyRecover'));
            this.tab = 'login';
          } else {
            this.$refs.captcha.refresh();
            this.failed = true;
          }
          this.loading = false;
        })
        .catch(() => {
          this.$refs.captcha.refresh();
          this.failed = true;
          this.loading = false;
        });
    },

    onReset() {
      this.name = '';
      this.pwd = '';
      this.accept = false;
      this.failed = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-type-tab {
  ::v-deep(.q-tab__label) {
    font-size: 1rem !important;
  }
}

.login-wrapper {
  box-shadow: 0px 0px 80px 10px rgba(0, 0, 0, 0.3);

  border-radius: 10px;
  text-align: center;

  width: 500px;
  height: 500px;

  @keyframes shining-title {
    0% {
      background-position: top left;
    }

    50% {
      background-position: top right;
    }

    100% {
      background-position: top left;
    }
  }

  .login-title .title {
    background: #18859588 -webkit-gradient(linear, left top, right top, from(#18859533), to(#18859588), color-stop(0.5, $primary)) 0 0 no-repeat;
    background-size: 125px;
    background-clip: text;
    color: rgba(255, 255, 255, 0.1);

    animation-name: shining-title;
    animation-duration: 5s;
    animation-iteration-count: infinite;

    font-family: 'PMZDBiaoTi-regular';
    font-size: 2rem;
  }

  .tab_panels {
    border-radius: 6px;
    background-color: #FFFFFF00;

    .form_content {
      & * {
        color: #F0F0F0;
      }

      :deep(.q-field__control) {
        &::before {
          border: 1px solid rgba(255,255,255,0.24);
        }
      }
    }
  }

  &.register {
    height: 500px;
  }

  &.recover {
    height: 580px;
  }

  ::v-deep(.q-field__bottom) {
    padding-top: 5px;
  }
}

.login-form-wrapper {
  .login-form-title {
    color: $primary;
    font-size: 1.75rem;
    text-align: center;

    & * {
      font-family: PMZDBiaoTi-regular;
    }
  }

  .captcha {
    background-color: #FFFFFF66;
    width: 105px;
    height: 40px;
    margin-left: 4px;
    width: 135px;
    height: 48px;
    border-radius: 10px;
    margin-top: 3px;
  }
  .btn_mess {
    width: 105px;
    height: 40px;
    color: white;

    width: 135px;
    height: 50px;
    opacity: 0.9;
    border-radius: 10px;
    background-color: $primary;
    margin-top: 3px;
  }
  .login-btn {
    width: 420px;
    height: 50px;
    line-height: 20px;
    border-radius: 10px;
    background-color: $primary;
    color: rgba(16, 16, 16, 1);
    font-size: 1rem;
    text-align: center;
    font-family: Roboto;
  }

  .form-actions {
    font-size: 0.8rem;
    text-decoration: underline;

    div {
      cursor: pointer;
      color: $primary;
    }
  }
}
</style>
