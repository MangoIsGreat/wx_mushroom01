// 引入fetch方法:
import {fetch} from '../../utils/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers: [],  //轮播图数据
    course: [],  //推荐课程
    videos: []  //热门视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面一加载便获取轮播图数据和推荐课程数据：
    this.getSwiperData()

    this.getCourseData()

    this.getVideosData()
  },

  async getSwiperData () {
    const res = await fetch ({
      url: 'home/swipers'
    })

    this.setData({
      swipers: res.data.message
    })
  },

  async getCourseData () {
    const res = await fetch({
      url: 'home/course'
    })

    this.setData({
      course: res.data.message
    })
  },

  async getVideosData () {
    const res = await fetch({
      url: 'home/video'
    })

    this.setData({
      videos: res.data.message
    })
  },

  // 跳转到课程首页：
  goToCourse () {
    wx.switchTab({
      url: '/pages/course/course'
    })
  }

  
})