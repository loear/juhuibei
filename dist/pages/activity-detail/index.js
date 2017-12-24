import {
  MUSIC_PALY_IMG,
  MUSIC_PAUSE_IMG
} from '../../utils/constants.js'
import api from '../../api/api_v1.js'
import util from '../../utils/util.js'
const qiniuUploader = require("../../libs/qiniuUploader");

var title = '聚会呗';

Page({
  data: {
    musics: [],
    current: 0,
    playId: -1,
    contentType: 'info',
    playImg : MUSIC_PALY_IMG,
    info: [],
    uid: 0,
    activity_id: 0,
    activity_info: {}
  },
  onLoad: function (options) {
    console.log('options', options)
    var that = this;
    var uid = wx.getStorageSync('uid')
    this.setData({ 
      uid: uid,
      activity_id: options.activity_id
    })
    

    // 保存用户关联聚会信息
    api.saveActivityUser({
      method: 'post',
      data: {
        user_id: uid,
        activity_id: options.activity_id
      },
      success: (res) => {
        console.log('saveActivityUser', res.data.data);
        if (res.data.res === 0) {
         
        }
      }
    })

    // 获取当前用户聚会信息
    api.getUserActivityInfo({
      query: {
        user_id: uid,
        activity_id: options.activity_id
      },
      success: (res) => {
         console.log('getUserActivityInfo', res)
        if (res.data.res === 0) {
          that.setData({
            info: res.data.data
          })
        }
      }
    })

    // 通过发布人和聚会ID获取聚会详细信息
    api.getActivityInfo({
      query:{
        activity_id: options.activity_id
      },
      success: (res) => {
         console.log('activity_info', res.data.data);
        if (res.data.res === 0) {
          that.setData({ 
            activity_info: res.data.data
          })
          title = res.data.data.title
        }
      }
    })

    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onReady: function () {
    // 设置标题
    wx.setNavigationBarTitle({
      title: title
    })
  },
  openShareMenu: function(e) {
    console.log('openShareMenu', e)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 切换图片
   */
  handleChange: function (e) {
    let current = e.detail.current
    let length = this.data.activity_info.activity_image.length
    if (current === length) {
      this.setData({
        current: length
      })
    }
  },
  togglePlay: function (e) {
    let musics = this.data.musics
    let playId = this.data.playId
    let musicId = e.target.dataset.id
    let music = musics.find((music) => music.id === musicId)

    musics = musics.map((music) => {
      music.playImg = MUSIC_PALY_IMG
      return music
    })

    if (playId !== musicId) {
      playId = musicId
      music.playImg = MUSIC_PAUSE_IMG
      this.playMusic(music)
    } else {
      playId = -1
      music.playImg = MUSIC_PALY_IMG
      this.pauseMusic()
    }

    this.setData({ musics, playId })
  },
  playMusic: function (music) {  
    wx.playBackgroundAudio({
      dataUrl: music.music_id,
      title: music.title
    })
  },
  pauseMusic: function () {
    wx.pauseBackgroundAudio()
  },
  /**
   * 切换小菜单
   */
  switchContent: function (e) {
    let type = e.target.dataset.type
    this.data.contentType = type
    this.setData({ contentType:type })
  },
  /**
   * 打开影集详情页
   */
  openDetail: function(e) {
    // console.log('openDetail',e);
    wx.navigateTo({
      url: '/pages/picture-detail/index?image_id=' + e.target.dataset.image_id
    })
  },
  /**
   * 上传图片到七牛
   */
  uploadImage: function () {
    wx.navigateTo({
      url: '/pages/cut_image/index?user_id=' + this.data.uid + '&activity_id=' + this.data.activity_id
    })
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
    var that = this;
    api.saveComingInfo({
      method: 'post',
      data: {
        user_id: that.data.uid,
        activity_id: that.data.activity_id,
        username: that.data.username,
        phone: that.data.phone
      },
      success: (res) => {
        if (res.data.res === 0) {
          console.log('onConfirm', res)
        }
      }
    })
    this.hideDialog();
  },
  onCancel() {
    console.log('点击了取消按钮');
    this.hideDialog();
  },
  setUsername: function(e) {
    // console.log('setUsername',e);
    this.setData({
      username:e.detail.value
    })
  },
  setPhone: function (e) {
    // console.log('setPhone', e);
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 保存更改的照片名
   */
  saveImageName: function(e) {
    // 只有更改了才会保存
    if (e.detail.value !== e.target.dataset.image_name) {
      // console.log('saveImageName', e);
      api.saveImageName({
        method: 'post',
        data: {
          image_id: e.target.dataset.image_id,
          name: e.detail.value
        },
        success: (res) => {
          if (res.data.res === 0) {
            console.log('saveImageName', res.data.data);
          }
        }
      })
    }
  },
  /**
   * 拨打电话
   */
  callPhone: function(options) {
    wx.makePhoneCall({
      phoneNumber:  options.target.dataset.phone
    })
  },
  /**
   * 页面分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/activity-detail/index?user_id=' + this.data.uid + '&activity_id=' + this.data.activity_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})