
// pages/FitnessGoal/FitnessGoal.js
Page({
  data: {
    goals: ['增肌', '减脂', '塑形', '增强体能'],
    goalIndex: 0,
    height: '',
    weight: '',
    bodyFat: '',
    exerciseDuration: ''
  },

  // 切换健身目标类型
  changeGoalType(e) {
    this.setData({
      goalIndex: e.detail.value
    });
  },

  // 输入目标身高
  inputHeight(e) {
    this.setData({
      height: e.detail.value
    });
  },

  // 输入目标体重
  inputWeight(e) {
    this.setData({
      weight: e.detail.value
    });
  },

  // 输入目标体脂率
  inputBodyFat(e) {
    this.setData({
      bodyFat: e.detail.value
    });
  },

  // 输入目标运动时长
  inputExerciseDuration(e) {
    this.setData({
      exerciseDuration: e.detail.value
    });
  },

  // 确认健身目标
  confirmGoal() {
    const { goalIndex, height, weight, bodyFat, exerciseDuration } = this.data;
    const selectedGoal = this.data.goals[goalIndex];
    wx.showToast({
      title: `您选择了${selectedGoal}，目标身高为${height}cm，目标体重为${weight}kg，目标体脂率为${bodyFat}%，目标运动时长为${exerciseDuration}分钟`,
      icon: 'none'
    });
    // 这里可以将目标数据保存或传递给后端进行处理
  }
});
