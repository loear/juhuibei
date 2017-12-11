import { Base } from '../../utils/base.js';

class Activity extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }

  postActivity(data, callback) {
    var params = {
      url: 'activity/submit',
      type: 'post',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Activity }