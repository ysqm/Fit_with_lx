const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    name: '',
    pass: '',
    address: '',
    birthday: '',
    hobby: ''
  },
  
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
  },
  
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },
  
  saveAndLogin() {
    const { avatarUrl, name, pass, address, birthday, hobby } = this.data;

    if (!name || !pass || !address || !birthday || !hobby) {
      wx.showToast({
        title: '请填写所有信息',
        icon: 'none'
      });
      return;
    }
    
    console.log(this.data);
    
    var user_id = wx.getStorageSync('id');
    console.log(user_id);

    wx.request({
      url: 'http://10.16.202.197:8080/user/update', // 信息修改接口
      method: 'POST',
      data: {
        id: user_id,
        avatar: avatarUrl,
        username: name,
        account: name,
        password: pass,
        wechatId:"",
        registrationTime:"",
        updateTime:"",
        lastLoginTime:"",
        isLoggedOut: false

        // phone: phone,
        // address: address,
        // birthday: birthday,
        // hobby: hobby
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        // 根据服务器要求选择适当的 content-type
      },
      success: (res) => {
        console.log(res);
        if (res.data.msg === 1) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
          wx.switchTab({
            url: '/pages/Profile/Profile',
          });
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  }
});
