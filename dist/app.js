import { Token } from 'utils/token.js';
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
  onShow: function onShow() {},
  onHide: function onHide() {}
});

