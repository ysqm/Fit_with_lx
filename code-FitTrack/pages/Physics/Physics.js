// pages/Physics/Physics.js
Page({
  data: {
    score: '', // BMI值
    physicalCondition: '', // 身体状况
    weightStandard: '', // 身高标准体重
    danger: '', // 相关疾病发病危险性
    index: 0, // 标准选择器的索引
    array: ['中国', '国际', '亚洲'], // 标准选择器的选项
    charLt: '<', // 小于符号
    height: '', // 输入的身高
    weight: '', // 输入的体重
    standards: [ // 不同标准的BMI值和身体状况
      [
        { bmi: '18.5', condition: '偏瘦' },
        { bmi: '18.5～23.9', condition: '正常' },
        { bmi: '24～27.9', condition: '偏胖' },
        { bmi: '≥28', condition: '肥胖' }
      ],
      [
        { bmi: '18.5', condition: '偏瘦' },
        { bmi: '18.5～24.9', condition: '正常' },
        { bmi: '25～29.9', condition: '偏胖' },
        { bmi: '30.0～34.9', condition: '肥胖' },
        { bmi: '35.0～39.9', condition: '重度肥胖' },
        { bmi: '≥40.0', condition: '极重度肥胖' }
      ],
      [
        { bmi: '18.5', condition: '偏瘦' },
        { bmi: '18.5～22.9', condition: '正常' },
        { bmi: '23～24.9', condition: '偏胖' },
        { bmi: '25～29.9', condition: '肥胖' },
        { bmi: '≥30', condition: '重度肥胖' }
      ]
    ]
  },

  bindKeyHightInput(e) {
    this.setData({
      height: e.detail.value
    });
  },

  bindKeyWeightInput(e) {
    this.setData({
      weight: e.detail.value
    });
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
  },

  calculateBtn() {
    const height = parseFloat(this.data.height);
    const weight = parseFloat(this.data.weight);
    const index = this.data.index;

    if (isNaN(height) || isNaN(weight)) {
      wx.showToast({
        title: '请输入有效的身高和体重',
        icon: 'none'
      });
      return;
    }

    const standards = this.data.standards[index];
    const bmi = (weight / (height / 100) ** 2).toFixed(1);
    let physicalCondition = '';
    let weightStandard = '';

    for (let i = 0; i < standards.length; i++) {
      const standard = standards[i];
      const range = standard.bmi.split('～');

      if (range.length === 1) {
        if (bmi < parseFloat(range[0])) {
          physicalCondition = standard.condition;
          weightStandard = '-';
          break;
        }
      } else {
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1]);

        if (bmi >= min && bmi <= max) {
          physicalCondition = standard.condition;
          weightStandard = `${(min * (height / 100) ** 2).toFixed(1)}～${(max * (height / 100) ** 2).toFixed(1)}`;
          break;
        }
      }
    }

    let danger = '';

    if (bmi >= 28) {
      danger = '高';
    } else if (bmi >= 24) {
      danger = '中';
    } else {
      danger = '低';
    }

    this.setData({
      score: bmi,
      physicalCondition: physicalCondition,
      weightStandard: weightStandard,
      danger: danger
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储中获取身体记录
    const storageData = wx.getStorageSync('PhysicsData');
    if (storageData) {
      this.setData({
        score: storageData.score,
        physicalCondition: storageData.physicalCondition,
        weightStandard: storageData.weightStandard,
        danger: storageData.danger,
        index: storageData.index
      });    
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时将身体记录存储到本地存储
    wx.setStorageSync('PhysicsData', {
      score: this.data.score,
      physicalCondition: this.data.physicalCondition,
      weightStandard: this.data.weightStandard,
      danger: this.data.danger,
      index: this.data.index
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});