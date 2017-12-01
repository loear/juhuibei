export default Component({
  behaviors: [],
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    iconImage: {
      type: String,
      value: ''
    },
    duration: {
      type: Number,
      value: 2000
    }
  },
  data: {},
  methods: {
    show() {
      let duration = this.data.duration;

      clearTimeout(this._timer);
      this.setData({
        isShow: true
      });

      if (duration > 0 && duration !== Infinity) {
        this._timer = setTimeout(() => {
          this.hide();
          this.triggerEvent('success', {}, {});
        }, duration);
      }
    },

    hide() {
      this._timer = clearTimeout(this._timer);

      this.setData({ isShow: false });
    }
  }
});