var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var latitude = '';
var longitude = '';
var origin = '';

Page({
  data: {
    markers: [{
      iconPath: "../../common/assets/images/navigation/mapicon_navi_s.png",
      id: 0,
      latitude: latitude,
      longitude: longitude,
      width: 23,
      height: 33
    },{
      iconPath: "../../common/assets/images/navigation/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function() {
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
    var myAmapFun = new amapFile.AMapWX({key: key});
    console.log(1);
    myAmapFun.getDrivingRoute({
      origin: that.origin,
      destination: '113.834446,22.60816',
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
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
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      }
    })
  },
  _getLocation: function () {
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
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})