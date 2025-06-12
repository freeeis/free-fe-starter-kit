/*
 * @Description: 全局配置文件的默认配置。这些配置可能会被相应的运行环境配置覆盖。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-21 15:22:03
 * @LastEditTime: 2023-05-25 16:55:09
 * @LastEditors: zhiquan
 */

export default {
  siteName: 'FreeEIS',
  backendURL: 'http://127.0.0.1:8000/',
  baseUrl: '/api',
  defaultLocale: 'zh-cn',
  defaultIcon: '',
  defaultImg: '',
  assetsBase: '/sassets',
  imageUrlBase: '/sassets/image/',
  thumbUrlBase: '/sassets/thumb/',
  videoUrlBase: '/sassets/misc/',
  documentUrlBase: '/sassets/docs/',
  zipUrlBase: '/sassets/zip/',
  nanPlaceholder: '/',
  requestWithLocale: false,
  ignoreMock: false,
  checkVersion: false,
  locales: [
    {
      locale: 'zh-cn',
      name: '中文',
      calendar: {
        days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        daysShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        firstDayOfWeek: 0,
      },
    },
    {
      locale: 'en-us',
      name: 'English',
    },
  ],
  i18n: {
    'en-us': {
      error404: 'Sorry, nothing here...',
      goback: 'Go Back',
      okButtonText: 'OK',
      saveButtonText: 'Save',
      cancelButtonText: 'Cancel',
      deleteButtonText: 'Delete',
      notifySaved: 'Saved',
      notifySaveFailed: 'Failed to save!',
      notifyDeleted: 'Deleted',
      notifyDeleteFailed: 'Failed to delete!',
      notifyChanged: 'Changed',
      notifyChangeFailed: 'Failed to change!',
      notifyAdded: 'Added',
      notifyAddFailed: 'Failed to add!',
      notifyNoPermission: 'No permission!',
      notifyEnabled: 'Enabled',
      notifyEnableFailed: 'Failed to enable!',
      inputValidateFailed: 'Form validation failed!',
    },
    'zh-cn': {
      error404: '抱歉，此页面不存在呀...',
      goback: '返回',
      okButtonText: '确定',
      saveButtonText: '保存',
      cancelButtonText: '取消',
      deleteButtonText: '删除',
      notifySaved: '保存成功！',
      notifySaveFailed: '保存失败！',
      notifyDeleted: '删除成功！',
      notifyDeleteFailed: '删除失败！',
      notifyChanged: '修改成功！',
      notifyChangeFailed: '修改失败！',
      notifyAdded: '添加成功！',
      notifyAddFailed: '添加失败！',
      notifyNoPermission: '没有权限操作！',
      notifyEnabled: '激活成功！',
      notifyEnableFailed: '激活失败！',
      inputValidateFailed: '数据校验失败！',
    },
  },
};
