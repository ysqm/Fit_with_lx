Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  go2run(){
    wx.navigateTo({
      url: '/pages/Run/Run',
    })
  },
  go2cycle(){
    wx.navigateTo({
      url: '/pages/Cycling/Cycling',
    })
  }
  
});