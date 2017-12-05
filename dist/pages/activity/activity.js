var gourmet_address = "";
var gourmet_title = "";
var geopoint = null;
Page({
  data: {
    form: {
      gender: '',
      assistance: '',
      tel: '',
      idcard: '',
    },
    radio: [
      {
        name: '男',
        value: 'male',
        checked: !1,
      },
      {
        name: '女',
        value: 'female',
      },
    ],
    checkbox: [
      {
        name: '黄药师',
        value: '0001',
        checked: !1,
      },
      {
        name: '欧阳锋',
        value: '0002',
      },
      {
        name: '段智兴',
        value: '0003',
      },
      {
        name: '洪七公',
        value: '0004',
      },
    ],
    files: [],
    date: "2016-09-01",
    time: "12:01",
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
    const params = e.detail.value

    console.log(params)

    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }

    $wuxToptips.success({
      hidden: !0,
      text: '提交成功',
    })
  },
  initValidate() {
    this.WxValidate = new WxValidate({
      gender: {
        required: true,
      },
      tel: {
        required: true,
        tel: true,
      },
      idcard: {
        required: true,
        idcard: true,
      },
    }, {
        gender: {
          required: '请选择性别',
        },
        tel: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
        },
        idcard: {
          required: '请输入身份证号码',
          idcard: '请输入正确的身份证号码',
        },
      })
  },
  radioChange(e) {
    const value = e.detail.value
    const radio = this.data.radio
    radio.forEach(n => n.checked = n.value === value)
    this.setData({
      radio: radio,
      'form.gender': value,
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (ret) {
        console.log('chooseLocation', ret)
        gourmet_address = ret.address;
        gourmet_title = ret.name;
        that.setData({
          address: gourmet_address
          , title: gourmet_title
        })
        title = gourmet_title;
        geopoint = {
          latitude: +ret.latitude //数值
          , longitude: +ret.longitude //数值
        }
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
  }
})