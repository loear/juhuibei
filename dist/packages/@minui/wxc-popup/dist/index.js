export default Component({
  behaviors: [],
  properties: {
    animationMode: {
      type: String,
      value: 'none'
    },
    align: {
      type: String,
      value: 'center'
    },
    status: {
      type: String,
      value: 'hide'
    }
  },
  data: {
    maskStatus: 'hide'
  },
  methods: {
    showMask() {
      this.setData({
        maskStatus: 'show'
      });
    },
    hideMask() {
      this.setData({
        maskStatus: 'hide'
      });
    },
    show() {

      if (this.data.animationMode !== 'none') {
        this.showMask();
        this.setData({
          status: 'fadeIn'
        });

        setTimeout(() => {
          this.setData({
            status: 'show'
          });
        }, 50);
      } else {
        this.showMask();
        this.setData({
          status: 'show'
        });
      }
    },
    forceHide() {
      this.setData({
        status: 'hide'
      });
      this.hideMask();
    },
    hide() {

      if (this.data.animationMode !== 'none') {
        this.setData({
          status: 'fadeOut'
        });

        clearTimeout(this._timer);

        this._timer = setTimeout(() => {
          this.forceHide();
        }, 300);
      } else {
        // 没有动画
        this.forceHide();
      }
    },
    onContentTap() {}
  }
});