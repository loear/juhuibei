"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    // 1. 载入用户的聚会列表
    let user_id = wx.getStorageSync('uid')
    this.loadActivityList(user_id);
    this.setData({
      uid: user_id 
    })
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
  loadActivityList: function (user_id) {
    var that = this;
    api.getActivityList({
      query: {
        id: user_id
      },
      success: (res) => {
        console.log(res.data)
        that.setData({
          activity_list: res.data,
        })
      } 
    })
  }
});
