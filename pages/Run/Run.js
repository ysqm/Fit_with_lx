// run.js
Page({
  data: {
    time: '00:00:00', // 初始时间
    distance: '0.00', // 初始里程
    calories: '0', // 初始热量消耗
    isRunning: false, // 是否在跑步中
    isPaused: false, // 是否暂停
    startTime: 0, // 跑步开始时间
    elapsedTime: 0, // 已经经过的时间
    timer: null, // 定时器
    lastPosition: null, // 上一次获取的位置
    latitude: 0, // 当前纬度
    longitude: 0, // 当前经度
    polyline: [] // 轨迹线
  },

  // 开始跑步
  startRunning() {
    this.resetData();
    this.setData({
      isRunning: true,
      isPaused: false,
      startTime: new Date().getTime() - this.data.elapsedTime
    });

    // 获取位置权限
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.startLocationUpdates();
            },
            fail: () => {
              wx.showToast({
                title: '请授权位置权限',
                icon: 'none'
              });
            }
          });
        } else {
          this.startLocationUpdates();
        }
      }
    });

    // 定时器，每秒更新一次时间
    this.data.timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - this.data.startTime;

      // 计算时间
      const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      // 格式化时间
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.setData({
        time: time,
        elapsedTime: elapsedTime
      });
    }, 1000);
  },

  // 暂停跑步
  pauseRunning() {
    clearInterval(this.data.timer);
    this.setData({
      isRunning: false,
      isPaused: true
    });
    wx.stopLocationUpdate();
  },

  // 继续跑步
  resumeRunning() {
    this.setData({
      isRunning: true,
      isPaused: false,
      startTime: new Date().getTime() - this.data.elapsedTime
    });

    this.startLocationUpdates();

    // 定时器，每秒更新一次时间
    this.data.timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - this.data.startTime;

      // 计算时间
      const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      // 格式化时间
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.setData({
        time: time,
        elapsedTime: elapsedTime
      });
    }, 1000);
  },

  // 结束跑步
  stopRunning() {
    clearInterval(this.data.timer);
    this.setData({
      isRunning: false,
      isPaused: false,
      timer: null
    });
    wx.stopLocationUpdate();
    this.saveExerciseRecord();
  },

  // 重置数据
  resetData() {
    this.setData({
      time: '00:00:00',
      distance: '0.00',
      calories: '0',
      elapsedTime: 0,
      lastPosition: null,
      polyline: []
    });
  },
    // 保存运动记录到本地缓存
    saveExerciseRecord() {
      const exerciseRecord = {
        type: '跑步',
        duration: this.data.time,
        calories: this.data.calories,
        distance: this.data.distance
      };
  
      const existingData = wx.getStorageSync('ExerciseData') || [];
      existingData.push(exerciseRecord);
      wx.setStorageSync('ExerciseData', existingData);
  
      wx.showToast({
        title: '运动记录已保存',
        icon: 'success'
      });
    },

  // 开始位置更新
  startLocationUpdates() {
    wx.startLocationUpdate({
      success: () => {
        wx.onLocationChange(this.updateDistance);
      },
      fail: () => {
        wx.showToast({
          title: '无法获取位置信息',
          icon: 'none'
        });
      }
    });
  },

  // 更新距离和轨迹
  updateDistance(position) {
    if (!this.data.lastPosition) {
      this.setData({
        lastPosition: position,
        latitude: position.latitude,
        longitude: position.longitude
      });
      return;
    }

    const distance = this.calculateDistance(
      this.data.lastPosition.latitude,
      this.data.lastPosition.longitude,
      position.latitude,
      position.longitude
    );

    const newDistance = (parseFloat(this.data.distance) + distance).toFixed(2);
    const newCalories = (newDistance * 60).toFixed(2); // 假设消耗60千卡每公里

    this.setData({
      distance: newDistance,
      calories: newCalories,
      lastPosition: position,
      latitude: position.latitude,
      longitude: position.longitude,
      polyline: [{
        points: [...(this.data.polyline[0] ? this.data.polyline[0].points : []), {
          latitude: position.latitude,
          longitude: position.longitude
        }],
        color: "#FF0000DD",
        width: 4
      }]
    });
  },

  // 计算两点之间的距离（公里）
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（公里）
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a=
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
},

// 角度转换为弧度
toRad(degrees) {
  return degrees * Math.PI / 180;
},

onUnload() {
  // 页面卸载时清除定时器和停止位置更新
  if (this.data.timer) {
    clearInterval(this.data.timer);
  }
  wx.stopLocationUpdate();
}
});