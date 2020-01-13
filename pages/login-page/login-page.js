// pages/login-page/login-page.js
Page({
  data: {
    phone: '15177777777',
    vcode: ''
  },
  changeData(e) {
    // ES6的属性名表达式，使获取的属性名是动态的
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  // 获取验证码：
  getVcode() {
    wx.showLoading({
      title: '获取验证码...',
    })
    wx.request({
      url: 'http://127.0.0.1:3000/api/user/vcode',
      data: {
        phone: this.data.phone
      },
      success: res => {
        wx.showToast({
          title: `${res.data.vcode}`,
          icon: 'none',
          duration: 1000
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  phoneLogin() {
    wx.showLoading({
      title: '登陆中...'
    })
    wx.request({
      url: 'http://127.0.0.1:3000/api/user/login',
      method: 'POST',
      data: {
        phone: this.data.phone,
        vcode: this.data.vcode
      },
      success: res => {
        if (res.data.status === 0) {
          // 提示：
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
          // 保存token到本地
          wx.setStorageSync('my_token', res.data.token)

          // 跳转到首页
          wx.reLaunch({
            url: '/pages/home/home',
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})