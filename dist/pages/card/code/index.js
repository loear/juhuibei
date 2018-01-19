import api from '../../../api/api_v1.js';
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    src: '',
  },
  url: '',
  temp: [],
  width: '',

  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.width = res.screenWidth;
        that.setData({ height: res.screenHeight })
      },
    })
    this.wxCode();
  },

  wxCode: function () {
    var that = this;
    api.wxCode({
      data: {
        scene: 'a=2&b=3',
        page: 'pages/home/index',
        width: 200,
        auto_color: 1
      },
      // data: {
      //   path: 'pages/home/index',
      //   width: 200,
      //   auto_color: 1
      // },
      success: (res) => {
        console.log('wxCode', res);
        
        that.setData({ src: res.data })
        
      }
    })
  },

  getImage: function () {
    console.log(this.data.height)
    let that = this;
    wx.downloadFile({
      url: 'https://www.juhuibei.com/images/catalogue.jpg', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容       
        // console.log(res)
        if (res.statusCode === 200) {
          that.url = res.tempFilePath
        }
      }
    });
  },
  setCanvas: function () {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(this.data.src, 0, 0, this.width, this.data.height)
    ctx.setFontSize(20)
    ctx.fillText('文字在这里！！！文字在这里！！！', 0, 300)
    ctx.fillText('文字在这里！！！', 100, 400)
    ctx.draw();
  },
  generateImage: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.width,
      height: this.data.height,
      destWidth: that.width,
      destHeight: this.data.height,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        that.temp[0] = res.tempFilePath;
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  preview: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: this.temp
    })
  },
})