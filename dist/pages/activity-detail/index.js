import {
  MUSIC_PALY_IMG,
  MUSIC_PAUSE_IMG
} from '../../utils/constants.js'
import api from '../../api/api_v1.js'
import util from '../../utils/util.js'

var title = '聚会呗';

Page({
  data: {
    musics: [],
    current: 0,
    playId: -1,

    contentType: 'story',
    playImg : MUSIC_PALY_IMG
  },
  onLoad: function (options) {
    console.log('options', options)
    var that = this;
    var uid = wx.getStorageSync('uid')
    this.setData({uid: uid})
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

    // 获取聚会详细信息
    api.getActivityInfo({
      query:{
        user_id: options.user_id,
        activity_id: options.activity_id
      },
      success: (res) => {
        console.log('activity_info', res.data.data);
        if (res.data.res === 0) {
          that.setData({ 
            activity_info: res.data.data,
            activity_id: options.activity_id
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
  handleChange: function (e) {
    let current = e.detail.current
    let length = this.data.musics.length

    if (current === length) {
      this.setData({
        current: length
      })
      wx.navigateTo({
        url: '../home/index',
        success: () => {
          this.setData({
            current: length - 1
          })
        }
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
    console.log(e);
    wx.navigateTo({
      url: '/pages/picture-detail/index'
    })
  },
  /**
   * 上传图片到七牛
   */
  uploadImage: function (e) {
    console.log(e);
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });

        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          // 前端页面展示
          that.setData({
            'files': [{ url: res.imageURL }],
            'has_image': true
          });
          // 后端插入images表
          api.saveImage({
            method: 'post',
            data: {
              url: res.imageURL
            },
            success: (res) => {
              if (res.data.res === 0) {
                image_id = res.data.data
              }
            }
          })
        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'SCN',
            domain: 'qiniu.juhuibei.com', // bucket 域名，下载资源时用到。
            // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            uptoken: token,
          });

      }
    })
  },
  editImageTitle: function() {
    
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
    console.log(e);
    console.log('点击了确认按钮');
    this.hideDialog();
  },
  onCancel() {
    console.log('点击了取消按钮');
    this.hideDialog();
  },
  inputValue: function(e) {
    console.log('inputValue',e);
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
      path: '/pages/activity-detail/index?user_id=' + this.data.user_id + '&activity_id=' + this.data.activity_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})