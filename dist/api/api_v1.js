const host = 'https://www.juhuibei.com/api/v1/'
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

const getActivityList     = (params) => wxRequest(params, host + 'activity/list/' + params.query.id)
const getActivityInfo     = (params) => wxRequest(params, host + 'activity_info/' + params.query.activity_id)
const getUserActivityInfo = (params) => wxRequest(params, host + 'info/' + params.query.user_id + '/' + params.query.activity_id)
const getUploadToken      = (params) => wxRequest(params, host + 'activity/upload_token')
const saveImage           = (params) => wxRequest(params, host + 'activity/save_image')
const saveActivityUser    = (params) => wxRequest(params, host + 'activity/save_user')
const enCryptedData       = (params) => wxRequest(params, host + 'activity/encrypt')

module.exports = {
  getActivityList,
  getActivityInfo,
  getUserActivityInfo,
  getUploadToken,
  saveImage,
  saveActivityUser,
  enCryptedData
}
