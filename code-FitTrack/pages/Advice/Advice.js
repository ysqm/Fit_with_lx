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
      健身: ['跑步','游泳', '举重', '骑自行车', '瑜伽', '划船机', '跳绳'],
      减脂: ['跑步','游泳', '举重', '骑自行车', '瑜伽', '划船机', '跳绳'],
      学习: ['阅读书籍', '在线课程', '参加讲座', '写作', '编程练习', '学习新语言'],
      旅游: ['海边度假', '山地探险', '城市游览', '文化体验', '美食之旅', '历史遗迹'],
      美食: ['尝试新菜谱', '参观当地市场', '烘焙甜点', '品尝街头小吃', '学习食品雕刻', '制作健康餐'],
      增肌: ['健身房举铁', '高蛋白饮食', '复合训练', '肌肉群分化训练', '力量增长训练', '摄入足够卡路里', '充足休息'],
      塑形: ['普拉提', '核心强化', '身体平衡训练', '功能性运动', 'TRX悬挂训练', '体态矫正', '身体协调性训练'],
      心肺锻炼: ['有氧运动', '间歇跑', '自行车运动', '游泳', '椭圆机训练', '楼梯机训练', '户外徒步'],
      运动康复: ['物理疗法', '康复性瑜伽', '深层组织按摩', '关节灵活性训练', '运动损伤恢复', '肌肉放松技巧', '疼痛管理'],
      功能性训练: ['平衡垫训练', '敏捷梯训练', '壶铃练习', '药球投掷', '悬垂训练', '攀岩', '障碍赛训练'],
      团体运动: ['篮球', '足球', '排球', '羽毛球', '网球', '橄榄球', '团队健身课程'],
      户外活动: ['徒步旅行', '山地自行车', '越野跑', '皮划艇', '帆船', '冲浪', '攀树'],
      健身科技: ['智能手表监测', '健身APP', '虚拟现实健身', '在线私人教练', '3D体型扫描', '生物反馈训练', '电子健身设备']
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
  },
  
});
