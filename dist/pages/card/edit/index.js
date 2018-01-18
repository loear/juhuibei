import api from '../../../api/api_v1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    vertical: false,
    bride_name: '',
    bride_phone: '',
    bridegroom_name: '',
    bridegroom_phone: '',
    date: "2018-5-20",
    time: "12:00",
    latitude: '',
    longitude: '',
    wedding_address: '地图选择',
    cover: {},
    has_video: 0,
    wedding_video: '',
    wedding_video_cover: {},
    tag: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.theme_id);
    this.setData({
      imgUrls: [
        { index: 1},
        { index: 2},
        { index: 3}
      ],
      date: "2018-5-20",
      time: "12:00",
      address: "选择",
    })
    this.editCardInfo(options.card_id);
  },
  editCardInfo: function (card_id) {
    var that = this;
    api.editCardInfo({
      query: {
        card_id: card_id
      },
      success: (res) => {
        if (res.data.res === 0) {
          that.setData({
            bride_name: res.data.data.bride_name,
            bride_phone: res.data.data.bride_phone,
            bridegroom_name: res.data.data.bridegroom_name,
            bridegroom_phone: res.data.data.bridegroom_phone,
            date: res.data.data.date,
            time: res.data.data.time,
            cover: res.data.data.cover,
            wedding_address: res.data.data.wedding_address,
            radioItems: res.data.data.music_list,
            tag: res.data.data.tag
          })
          if (res.data.data.has_video === 1) {
            that.setData({
              has_video: 1,
              wedding_video: res.data.data.wedding_video,
              wedding_video_cover: res.data.data.wedding_video_cover,
            });
          }
          
          console.log(res.data.data);
        }
      }
    })
  },
  previewImage: function(e) {
    console.log(e.target.dataset.url);
    wx.previewImage({
      current: e.target.dataset.url, // 当前显示图片的http链接
      urls: [e.target.dataset.url] // 需要预览的图片http链接列表
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].id == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  playMusic: function(e) {
    wx.playBackgroundAudio({
      dataUrl: e.target.dataset.url,
      title: '背景音乐',
      coverImgUrl: ''
    })
  },
  /**
   * 获取主题模板
   */
  getThemeModule(theme_id) {
    var that = this;
    api.getThemeModule({
      query: {
        theme_id: theme_id
      },
      success: (res) => {
        if (res.data.res === 0) {
          
          console.log(res.data.data.theme_module);
        }
      }
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (ret) {
        console.log('chooseLocation', ret)
        var gourmet_address = ret.address
        var latitude = +ret.latitude //数值
        var longitude = +ret.longitude //数值
        // 前端展示选择的地址标题
        that.setData({
          wedding_address: ret.name,
          latitude: latitude,
          longitude: longitude
        })
      },
      cancel: function () {
        console.log('chooseLocation', '取消了选择');
      }
    })
  },

  chooseImage: function (e) {
    var width = e.target.dataset.img.width;
    var height = e.target.dataset.img.height;
    wx.navigateTo({
      url: '../cut/index?width=' + width + '&height=' + height
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