import {fetch}  from '../../utils/fetch.js'

Page({
  wxLogin(e) {
    // 如果拒绝授权则终止程序的执行
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') return

    // 结构赋值语法获取参数：
    const { nickName, avatarUrl } = e.detail.userInfo
    wx.login({
      success: async result => {
        const res = await fetch ({
          url: 'user/wxlogin',
          method: 'POST',
          tips: '微信授权登陆中...',
          isLogin: true,
          data: {
            code: result.code,
            nickname: nickName,
            avatar: avatarUrl
          }
        })

        // 成功则执行：
        if (res.data.status === 0) {
          // 保存token到本地
          wx.setStorageSync('my_token', res.data.token)
          // 提示
          wx.showToast({
            icon: 'none',
            duration: 1000,
            title: res.data.message
          })
          // 跳转到首页
          wx.reLaunch(
            {
              url: '/pages/home/home'
            }
          )
        }
      }
    })
  },
  goToLoginPage() {
    wx.navigateTo({
      url: '/pages/login-page/login-page'
    })
  }
})