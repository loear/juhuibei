export default Component({
  _timer: null,

  behaviors: [],
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'mgj'
    },
    image: {
      type: String,
      value: ''
    },
    slip: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    show() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = setTimeout(() => {
        this._timer = null;
        this.setData({ isShow: true });
      }, 500);
    },
    hide() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }

      this.setData({ isShow: false });
    }
  }
});