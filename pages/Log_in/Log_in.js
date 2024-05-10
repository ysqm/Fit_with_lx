Page({
  data: {},

  onShareAppMessage() {
    return {};
  },

  go2Category: function(param){
    wx.navigateTo({
      url: '/pages/Category_Page/Category_Page',
    })
  }
});