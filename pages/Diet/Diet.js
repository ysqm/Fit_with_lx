// pages/diet/Diet.js
import * as echarts from '../../ec-canvas/echarts';
const foods = require('../../utils/foods.js');
//获取页面栈
var pages = getCurrentPages();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    breakfast: [],
    lunch: [],
    dinner: [],
    totalCalories: 0,
    startX: 0,
    startY: 0,
    ec: {
      lazyLoad: true // 延迟加载
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储中获取食物记录
    const storageData = wx.getStorageSync('dietData');
    if (storageData) {
      this.setData({
        breakfast: storageData.breakfast || [],
        lunch: storageData.lunch || [],
        dinner: storageData.dinner || [],
        totalCalories: storageData.totalCalories || 0,
      });  

    }
    // 初始化饼图
    this.initChart();
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
    // 页面卸载时将食物记录存储到本地存储
    wx.setStorageSync('dietData', {
      breakfast: this.data.breakfast,
      lunch: this.data.lunch,
      dinner: this.data.dinner,
      totalCalories: this.data.totalCalories,
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

  },

  initChart() {
    this.selectComponent('#mychart').init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);

      const breakfastCalories = this.getTotalCalories(this.data.breakfast);
      const lunchCalories = this.getTotalCalories(this.data.lunch);
      const dinnerCalories = this.getTotalCalories(this.data.dinner);
      const totalCalories = this.data.totalCalories;

      const option = {
        title: {
          text: '饮食摄入比例',
          left: 'center'
        },
        series: [{
          name: '摄入比例',
          type: 'pie',
          radius: '55%',
          data: [
            {
              value: breakfastCalories,
              name: '早餐',
              label: {
                formatter: function (params) {
                  return '早餐 ' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
                }
              }
            },
            {
              value: lunchCalories,
              name: '午餐',
              label: {
                formatter: function (params) {
                  return '午餐 ' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
                }
              }
            },
            {
              value: dinnerCalories,
              name: '晚餐',
              label: {
                formatter: function (params) {
                  return '晚餐 ' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
                }
              }
            }
          ]
        }]
      };

      chart.setOption(option);
      return chart;
    });
  },

  getTotalCalories(meal) {
    let total = 0;
    meal.forEach(item => {
      const food = foods.find(food => food.name === item.name);
      if (food) {
        total += food.calories * parseInt(item.quantity);
      }
    });
    return total;
  },
  
  // 输入食物名称和数量
  inputFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const field = event.currentTarget.dataset.field;
    const value = event.detail.value;
    this.setData({
      [`${meal}[${index}].${field}`]: value,
    });
    // 计算总热量
    this.calculateTotalCalories();
  },

  // 添加食物
  addFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const newFood = { name: '', quantity: '' };
    this.setData({
      [meal]: [...this.data[meal], newFood],
    });
  },

  // 删除食物
  deleteFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const foods = this.data[meal];
    foods.splice(index, 1);
    this.setData({
      [meal]: foods,
    });
    // 计算总热量
    this.calculateTotalCalories();
  },

  // 计算总热量
  calculateTotalCalories() {
    let total = 0;
    const meals = ['breakfast', 'lunch', 'dinner'];

    meals.forEach(meal => {
      this.data[meal].forEach(item => {
        const food = foods.find(food => food.name === item.name);
        if (food) {
          total += (food.calories * item.quantity);
        }
      });
    });

    this.setData({
      totalCalories: total
    });
    
  },

  // 触摸开始
  touchStart(event) {
    this.data.startX = event.changedTouches[0].clientX;
    this.data.startY = event.changedTouches[0].clientY;
  },

  // 触摸移动
  touchMove(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const moveX = event.changedTouches[0].clientX;
    const moveY = event.changedTouches[0].clientY;
    const disX = this.data.startX - moveX;
    const disY = this.data.startY - moveY;
    if (Math.abs(disX) > Math.abs(disY) && disX < -10) {
      // 右滑删除
      const foods = this.data[meal];
      foods.splice(index, 1);
      this.setData({
        [meal]: foods,
      });
      // 计算总热量
      this.calculateTotalCalories();
    }
  },
})

