import { Base } from '../../utils/base.js';

class Invitation extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }
  getBannerDate(id, callback) {
    var params = {
      url: 'banner/' + id,
      sCallback: function (res) {
        callback && callback(res.items);
      }
    }
    this.request(params);
  }

  getOpenid(code, callback){
    var params = {
      url: '/token/user',
      data:{"code":code},
      sCallback: function (res) {
        callback && callback(res);
      },
    }
    this.request(params);
  }

  postInvitation(data, callback) {
    var params = {
      url: 'invitation/submit',
      type: 'post',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
 
}

export { Invitation }