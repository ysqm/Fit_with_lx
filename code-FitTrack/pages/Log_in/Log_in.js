Page({
  data: {
    showRegister: false,
    showLogin: false,
    registerUsername: '',
    registerPassword: '',
    loginUsername: '',
    loginPassword: ''
  },
  
  go2Category_Page() {
    wx.switchTab({
      url: '/pages/Category_Page/Category_Page',
    })
  },

  showRegisterPopup() {
    this.setData({
      showRegister: true,
      showLogin: false
    });
  },

  showLoginPopup() {
    this.setData({
      showLogin: true,
      showRegister: false
    });
  },

  closePopup() {
    this.setData({
      showRegister: false,
      showLogin: false
    });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  register() {
    const { registerUsername, registerPassword } = this.data;

    // 发送注册请求到服务器
    wx.request({
      url: 'http://localhost:8080/user/regiser', // 修正后的注册接口
      method: 'POST',
      data: {
        username: registerUsername,
        account: registerUsername,
        password: registerPassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        // 处理成功响应
        if (res.data.msg === 1) {
          wx.showToast({
            title: '注册成功',
            icon: 'none'
          });
          this.closePopup();
          this.go2Category_Page(); // 使用 this 调用
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        // 处理失败响应
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },

  login() {
    const { loginUsername, loginPassword } = this.data;

    // 发送登录请求到服务器
    wx.request({
      url: 'http://localhost:8080/user/login', // 登录接口
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        // 处理成功响应
        if (res.data.msg === 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          });
          this.closePopup();
          this.go2Category_Page(); // 使用 this 调用
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        // 处理失败响应
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  }
});
