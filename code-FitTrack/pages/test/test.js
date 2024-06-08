// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepInfoList: []  // 用于存储步数数据
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'your-env-id',  // 这里填写你的云开发环境ID
        traceUser: true,
      })
    }
  },

  /**
   * 用户授权读取微信运动数据
   */
  authorizeWeRun() {
    var that = this
    // 首先获取用户的授权状态
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          // 如果用户还未授权过，需要用户授权读取微信运动数据
          wx.authorize({
            scope: 'scope.werun',
            success() {
              // 读取微信步数数据
              that.getWeRunData()
            },
            fail() {
              // 如果用户拒绝授权，提示用户需要同意授权才能获取他的微信运动数据
              wx.showModal({
                title: '读取微信运动数据失败',
                content: '请在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中允许我们访问微信运动数据',
              })
            }
          })
        } else {
          // 如果用户已授权过，直接开始同步微信运动数据
          // 读取微信步数数据
          that.getWeRunData()
        }
      }
    })
  },

  /**
   * 获取微信运动数据
   */
  getWeRunData() {
    var that = this
    wx.getWeRunData({
      success(res) {
        console.log(res)
        wx.cloud.callFunction({
          name: 'desrundata',
          data: {
            weRunData: wx.cloud.CloudID(res.cloudID)  // 直到云函数被替换
          }
        }).then(res => {
          console.log(res)
          that.setData({
            stepInfoList: res.result.stepInfoList
          })
        }).catch(console.error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
