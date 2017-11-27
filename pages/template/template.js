// template.js
import { Template } from 'template-model.js';

var template = new Template();


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  _loadData () {
    template.getTemplateData((res) => {
      this.setData({
        'templatesArr': res
      });
      console.log(res);
    });
  },

  ontemplatesItemTap: function (event) {
    var id = template.getDataSet(event, 'id');
    var title = template.getDataSet(event, 'title');   

    wx.navigateTo({
      // url: '../../we-swiper/example/general/general'
      url: '../show/show?id=' + id + '&title=' + title
    })
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