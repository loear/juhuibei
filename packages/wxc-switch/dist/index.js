export default Component({
  behaviors: [],
  properties: {
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    activeColor: {
      type: String,
      value: '#ff5777'
    }
  },
  data: {},
  methods: {
    switch: function () {
      let data = this.data;
      let checked = data.checked;
      let loading = data.loading;
      let disabled = data.disabled;

      if (loading || disabled) return false;

      this.setData({
        checked: !checked
      });

      this.triggerEvent('switch', {
        checked: this.data.checked
      });
    }
  }
});