// 引入fetch方法:
import {fetch} from '../../utils/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面一加载便获取轮播图数据和推荐课程数据：
    this.getSwiperData()

    this.getCourseData()
  },

  async getSwiperData () {
    const res = await fetch ({
      url: 'home/swipers'
    })

    console.log(res)
  },

  async getCourseData () {
    const res = await fetch({
      url: 'home/course'
    })

    console.log(res)
  }

  
})