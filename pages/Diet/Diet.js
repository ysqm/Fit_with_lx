// pages/diet/Diet.js
import * as echarts from '../../ec-canvas/echarts';
const foods = require('../../utils/foods.js');

Page({
  data: {
    breakfast: [],
    lunch: [],
    dinner: [],
    totalCalories: 0,
    startX: 0,
    startY: 0,
    weeklyCalories: new Array(7).fill(0),
    ec: {
      lazyLoad: true // 延迟加载
    }
  },

  onLoad(options) {
    this.getDietRecordsByDate();
    this.initChart();
    this.initChart2();
    this.calculateTotalCalories();
  },

  onShow() {
    this.getDietRecordsByDate();
  },

  onUnload() {
    wx.setStorageSync('dietData', {
      breakfast: this.data.breakfast,
      lunch: this.data.lunch,
      dinner: this.data.dinner,
      totalCalories: this.data.totalCalories,
    });
  },
  
  getDietRecordsByDate() {
    const date = this.getCurrentDate();
    wx.request({
      url: 'http://localhost:8080/api/diet/records',
      method: 'GET',
      data: { date: date },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const breakfast = res.data.filter(record => record.meal === 'breakfast').map(record => {
            delete record.totalCalories;
            return record;
          });
          const lunch = res.data.filter(record => record.meal === 'lunch').map(record => {
            delete record.totalCalories;
            return record;
          });
          const dinner = res.data.filter(record => record.meal === 'dinner').map(record => {
            delete record.totalCalories;
            return record;
          });
          this.setData({
            breakfast,
            lunch,
            dinner
          });
          this.calculateTotalCalories();
          this.updateWeeklyCalories();
        } else {
          wx.showToast({ title: '获取饮食记录失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },
  

  addDietRecord(record) {
    record.totalCalories = this.data.totalCalories; // 确保 totalCalories 和全局一致
    wx.request({
      url: 'http://localhost:8080/api/diet/records',
      method: 'POST',
      data: {
        date: record.date,
        meal: record.meal,
        foodname: record.foodname,
        foodquantity: record.foodquantity,
        calorieIntake: record.calorieIntake,
        totalCalories: record.totalCalories
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          this.getDietRecordsByDate();
        } else {
          wx.showToast({ title: '添加失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  updateDietRecord(id, record) {
    record.totalCalories = this.data.totalCalories; // 确保 totalCalories 和全局一致
    wx.request({
      url: `http://localhost:8080/api/diet/records/${id}`,
      method: 'PUT',
      data: record,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          this.getDietRecordsByDate();
        } else {
          wx.showToast({ title: '修改失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  deleteDietRecord(id) {
    wx.request({
      url: `http://localhost:8080/api/diet/records/${id}`,
      method: 'DELETE',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200 || res.statusCode === 204) {
          this.getDietRecordsByDate();
        } else {
          wx.showToast({ title: '删除失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  inputFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const field = event.currentTarget.dataset.field;
    const value = event.detail.value;

    // 更新record中对应属性的值
    const record = this.data[meal][index];
    record[field] = value;

    // 计算并更新calorieIntake属性
    record.calorieIntake = this.calculateCalorieIntake(record.foodname, record.foodquantity);

    // 更新相应的数据
    this.setData({
      [`${meal}[${index}].${field}`]: value,
      [`${meal}[${index}].calorieIntake`]: record.calorieIntake, // 更新calorieIntake属性
    });

    // 每次输入都重新计算总热量
    this.calculateTotalCalories();
  },

  blurFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const record = this.data[meal][index];

    if (!record.id) {
      this.addDietRecord(record);
    } else {
      this.updateDietRecord(record.id, record);
    }
  },

  addFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const newFood = {
      date: this.getCurrentDate(),
      meal: meal,
      foodname: '',
      foodquantity: 0,
      calorieIntake: 0,
      totalCalories: this.data.totalCalories // 初始化时与全局一致
    };
    this.setData({
      [meal]: [...this.data[meal], newFood],
    });
  },

  deleteFood(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const foods = this.data[meal];
    const foodId = foods[index].id;

    if (foodId) {
      this.deleteDietRecord(foodId);
    }

    foods.splice(index, 1);
    this.setData({
      [meal]: foods,
    });
    this.calculateTotalCalories();
  },

  calculateTotalCalories() {
    let total = 0;
    ['breakfast', 'lunch', 'dinner'].forEach(meal => {
      this.data[meal].forEach(record => {
        total += this.calculateCalorieIntake(record.foodname, record.foodquantity);
      });
    });
    this.setData({
      totalCalories: total
    });
  },

  calculateCalorieIntake(foodname, foodquantity) {
    const food = foods.find(item => item.name === foodname);
    if (food) {
      return food.calories * foodquantity;
    } else {
      return 0;
    }
  },

  getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
      const totalCalories = breakfastCalories+lunchCalories+dinnerCalories;

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
                  return '早餐\n' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
                }
              }
            },
            {
              value: lunchCalories,
              name: '午餐',
              label: {
                formatter: function (params) {
                  return '午餐\n ' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
                }
              }
            },
            {
              value: dinnerCalories,
              name: '晚餐',
              label: {
                formatter: function (params) {
                  return '晚餐\n ' + ((params.value / totalCalories) * 100).toFixed(2) + '%';
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
      const food = foods.find(food => food.name === item.foodname);
      if (food) {
        total += food.calories * parseInt(item.foodquantity);
      }
    });
    return total;
  },

  getWeekDates() {
    const currentDate = new Date();
    const weekDates = [];
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() - dayOfWeek + 1); // Monday as start of the week

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }

    return weekDates;
  },

  initChart2() {
    this.selectComponent('#mychart2').init((canvas, width, height) => {
      const chart2 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart2);

      const option = {
        title: {
          text: '本周热量摄入',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.getWeekDates()
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} kcal'
          }
        },
        series: [{
          data: this.data.weeklyCalories,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }]
      };

      chart2.setOption(option);
      this.chart2 = chart2;
      this.updateChart2();
      return chart2;
    });
  },

  updateChart2() {
    if (this.chart2) {
      this.chart2.setOption({
        series: [{
          data: this.data.weeklyCalories
        }]
      });
    }
  },

  updateWeeklyCalories() {
    const weekDates = this.getWeekDates();
    const weeklyCalories = new Array(7).fill(0);

    // Fetch the data for the current week
    weekDates.forEach((date, index) => {
      wx.request({
        url: 'http://localhost:8080/api/diet/records',
        method: 'GET',
        data: { date: `${new Date().getFullYear()}-${date.replace('/', '-')}` },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (res.statusCode === 200 && Array.isArray(res.data)) {
            let totalCalories = 0;
            res.data.forEach(record => {
              totalCalories += record.calorieIntake;
            });
            weeklyCalories[index] = totalCalories;
          } else {
            weeklyCalories[index] = 0; // 如果没有数据则设置为0
          }
          this.setData({ weeklyCalories }, this.updateChart);
        },
        fail: () => {
          weeklyCalories[index] = 0; // 请求失败也设置为0
          this.setData({ weeklyCalories }, this.updateChart);
          wx.showToast({ title: '网络请求失败', icon: 'none' });
        }
      });
    });
  },

  touchStart(event) {
    this.data.startX = event.changedTouches[0].clientX;
    this.data.startY = event.changedTouches[0].clientY;
  },

  touchMove(event) {
    const meal = event.currentTarget.dataset.meal;
    const index = event.currentTarget.dataset.index;
    const moveX = event.changedTouches[0].clientX;
    const moveY = event.changedTouches[0].clientY;
    const disX = this.data.startX - moveX;
    const disY = this.data.startY - moveY;
    if (Math.abs(disX) > Math.abs(disY) && disX < -10) {
      const foods = this.data[meal];
      foods.splice(index, 1);
      this.setData({
        [meal]: foods,
      });
      this.calculateTotalCalories();
    }
  },
});