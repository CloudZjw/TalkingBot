//index.js
//获取应用实例
const app = getApp()
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

function initData(that) {
  inputVal = '';

  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '欢迎来到TalkingBot，接下来请尽情和我聊天吧！'
  },
  {
    speaker: 'customer',
    contentType: 'text',
    content: '你好！'
  }
  ]
  that.setData({msgList, inputVal})

  function calScrollHeight(that, keyHeight) {
    var query = wx.createSelectorQuery();
    query.select('.scrollMsg').boundingClientRect(function(rect){}).exec();
  }
}

Page({
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  onLoad: function () {
    initData(this);
    this.setData({
      //TODO: 获取头像
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    })
  },
  
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },

  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    console.log(e.detail.value);
    this.setData({
      msgList,
      inputVal
    });

  },

  toBackClick: function () {
    wx.navigateBack({})
  }
})