// summary.js
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    stats: [],
    Time: '0h0m',
    Distance: '0.00 km',
    Calories: '0 kcal',
    exerciseData: [],
    ec: {
      lazyLoad: true // 延迟加载
    }
  },

  onLoad: function() {
    const storageData = wx.getStorageSync('ExerciseData') || [];
    let totalTime = 0, totalDistance = 0, totalCalories = 0;

    storageData.forEach(item => {
      // 转换时长为毫秒
      const duration = typeof item.duration === 'string' ? this.parseDuration(item.duration) : item.duration;
      totalTime += duration || 0;

      // 转换距离为浮点数
      const distance = parseFloat(item.distance) || 0;
      totalDistance += distance;

      // 转换热量为浮点数
      const calories = parseFloat(item.calories) || 0;
      totalCalories += calories;
    });

    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));

    this.setData({
      exerciseData: storageData,
      Time: `${hours}h${minutes}m`,
      Distance: `${totalDistance.toFixed(2)} km`,
      Calories: `${totalCalories.toFixed(2)} kcal`
    });

  },

  onReady() {
    this.initChart();
  },
  parseDuration(durationStr) {
    const parts = durationStr.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  },

  initChart() {
    this.selectComponent('#mychart').init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);

      const exerciseData = this.data.exerciseData.reduce((acc, item) => {
        const type = item.type || '其他';
        if (!acc[type]) {
          acc[type] = 0;
        }
        acc[type] += parseFloat(item.calories) || 0;
        return acc;
      }, {});

      const data = Object.keys(exerciseData).map(key => ({
        value: exerciseData[key],
        name: key
      }));

      const option = {
        title: {
          text: '热量消耗分布',
          left: 'center'
        },
        series: [{
          name: '热量消耗',
          type: 'pie',
          radius: '55%',
          data: data,
          label: {
            formatter: '{b}: {d}%'
          }
        }]
      };

      chart.setOption(option);
      return chart;
    });
  }
});
