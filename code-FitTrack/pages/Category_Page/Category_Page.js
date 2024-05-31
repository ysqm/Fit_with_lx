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
  },
  go2gym(){
    wx.navigateTo({
      url: '/pages/Gym/Gym',
    })
  },
  go2advice(){
    wx.navigateTo({
      url: '/pages/Advice/Advice',
    })
  }
  
});