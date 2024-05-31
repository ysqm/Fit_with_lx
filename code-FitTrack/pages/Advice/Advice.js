Page({
  data: {
    userInput: '',
    suggestions: []
  },

  onInput(event) {
    this.setData({
      userInput: event.detail.value
    });
  },

  generateSuggestions() {
    const { userInput } = this.data;
    if (!userInput) {
      wx.showToast({
        title: '请输入您的需求',
        icon: 'none'
      });
      return;
    }

    // 假设调用一个 API 获取智能建议，这里使用模拟数据
    const suggestions = this.getMockSuggestions(userInput);

    this.setData({ suggestions });
  },

  getMockSuggestions(userInput) {
    // 根据用户输入返回模拟建议数据
    const allSuggestions = {
      健身: ['跑步', '举重', '骑自行车', '瑜伽', '划船机', '跳绳'],
      学习: ['阅读书籍', '在线课程', '参加讲座', '写作', '编程练习', '学习新语言'],
      旅游: ['海边度假', '山地探险', '城市游览', '文化体验', '美食之旅', '历史遗迹'],
      美食: ['尝试新菜谱', '参观当地市场', '烘焙甜点', '品尝街头小吃', '学习食品雕刻', '制作健康餐']
    };

    let suggestions = [];
    for (const [key, value] of Object.entries(allSuggestions)) {
      if (userInput.includes(key)) {
        suggestions = value;
        break;
      }
    }

    if (suggestions.length === 0) {
      suggestions = ['暂无相关建议，请尝试其他关键词'];
    }

    return suggestions;
  }
});
