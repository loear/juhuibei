import { My } from '../my/my-model.js';

var my = new My();

Page({
  data: {
    pageIndex: 1,
    orderArr: [],
    isLoadedAll: false
  },
  onLoad: function () {
    this._loadData();
  },

  onShow: function () {
    
  },

  _loadData: function () {
    var that = this;
    my.getUserInfo((data) => {
      this.setData({
        userInfo: data
      });
    });
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
    if (!this.data.isLoadedAll) {
      this.data.pageIndex++;
      
    }
  },

  /*
   * 提示窗口
   * params:
   * title - {string}标题
   * content - {string}内容
   * flag - {bool}是否跳转到 "我的页面"
   */
  showTips: function (title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
      }
    });
  },

})

