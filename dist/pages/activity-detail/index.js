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
    var that = this;
    console.log('options', options)
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
            user_id: options.user_id,
            activity_id: options.activity_id
          })
          title = res.data.data.title
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title
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
  switchContent: function (e) {
    let id = e.currentTarget.dataset.id
    let type = e.target.dataset.type

    let musics = this.data.musics
    
    let music = musics.find((music) => music.id === id)

    this.data.contentType = type
    this.setData({ contentType:type })    

    this.setData({ musics })
    
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