Page({
  data: {
    totalCalories: 0, // 初始化为0，等待从本地缓存中获取
    bmi: 0,
    step: 0,
    cycle: 3.2,
    currentDate: '2022-01-01',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    stepInfoList:{}
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
  authorizeWeRun() {
    var that = this
    // 首先获取用户的授权状态
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          // 如果用户还未授权过，需要用户授权 读取微信运动数据
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
            stepInfoList: res.result.stepInfoList,
            step: res.result.stepInfoList[30].step
          })
        }).catch(console.error)
      }
    })
  },


  onShow: function () {
    // 在页面加载时从本地缓存中获取 totalCalories
    const dietData = wx.getStorageSync('dietData');
    if (dietData) {
      this.setData({
        totalCalories: dietData.totalCalories || 0,
      });    
    };
    const PhysicsData = wx.getStorageSync('PhysicsData');
    if(PhysicsData){
      this.setData({
        bmi: PhysicsData.score || 0
      })
    };
    const ExerciseData = wx.getStorageSync('ExerciseData');
    let Distance = 0;
    ExerciseData.forEach(item => {
      // 转换距离为浮点数
      const distance = parseFloat(item.distance) || 0;
      Distance += distance;
    });
    console.log(ExerciseData);
    if (ExerciseData) {
      this.setData({
        cycle:  Distance,
      });    
    };
    

    
  },
  onLoad: function () {
    console.log("1");
    this.getCurrentDate();
    console.log("2");
    this.authorizeWeRun();
    console.log("3");
    this.getWeRunData(); 
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