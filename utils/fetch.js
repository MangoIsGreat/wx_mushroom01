const BASE_URL = 'http://127.0.0.1:3000/api/'

const fetch = ({url, method = 'get', data, header = {}, tips = '数据加载中...'}) => {
    return new Promise((resolve, reject) => {
        // 获取token:
        const token = wx.getStorageSync('my_token')
        if (token) {
            header.Authorization = token
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
            complete () {
                wx.hideLoading()
            }
        })
    })
}

// 暴露方法：
export {
    fetch
}