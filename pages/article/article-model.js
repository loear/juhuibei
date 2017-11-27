import { Base } from '../../utils/base.js';

class Article extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }
  getArticle(id, callback) {
    var params = {
      url: 'article/' + id,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Article }