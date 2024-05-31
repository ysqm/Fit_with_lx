Page({
  data: {
    content: ''
  },

  onContentInput(event) {
    this.setData({
      content: event.detail.value
    });
  },

  submitPost() {
    const { content } = this.data;
    if (!content) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }

    // 获取当前用户信息
    const newPost = {
      id: new Date().getTime(),
      username: 'Current User', // 这里应该使用实际的用户信息
      avatar: '/image/avatar1.jpg', // 确保路径正确
      content: content,
      images: [],
      likes: 0,
      liked: false,
      comments: 0
    };

    // 假设社区页面定义了一个addNewPost方法来处理新帖子的添加
    // 这里我们通过getCurrentPages()获取社区页面实例，并调用addNewPost方法
    const pages = getCurrentPages();
    const communityPage = pages[pages.length - 2];
    if (communityPage.addNewPost) {
      communityPage.addNewPost(newPost);
    }

    // 清空输入内容
    this.setData({ content: '' });

    // 返回社区页面
    wx.navigateBack();
  }
});