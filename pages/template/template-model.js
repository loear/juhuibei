import { Base } from '../../utils/base.js';

class Template extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }

  getTemplateData(callback) {
    var params = {
      url: 'template/all',
      sCallback: function (res) {
        callback && callback(res);

      }
    }
    this.request(params);
  }


}

export { Template }