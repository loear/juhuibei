import { Base } from '../../utils/base.js';

class Game extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }

  getGamesAll(callback) {
    var params = {
      url: 'game/all',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Game }