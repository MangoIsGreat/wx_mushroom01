const BASE_URL = 'http://127.0.0.1:3000/api/'

// 获取全局数据：
const app = getApp()

const fetch = ({url, method = 'get', data, header = {}, tips = '数据加载中...', isLogin = false}) => {
    return new Promise((resolve, reject) => {
        // 先判断是否已经登陆，如果已经登陆则获取全局的token，如果未登陆则重新请求token：
        if (isLogin) {
            // 获取全局token:
            const token = app.globalData.token
            if (token) {
                header.Authorization = token
            }
        } else {
            app.globalData.token = wx.getStorageSync('my_token')
            
            header.Authorization = app.globalData.token
        }

        wx.showLoading({
            title: tips
        })

        wx.request({
            url: `${BASE_URL}${url}`,
            method,
            data,
            header,
            success: res => {
                resolve(res)
            },
            fail: error => {
                reject(error)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    })
}

// 暴露方法：
export {
    fetch
}