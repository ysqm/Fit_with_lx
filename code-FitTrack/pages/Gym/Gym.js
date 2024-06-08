// gym.js
const { exercises } = require('gyms.js');

Page({
  data: {
    exerciseNames: exercises.map(e => e.name),
    currentExercise: exercises[0].name,
    caloriesPerMinute: exercises[0].caloriesPerMinute,
    time: '00:00:00',
    calories: '0',
    isRunning: false,
    isPaused: false,
    startTime: 0,
    elapsedTime: 0,
    timer: null
  },

  onExerciseChange(e) {
    const index = e.detail.value;
    this.setData({
      currentExercise: exercises[index].name,
      caloriesPerMinute: exercises[index].caloriesPerMinute
    });
  },

  startPauseExercise() {
    if (this.data.isRunning) {
      // 暂停
      clearInterval(this.data.timer);
      this.setData({
        isRunning: false,
        isPaused: true
      });
    } else {
      // 开始或继续
      if (!this.data.isPaused) {
        this.resetData();
        this.setData({
          startTime: new Date().getTime()
        });
      } else {
        this.setData({
          startTime: new Date().getTime() - this.data.elapsedTime
        });
      }

      this.setData({
        isRunning: true,
        isPaused: false
      });

      this.data.timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - this.data.startTime;

        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const calories = ((elapsedTime / (1000 * 60)) * this.data.caloriesPerMinute).toFixed(2);

        this.setData({
          time: time,
          elapsedTime: elapsedTime,
          calories: calories
        });
      }, 1000);
    }
  },
    // 保存运动记录到本地缓存
    saveExerciseRecord() {
      const exerciseRecord = {
        type: this.data.currentExercise,
        duration: this.data.time,
        calories: this.data.calories,
        distance: 0
      };
  
      const existingData = wx.getStorageSync('ExerciseData') || [];
      existingData.push(exerciseRecord);
      wx.setStorageSync('ExerciseData', existingData);
  
      wx.showToast({
        title: '运动记录已保存',
        icon: 'success'
      });
    },

  stopExercise() {
    if (!this.data.isRunning && !this.data.isPaused) return;

    clearInterval(this.data.timer);
    this.setData({
      isRunning: false,
      isPaused: false,
      timer: null
    });
    this.saveExerciseRecord();
  },

  resetData() {
    this.setData({
      time: '00:00:00',
      calories: '0',
      elapsedTime: 0
    });
  }
});