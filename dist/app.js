import { Token } from 'utils/token.js';
import api from './api/api_v1.js'
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App({
  globalData: {},
  onLaunch: function onLaunch() {
    var token = new Token();
    token.verify();
  },
  onShow: function onShow(e) {
    if (e.scene == 1044) {
      console.log('onShow', e.shareTicket)
      wx.getShareInfo({
        shareTicket: e.shareTicket,
        success: (res) => {
          console.log('getShareInfo', res)
          api.enCryptedData({
            method: 'post',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv
            },
            success: (resault) => {
              console.log('enCryptedData', resault);
              
            }
          })
        }
      })
    }
  },
  onHide: function onHide() {},

});

