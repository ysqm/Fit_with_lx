Page({
  data: {
    userinfo: {},
    sign_state: false
  },
  login() {
    wx.getUserProfile({
      desc: 'desc',
      success: (res) => {
        this.setData({
          userinfo: res.userInfo,
          sign_state: true
        });
      },
      fail: (res) => {
        console.log("获取用户信息失败");
      }
    });
  },
  go2Category() {
    if (this.data.sign_state) {
      wx.switchTab({
        url: '/pages/Category_Page/Category_Page',
      });
    }
  },
});
