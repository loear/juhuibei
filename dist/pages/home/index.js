"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
import { Token } from '../../utils/token.js';
import { $wuxButton } from '../../packages/@wux/components/wux'
import api from '../../api/api_v1.js'
exports.default = Page({
  data: {
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1,
    uid: 0
  },
  onLoad() {    
    // 1. 初始化菜单按钮
    this.initButton();
    // 2. 载入用户的聚会列表
    var that = this;
    var uid = wx.getStorageSync('uid')
    if (uid) {
      this.setData({ uid: uid })
      that.loadActivityList(uid);
    } else {
      var token = new Token();
      token.getTokenFromServer((cb) => {
        that.setData({ uid: cb.uid })
        token.saveUserInfo(cb.uid)
        that.loadActivityList(cb.uid);
      });
    }
    
  },

  // 初始化菜单按钮 默认在左下角
  initButton(position = 'bottomLeft') {
    this.setData({
      opened: !1,
    })

    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '影集',
          icon: "/common/assets/images/menu_yj.png",
        },
        {
          label: '游戏',
          icon: "/common/assets/images/menu_yx.png",
        },
        {
          label: '发布',
          icon: "/common/assets/images/menu_fb.png",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/picture/index'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/game/game'
        })

        index === 2 && wx.navigateTo({
          url: '/pages/activity/activity'
        })

        return true
      },
      callback(vm, opened) {
        vm.setData({
          opened,
        })
      },
    })
  },

  // 载入聚会列表
  loadActivityList: function (uid) {
    var that = this;
    api.getActivityList({
      query: {
        id: uid
      },
      success: (res) => {
        if (res.data.res === 0) {
          console.log('activity_list', res.data.data)
          that.setData({
            activity_list: res.data.data,
          })
        }
      } 
    })
  }
});
