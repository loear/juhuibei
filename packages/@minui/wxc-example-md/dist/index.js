export default Component({
  properties: {
    type: { // doc or demo
      type: String,
      value: 'doc'
    },
    content: {
      type: String | Array,
      value: ''
    }
  },
  attached() {
    // let { content, isRawCode } = this.data
    // content = decodeURIComponent(content)
    // if (isRawCode) {
    //   content = '``` html \r\n' + content + '\r\n```'
    // }


    // content = marked(content)
    // content = content.replace(/\<(|\/)pre\>/ig, '')
    // content = content.replace(/\n/g, '<br/>')
    // content = content.replace(/  /g, '<span class="tab-1"></span>')
    // // content = markdownFormat(content)
    // console.log(content)
    // this.setData({
    //   nodes: content
    // })
  }
});