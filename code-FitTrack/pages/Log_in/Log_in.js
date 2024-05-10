Page({
  data: {},

  onShareAppMessage() {
    return {};
  },

  go2Category(){
    wx.navigateTo({
      url: '/pages/Category_Page/Category_Page',
    })
  }
});