import moment from 'moment';

export default {
  config: {
    dependencies: [
      'account',
      'core-modules',
      'portal',
      'themes',
    ],
  },
  routers: [
    {
      ref: 'portal>portal',
    },

    // 这里可以使用account模块中的登录组件，比较简单
    // {
    //   path: '/login',
    //   ref: 'account>login'
    // },

    // 也可以参考如下自定义的登录组件自行开发登录界面
    {
      path: '/login',
      component: () => import('./view/layoutWrapper.vue'),
      props: {
        bg: new URL('./assets/login_bg.jpg', import.meta.url).href,
      },
      children: [
        {
          path: '',
          components: {
            default: () => import('./view/accountEntry/login.vue'),
          },
        },
      ],
    },
    {
      path: '/register',
      ref: 'account>register',
    },
    {
      path: '/recover',
      ref: 'account>recover',
    },
    {
      path: '/admin',
      component: () => import('./Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('./home.js'),
          meta: [
            {
              title: '首页',
            },
          ],
        },
        {
          path: 'uc/resetpwd',
          ref: 'account>resetpwd',
          meta: [
            {
              title: '用户中心',
            },
            {
              title: '修改密码',
            },
          ],
        },
        {
          path: 'uc/changephone',
          ref: 'account>resetphone',
          meta: [
            {
              title: '用户中心',
            },
            {
              title: '修改手机号',
            },
          ],
        },
        {
          path: 'uc/info',
          ref: 'account>info',
          meta: [
            {
              title: '用户中心',
            },
            {
              title: '账号信息',
            },
          ],
        },
        {
          ref: 'account>org',
          meta: [
            { title: '系统管理' },
            {
              title: '组织机构',
            },
          ],
        },
        {
          path: 'plabel',
          ref: 'account>labels',
          meta: [
            { title: '系统管理' },
            {
              title: '权限标签管理',
            },
          ],
        },
        {
          ref: 'account>account',
          meta: [
            { title: '系统管理' },
            {
              title: '账号管理',
            },
          ],
        },
        {
          ref: 'account>perm',
          meta: [{ title: '权限管理' }],
        },
        {
          ref: 'core-modules>dict',
          meta: [
            { title: '系统管理' },
            {
              title: '字典管理',
            },
          ],
        },
        {
          path: 'config',
          ref: 'core-modules>system',
          meta: [
            { title: '系统管理' },
            {
              title: '系统设置',
            },
          ],
        },
        {
          ref: 'core-modules>menu',
          meta: [
            { title: '系统管理' },
            {
              title: '菜单管理',
            },
          ],
        },
        {
          ref: 'core-modules>errcode',
          meta: [{ title: '错误代码管理' }],
        },
      ],
    },
  ],
  filters: {
    normalDate: {
      description: 'format the given date to normal date string',
      func: (d) => {
        return new moment(d).format('YYYY-MM-DD');
      }
    }
  },
}
