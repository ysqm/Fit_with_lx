
Page({
  data: {
    totalCalories: 0, // 初始化为0，等待从本地缓存中获取
  },
  
  onLoad() {
    // 在页面加载时从本地缓存中获取 totalCalories
    const storageData = wx.getStorageSync('dietData');
    if (storageData) {
      this.setData({
        totalCalories: storageData.totalCalories || 0,
      });    
    }
  },
  

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
  }
});