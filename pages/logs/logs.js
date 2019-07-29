//logs.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // onLoad: function () {
  //   console.log('onLoad执行');
  // },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });

      wx.getUserInfo({
        success: function (res) {
          // that.setData({
          //   hasUserInfo: true
          // })
          wx.login({
            success: res => {
              // 获取到用户的 code 之后：res.code
              console.log("用户的code:" + res.code);
              wx.request({
                //TODO: 需要搭建一个服务器
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxfd7ee096a0b88241&secret=e4cd572a3bab0086b43ff493e7cc9601&js_code=' + res.code + '&grant_type=authorization_code',
                success: res => {
                  // 获取到用户的 openid
                  console.log("用户的openid:" + res.data.openid);
                }
              });
            }
          });
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  goToTalk: function(e) {
    wx.redirectTo({
      url: '../../pages/index/index',
    })
  }
})
