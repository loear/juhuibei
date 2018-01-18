import api from '../../../api/api_v1.js'
import { Token } from '../../../utils/token.js';
import { Cache } from '../../../utils/cache.js';
var cache = new Cache();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: {
      vip1: {
        name:'黄金会员', 
        price:'29.00', 
        power: [
          '自由制作一份邀请函',
          '持久保存，永恒记念',
          '一键分享群或朋友圈',
          '生成小程序码邀请卡',
          '可使用所有风格模板',
          '90首背景音乐随意选',
          '时时接收获好友祝福',
          '统计出席婚礼的名单',
        ]
      },
      vip2: {
        name: '钻石会员',
        price: '52.00',
        power: [
          '制作不限数量邀请函',
          '持久保存，永恒记念',
          '一键分享群或朋友圈',
          '生成小程序码邀请卡',
          '可使用所有风格模板',
          '90首背景音乐随意选',
          '时时接收获好友祝福',
          '统计出席婚礼的名单',
        ]
      },
      vip3: {
        name: '至尊会员',
        price: '88.00',
        power: [
          '专业精修定制邀请函',
          '持久保存，永恒记念',
          '一键分享群或朋友圈',
          '生成小程序码邀请卡',
          '可使用所有风格模板',
          '90首背景音乐随意选',
          '时时接收获好友祝福',
          '统计出席婚礼的名单',
        ]
      }
    },
    info: {},
    title: '邀请函',
    desc: '个人中心可编辑邀请函',
    order_sn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.vip) this.setData({ info: this.data.card[options.vip] });
    var that = this;
    // var token = wx.getStorageSync('token');
    var token = cache.get('token');
    if (token) {
      this.setData({ token: token })
      console.log('token1', this.data.token);
      this.makeOrder();
    } else {
      var token = new Token();
      token.getTokenFromServer((cb) => {
        that.setData({ token: cb.token })
        console.log('token2', this.data.token);
        that.makeOrder();
      });
    }
  },

  /**
   * 生成订单
   */
  makeOrder: function () {
    var that = this;
    api.placeOrder({
      method: 'post',
      data: {
        products: [
          { product_id: 1, count: 1 }
        ]
      },
      success: (res) => {
        console.log('makeOrder', res.data);
        that.setData({
          order_sn: res.data.order_sn,
          order_id: res.data.order_id
        })
      }
    })
  },
  /**
   * 
   */
  payOrder: function () {
    if (!this.data.order_id) {
      console.log('没有订单号')
      return false;
    }
    var that = this;
    api.getPreOrder({
      method: 'post',
      data: { id: that.data.order_id },
      success: (res) => {
        console.log('getPreOrder', res.data);
        var time_stamp = res.data.timeStamp;
        if (time_stamp) { // 可以支付
          wx.requestPayment({
            'timeStamp': time_stamp.toString(),
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success: function () {
              console.log('success');
              wx.navigateTo({
                url: '/pages/home/index'
              });
            }
          });
        }
      }
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