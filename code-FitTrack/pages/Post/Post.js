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
      username: 'Current User',
      avatar: '/images/avatar1.jpg',
      content: content,
      images: [],
      likes: 0,
      liked: false,
      comments: 0
    };

    // 获取社区页面实例
    const pages = getCurrentPages();
    const communityPage = pages[pages.length - 2];

    // 更新社区页面的帖子列表
    communityPage.setData({
      posts: [newPost, ...communityPage.data.posts]
    });

    wx.navigateBack();
  }
});
