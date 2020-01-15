//app.js
App({
  onLaunch: function () {
    const token = wx.getStorageSync('my_token')

    // 如果已经登陆则跳转到首页：
    if (token) {
      this.globalData.token = token

      wx.reLaunch({
        url: '/pages/home/home'
      })
    }
  },
  globalData: {
    token: null
  }
})