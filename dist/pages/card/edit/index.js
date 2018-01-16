import api from '../../../api/api_v1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    tabs: [
      { title: '驾车', content: '内容一', url: 'car_' },
      { title: '步行', content: '内容二', url: 'walk_' },
      { title: '公交', content: '内容三', url: 'bus_' },
      { title: '骑行', content: '内容四', url: 'ride_' },
      { title: '骑行', content: '内容四', url: 'ride_' }
    ],
    activeKey: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.theme_id);
    this.getThemeModule(options.theme_id);
  },
  /**
   * 获取主题模板
   */
  getThemeModule(theme_id) {
    var that = this;
    api.getThemeModule({
      query: {
        theme_id: theme_id
      },
      success: (res) => {
        if (res.data.res === 0) {
          that.setData({
              tabs: res.data.data.theme_module
          })
          console.log(res.data.data.theme_module);
        }
      }
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
  
  },

  onClick: function (e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
    const idx = e.detail.key;
    this.setData({
      activeKey: idx
    });
  },
})