// pages/game/game.js
import { Game } from 'game-model.js';
var game = new Game();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: '游戏',
      desc: '总有一款适合你'
    });
    this._onLoad();
  },
  _onLoad: function () {
    var id = 1;
    game.getGamesAll((res) => {
      console.log(res);
      this.data.grids = res;
      this.setData({
        'grids': res
      });
    });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})