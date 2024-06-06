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
    // 获取用户 ID
    var user_id = wx.getStorageSync('id');

    // 确保 user_id 存在
    if (user_id) {
      // 发送请求获取用户信息
      wx.request({
        url: 'http://localhost:8080/user/getUserById',
        method: 'POST',
        data: {
          id: user_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          console.log("Response:", res); // 打印服务器响应以进行调试
          if (res.data.msg === 0) {
            this.setData({
              userInfo: {
                avatar: res.data.data.avatar,
                name: res.data.data.username
              }
            });
          } else {
            wx.showToast({
              title: '获取用户信息失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          console.error("Request failed:", err); // 打印错误以进行调试
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showToast({
        title: '用户未登录',
        icon: 'none'
      });
    }
  }
});
