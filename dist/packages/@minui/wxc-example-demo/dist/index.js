'use strict';
import api from '../../../../api/api_v1.js';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    title: {
      type: String,
      value: '示例标题'
    },
    desc: {
      type: String,
      value: '示例描述'
    },
    source: {
      type: String,
      value: ''
    },
    countdown: {
      type: String,
      value: '36000'
    },
    coming: {
      type: String,
      value: '32'
    },
    image_url: {
      type: String,
      value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512148641006&di=e7a13a0de94a5a48ff8d8b5610b5dbf5&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F94cad1c8a786c9179b36ab05c23d70cf3bc757d1.jpg'
    },
    avatar: {
      type: Array,
      value: []
    },
    latitude: {
      type: String,
      value: ''
    },
    longitude: {
      type: String,
      value: ''
    },
    uid:{
      type: String,
      value: ''
    }
  },
  data: {
    viewSourceClass: 'source-isclose',
    isExpandSource: false
  },
  methods: {
    bindViewSourceEvent: function bindViewSourceEvent() {
      this.setData({
        isExpandSource: !this.data.isExpandSource
      });
    },
    showDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog');
      dialogComponent && dialogComponent.show();
    },
    hideDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog');
      dialogComponent && dialogComponent.hide();
    },
    onConfirm: function (e) {

      this.hideDialog();
    },
    onCancel() {
      console.log('点击了取消按钮');
      this.hideDialog();
    },
    submitForm: function (e) {
      console.log(e);
      var that = this;
      api.saveUserComing({
        method: 'post',
        data: {
          form_id: e.detail.formId,
          user_id: e.detail.target.dataset.uid,
          activity_id: e.detail.target.dataset.activity_id,
          username: e.detail.value.username,
          phone: e.detail.value.phone
        },
        success: (res) => {
          console.log('onConfirm', res)
          if (res.data.res === 0) {
            wx.showToast({
              title: '报名成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                wx.reLaunch({
                  url: '/pages/activity-detail/index?activity_id=' + e.detail.target.dataset.activity_id
                })
              }
            });
          }
        }
      })
      this.hideDialog();
    },
  },
  attached: function attached() {}
});
