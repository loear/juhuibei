import { Base } from '../utils/base.js';

class Game extends Base {
  constructor() {
    super(); // 调用基类构造函数
  }

  getGamesAll(id, callback) {
    var params = {
      url: 'game/all' + id,
      sCallback: function (res) {
        callback && callback(res.items);
      }
    }
    this.request(params);
  }

}

export { Game }