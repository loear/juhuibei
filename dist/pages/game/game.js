// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { id: 0, title: "真心话", file_name: "monk" }, 
      { id: 1, title: "大冒险", file_name: "monk" }, 
      { id: 2, title: "狼人杀", file_name: "monk" }, 
      { id: 3, title: "谁是卧底", file_name: "monk" }, 
      { id: 4, title: "色子王", file_name: "monk" }, 
      { id: 5, title: "斗地主", file_name: "monk" }, 
      { id: 6, title: "插拳", file_name: "monk" }, 
      { id: 7, title: "抽土豪", file_name: "monk" }, 
      { id: 8, title: "猜猜猜", file_name: "monk" }
    ]
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