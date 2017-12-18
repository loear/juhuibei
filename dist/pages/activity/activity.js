import { $wuxToptips } from '../../packages/@wux/components/wux';
import { $wuxDialog } from '../../packages/@wux/components/wux';
import WxValidate from '../../common/assets/plugins/WxValidate';
import api from '../../api/api_v1.js'
import { Activity } from 'activity-model.js';
var activity = new Activity();

var gourmet_address = "";   // 详细地址
var gourmet_title = "";     // 地址标题
var geopoint = null;        // 坐标

const qiniuUploader = require("../../libs/qiniuUploader");

Page({
  data: {
    form: {
      "title": '',
      "description": '',
      "start_date": '',
      "start_time": '',
      "numbers": '',
      "is_only_group": '',
      "end_date": '',
      "end_time": ''
    },
    files: [],
    start_date: "2018-01-01",
    start_time: "12:01",
    end_date: "2019-01-01",
    end_time: "12:05"
  },
  onLoad() {
    
    this.initValidate();
    this.setData({
      title: '地图定位',
      isAgree: true,
    })
  },
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })

    // setTimeout(hideToptips, 1500)
  },
  submitForm(e) {
    const params = e.detail.value;

    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }

    let data = {
      title: params.title,
      description: params.description,
      start_date: params.start_date,
      start_time: params.start_time,
      gourmet_address: gourmet_address,
      gourmet_title: gourmet_title,
      geopoint: geopoint,
      numbers: params.numbers,
      is_only_group: params.is_only_group,
      end_date: params.end_date,
      end_time: params.end_time
    };

    data.user_id = wx.getStorageSync('uid');

    console.log(data);
    activity.postActivity(data, (res)=>{
      console.log(res);
      wx.showToast({
        title: res.data,
        icon: 'success',
        duration: 1000,
        success: function () {
          // wx.switchTab({
          //   url: '/pages/template/template'
          // });
        }
      });
    });
    
    $wuxToptips.success({
      hidden: !0,
      text: '提交成功'
    })
  },
  initValidate() {
    this.WxValidate = new WxValidate({
      title: {
        required: true,
      },
      numbers: {
        required: true,
      }
    }, {
        title: {
          required: '聚会主题，如三年一班十年同学聚会'
        },
        numbers: {
          required: '需要输入人数上限',
        }
      })
  },
  chooseImage: function (e) {
    var that = this;
    var token = '';
    api.getUploadToken({
      success: (res) => {
        if (res.data.res === 0) {
          token = res.data.data
        }
      }
    })
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });

        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          console.log(res);
          that.setData({
            'imageURL': res.imageURL,
          });
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            domain: 'bzkdlkaf.bkt.clouddn.com', // // bucket 域名，下载资源时用到。
            key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            uptoken: token,
        });
        
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      start_date: e.detail.value,
      end_date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      start_time: e.detail.value,
      end_time: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      end_time: e.detail.value
    })
  },
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (ret) {
        console.log('chooseLocation', ret)
        gourmet_address = ret.address;
        gourmet_title = ret.name;
        geopoint = {
          latitude: +ret.latitude //数值
          , longitude: +ret.longitude //数值
        }
        that.setData({
          title: gourmet_title,
        })
      }
      , cancel: function () {
        geopoint = null;//退出之后对象清空
      }
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindGroupTag() {
    $wuxDialog.alert({
      title: '限定微信群',
      content: '仅转发到的群成员可以报名',
      onConfirm(e) {
        console.log('我知道了')
      },
    })
  }
})