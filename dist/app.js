import { Token } from 'utils/token.js';
import api from './api/api_v1.js'
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App({
  globalData: {},
  onLaunch: function onLaunch(e) {
    var token = new Token();
    token.verify();
    var token = wx.getStorageSync('token');
    console.log('token', token);
    if (e.scene == 1044) {
      // console.log('onLaunch', e.shareTicket)
      wx.getShareInfo({
        shareTicket: e.shareTicket,
        success: (res) => {
          // console.log('getShareInfo', res)
          api.enCryptedData({
            method: 'post',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              token: token
            },
            success: (resault) => {
              // console.log('enCryptedData', resault);

            }
          })
        }
      })
    }
  },
  onShow: function onShow(e) {
  
  },
  onHide: function onHide() {},

});

