// pages/login-page/login-page.js
Page({
  data: {
    phone: '15177777777',
    vcode: '',
    count: 10,  //倒计时总时长
    isCountDown: false,  //是否正在倒计时
    tips: '获取验证码',  //提示信息
    timerId: null  //定时器
  },
  changeData(e) {
    // ES6的属性名表达式，使获取的属性名是动态的
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  // 获取验证码：
  getVcode() {
    // 判断是否正在进行倒计时,如果正在倒计时则无法点击：
    if (this.data.isCountDown) return

    // 正则表达式校验手机号：
    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!reg.test(this.data.phone)) {
      // 校验不通过则提示用户：
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '手机号输入不正确'
      })
      // 终止程序的执行：
      return
    }

    // 如果开始倒计时：
    this.setData({
      tips: this.data.count,
      isCountDown: true
    })

    // 开启定时器：
    this.data.timerId = setInterval (() => {
      if (this.data.count <= 1) {
        clearInterval(this.data.timerId)

        // 重置数据：
        this.setData({
          tips: '获取验证码',
          isCountDown: false,
          count: 10
        })

        return
      }

      this.data.count--

      this.setData({
        tips: this.data.count
      })
    }, 500)

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
    // 开始手机号和验证码正则校验：
    var checkPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!checkPhone.test(this.data.phone)) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '手机号格式不正确'
      })

      return
    }

    var checkCode = /^[0-9]{4}$/
    if (!checkCode.test(this.data.vcode)) {
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '验证码不正确'
      })

      return
    }

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
  },
  onUnload () {
    // 页面卸载时清楚定时器：
    clearInterval(this.data.timerId)
  }
})