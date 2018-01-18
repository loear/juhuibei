import api from '../../../api/api_v1.js'
import { $wuxToast } from '../../../packages/@wux/components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themes: [],
    choose_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getThemeList();
  },

  getThemeList: function () {
    var that = this;
    api.getThemeList({
      success: (res) => {
        console.log('getThemeList', res.data.data);
        if (res.data.res === 0) {
          that.setData({
            themes: res.data.data
          })
        }
      }
    })
  },

  radioChange: function (e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var themes = this.data.themes;
    for (var i = 0, len = themes.length; i < len; ++i) {
      themes[i].checked = themes[i].id == e.detail.value;
      if ( themes[i].checked ) {
        that.setData({ choose_id: themes[i].id })
      }
    }
    this.setData({
      themes: themes
    });
  },
  themePreview: function () {
    if (this.data.choose_id === 0) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请先选择好主题哦',
        success: () => console.log('请先选择好主题哦')
      })
      return false;
    }
    var url = 'https://www.juhuibei.com/card/' + this.data.choose_id
    wx.navigateTo({
      url: '../view/index?url=' + url,
    })
  },
  makeCard: function () {
    if (this.data.choose_id === 0) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请先选择好主题哦',
        success: () => console.log('请先选择好主题哦')
      })
      return false;
    }
    wx.navigateTo({
      url: '../../order/index?theme_id=' + this.data.choose_id + '&vip=' + 'vip1',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})