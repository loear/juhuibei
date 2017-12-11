"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
import { $wuxButton } from '../../packages/@wux/components/wux'
exports.default = Page({
  data: {
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1,
    avatar: [
      {count:1},
      {count:2}
    ]
  },
  onLoad() {
    this.initButton();
    this._onLoad();
  },
  _onload() {
    
  },
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
        index === 0 && wx.showModal({
          title: '敬请期待！',
          showCancel: !1,
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
  switchChange(e) {
    e.detail.value ? this.button.open() : this.button.close()
  },
  pickerChange(e) {
    const index = e.detail.value
    const position = this.data.types[index]
    this.initButton(position)
  },
});
