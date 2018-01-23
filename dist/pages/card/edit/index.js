import api from '../../../api/api_v1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      indicatorDots: true,  // 是否显示面板指示点
      autoplay: false,      // 是否自动切换
      interval: 5000,       // 自动切换时间间隔
      duration: 500,        // 滑动动画时长
      vertical: false,      // 滑动方向是否为纵向
    },
    form: {
      bride_name: '',         // 新娘姓名
      bride_phone: '',        // 新娘手机
      bridegroom_name: '',    // 新郎姓名
      bridegroom_phone: '',   // 新郎手机
      date: "2018-5-20",      // 婚礼日期
      time: "12:00",          // 婚礼时间
      latitude: '',           // 纬度
      longitude: '',          // 经度
      wedding_address: '选择',// 婚礼地址
      cover: {},              // cover页小图
      has_video: 0,           // 是否有视频
      wedding_video: '',      // 视频地址
      wedding_video_cover: {},// 视频截图
      music_id: 0,            // 背景音乐
    },
    music_list: [],
    tag: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let that = this;
    api.editCardInfo({
      query: {
        card_id: card_id
      },
      success: (res) => {
        console.log('editCardInfo', res.data.data);
        if (res.data.res === 0) {         
          that.setData({
            form: res.data.data.form,
            music_list: res.data.data.music_list,
            tag: res.data.data.tag
          });
        }
      }
    })
  },

  /**
   * 预览图片
   */
  previewImage: function(e) {
    wx.previewImage({
      current: e.target.dataset.url, // 当前显示图片的http链接
      urls: [e.target.dataset.url] // 需要预览的图片http链接列表
    })
  },

  /**
   * 切换 音乐
   */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.data.form.music_id = e.detail.value;
    let music_list = this.data.music_list;
    for (let i = 0, len = music_list.length; i < len; ++i) {
      music_list[i].checked = music_list[i].id == e.detail.value;
    }
    this.setData({ music_list: music_list });
  },

  playMusic: function(e) {
    wx.playBackgroundAudio({
      dataUrl: e.target.dataset.url,
      title: '背景音乐',
      coverImgUrl: ''
    })
  },

  /**
   * 更换地址
   */
  chooseLocation: function () {
    let that = this;
    wx.chooseLocation({
      success: function (ret) {
        console.log('chooseLocation', ret)
        this.data.form.latitude        = +ret.latitude;
        this.data.form.longitude       = +ret.longitude;
        this.data.form.wedding_address = ret.address;
      },
      cancel: function () {
        console.log('chooseLocation', '取消了选择');
      }
    })
  },

  /**
   * 上传图片
   */
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
  
  }
})