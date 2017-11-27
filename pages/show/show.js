// import weSwiper from '../../src/main'
import weSwiper from '../../dist/weSwiper'
import { Token } from '../../utils/token.js';
var token = new Token();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  touchstart: function(e) {
    this.weswiper.touchstart(e)
  },
  touchmove: function(e) {
    this.weswiper.touchmove(e)
  },
  touchend: function(e) {
    this.weswiper.touchend(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'id': options.id,
      'title':options.title
    });
    this._onLoad();
    this._login();    
  },
  _login: function () {
    var that = this;
    token.getTokenFromServer((token) => {
      this.setData({
        'openid': token
      });
    });
  },
  _onLoad: (options) => {
    const device = wx.getSystemInfoSync()
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: 3,
      initialSlide: 0,
      /**
       * swiper初始化后执行
       * @param swiper
       */
      onInit(weswiper) {

      },
      /**
       * 手指碰触slide时执行
       * @param swiper
       * @param event
       */
      onTouchStart(weswiper, event) {

      },
      /**
       * 手指碰触slide并且滑动时执行
       * @param swiper
       * @param event
       */
      onTouchMove(weswiper, event) {

      },
      /**
       * 手指离开slide时执行
       * @param swiper
       * @param event
       */
      onTouchEnd(weswiper, event) {

      },
      /**
       *  slide达到过渡条件时执行
       */
      onSlideChangeStart(weswiper) {

      },
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {

      },
      /**
       *  过渡时触发
       */
      onTransitionStart(weswiper) {

      },
      /**
       *  过渡结束时执行
       */
      onTransitionEnd(weswiper) {

      },
      /**
       *  手指触碰swiper并且拖动slide时执行
       */
      onSlideMove(weswiper) {

      },
      /**
       * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
       */
      onSlideNextStart(weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
       */
      onSlideNextEnd(weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
       */
      onSlidePrevStart(swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
       */
      onSlidePrevEnd(weswiper) {

      }
    });
  } 
  ,

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