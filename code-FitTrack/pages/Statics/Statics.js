Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  go2inStatistics: function(param){
    wx.navigateTo({
      url: '/pages/Inner_Static_Page/Inner_Static_Page',
    })
  },
  go2diet: function(param){
    wx.navigateTo({
      url: '/pages/Diet/Diet',
    })
  },
  go2Physics(){
    wx.navigateTo({
      url: '/pages/Physics/Physics',
    })
  }
});