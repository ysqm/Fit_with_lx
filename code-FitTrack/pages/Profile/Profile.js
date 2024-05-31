Page({
  data: {
    userInfo: null
  },

  // 跳转到编辑个人信息的页面
  gotoEdit() {
    wx.navigateTo({
      url: '/pages/Edit_Profile/Edit_Profile',
    });
  },

  // 跳转到目标页面
  go2Goal() {
    wx.navigateTo({
      url: '/pages/Goal/Goal',
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/Login/Login',
          });
        }
      }
    });
  },

  onLoad(options) {
    // 可以在此获取用户信息
    this.setData({
      userInfo: {
        avatar: '/image/avatar.jpg',
        name: '用户名'
      }
    });
  }
});
