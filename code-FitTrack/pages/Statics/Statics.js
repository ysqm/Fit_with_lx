Page({
  data: {
    totalCalories: 0, // 初始化为0，等待从本地缓存中获取
    bmi: 0,
    step: 6666,
    cycle: 3.2,
    currentDate: '2022-01-01',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
  go2cycle(){
    wx.navigateTo({
      url: '/pages/Cycling/Cycling',
    })
  },
  go2run(){
    wx.navigateTo({
      url: '/pages/Run/Run',
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
  },
  onLoad: function () {
    this.getCurrentDate();
  },
  getCurrentDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
    const day = date.getDate();
    const currentDate = `${year}-${month}-${day}`;
    this.setData({
      currentDate: currentDate
    });
  }
});