Page({
  data: {
    totalCalories: 0, // 初始化为0，等待从本地缓存中获取
    bmi: 0,
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
  },
  go2Physics(){
    wx.navigateTo({
      url: '/pages/Physics/Physics',
    })
  },

  onShow: function () {
    // 在页面加载时从本地缓存中获取 totalCalories
    const dietData = wx.getStorageSync('dietData');
    if (dietData) {
      this.setData({
        totalCalories: dietData.totalCalories || 0,
      });    
    }
    const PhysicsData = wx.getStorageSync('PhysicsData');
    if(PhysicsData){
      this.setData({
        bmi: PhysicsData.score || 0
      })
    }

  }
});