import { Base } from '../../utils/base.js';

class Home extends Base{
  constructor () {
    super(); // 调用基类构造函数
  }
  getBannerDate (id, callback) {
    var params = {
      url: 'banner/' + id,
      sCallback: function(res) {
        callback && callback(res.items);
      }
    }
    this.request(params);    
  }

  getCategoryData (callback) {
    var params = {
      url: 'category/all',
      sCallback: function (res) {
        callback && callback(res);
        
      }
    }
    this.request(params);
  }

 
}

export { Home }