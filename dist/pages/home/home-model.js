import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }

  getActivityList(callback) {
    let user_id = wx.getStorageSync('uid');
    var params = {
      url: 'activity/list/' + user_id,
      data: {},
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Home }