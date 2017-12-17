var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var latitude = '';
var longitude = '';
var origin = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { title: '驾车', content: '内容一' },
      { title: '步行', content: '内容二' },
      { title: '公交', content: '内容三' },
      { title: '骑行', content: '内容四' }
    ],
    activeKey: 0,
    markers: [{
      iconPath: "../../common/assets/images/navigation/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    }, {
      iconPath: "../../common/assets/images/navigation/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    distance_walk: '',
    cost_walk: '',
    distance_ride: '',
    polyline: [],
    polyline_walk: [],
    polyline_ride: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        latitude = res.latitude
        longitude = res.longitude
        this.origin = longitude + ',' + latitude
        console.log(this.origin);
      }
    })
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    console.log(1);
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      }
    });

    myAmapFun.getWalkingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline_walk: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance_walk: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost_walk: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }

      },
      fail: function (info) {

      }
    });

    myAmapFun.getTransitRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      city: '北京',
      success: function (data) {
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                if (j !== 0) {
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });

      },
      fail: function (info) {

      }
    });

    myAmapFun.getRidingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline_ride: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance_ride: data.paths[0].distance + '米'
          });
        }

      },
      fail: function (info) {

      }
    });

  },

  /**
   * 获取地理位置
   */
  _getLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        latitude = res.latitude
        longitude = res.longitude
        this.origin = longitude + ',' + latitude
        console.log(this.origin);
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

  goCarDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goWalkDetail: function () {
    wx.navigateTo({
      url: '../navigation_walk_detail/navigation'
    })
  },
  goRideDetail: function () {
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation'
    })
  },
})