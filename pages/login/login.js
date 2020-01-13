// pages/login/login.js
Page({
  wxLogin (e) {
    // 如果拒绝授权则终止程序的执行
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') return
    console.log(e.detail)

    // 结构赋值语法获取参数：
    const {nickName, avatarUrl} = e.detail.userInfo
    wx.login({
      success: (res) => {
		wx.showLoading({
			title: '微信授权登陆中...'
		})
        wx.request({
          url: 'http://localhost:3000/api/user/wxlogin',
          method: 'POST',
          data: {
            code: res.code,
            nickname: nickName,
            avatar: avatarUrl
          },
          success (res) {
            console.log(res.data)
			
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
          },
		  complete: () => {
			  wx.hideLoading()
		  }
        })
      }
    })
  },
  goToLoginPage () {
    wx.navigateTo({
      url: '/pages/login-page/login-page'
    })
  }
})