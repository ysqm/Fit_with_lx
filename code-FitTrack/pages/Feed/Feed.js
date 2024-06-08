Page({
  data: {
    posts: [
      {
        id: 1,
        username: '刘旭',
        avatar: '/image/avatar1.jpg',
        content: '今天完成了一次很棒的健身训练！',
        images: ['/image/workout.jpg'],
        likes: 10,
        liked: false,
        comments: 3
      },
      {
        id: 2,
        username: '曹浩',
        avatar: '/image/avatar1.jpg',
        content: '分享一张我减肥后的照片，感觉自己焕然一新！',
        images: ['/image/after.jpg'],
        likes: 20,
        liked: false,
        comments: 3
      },
      {
        id: 3,
        username: '管理员',
        avatar: '/image/avatar1.jpg',
        content: '欢迎来到社区！',
        likes: 0,
        liked: false,
        comments: 0
      },
      {
        id: 4,
        username: '杨明鑫',
        avatar: '/image/avatar1.jpg',
        content: '一起健身',
        likes: 10,
        liked: false,
        comments: 0
      },
      // 添加更多用户分享的内容
    ],
    originalPosts: [], // 用于存储原始帖子列表的副本
    filteredPosts: [], // 用于存储过滤后的帖子列表
    searchKeyword: '', // 用于存储搜索关键字
  },
  
  onShow: function() {
    // 保存原始帖子列表的副本
    this.setData({
      originalPosts: this.data.posts.slice(), // 使用slice()深拷贝数组
      filteredPosts: this.data.posts.slice() // 初始化filteredPosts
    });
  },
  // 这个方法将被post.js调用，以添加新帖子到列表
  addNewPost(newPost) {
    this.setData({
      posts: [newPost, ...this.data.posts] // 将新帖子添加到帖子列表的开头
    });
    // 重置displayedPosts以显示更新后的帖子列表
    this.setData({ displayedPosts: this.data.posts });
  },

  // 搜索帖子
  searchPosts: function(event) {
    const keyword = event.detail.value.trim(); // 获取输入值并去除前后空格
    this.setData({
      searchKeyword: keyword
    });

    if (keyword === '') {
      // 如果搜索框为空，恢复到原始帖子列表
      this.setData({
        filteredPosts: this.data.originalPosts.slice() // 使用slice()深拷贝数组
      });
    } else {
      // 如果搜索框不为空，过滤帖子
      this.filterPosts();
    }
  },

  // 过滤帖子
  filterPosts: function() {
    const keyword = this.data.searchKeyword.toLowerCase();
    const filtered = this.data.originalPosts.filter(post => {
      return post.username.toLowerCase().includes(keyword) ||
             post.content.toLowerCase().includes(keyword);
    });
    this.setData({ filteredPosts: filtered });
  },
  // 点赞功能
  likePost(event) {
    const postId = event.currentTarget.dataset.postid;
    const posts = this.data.posts.map(post => {
      if (post.id === postId) {
        post.liked = !post.liked;
        if (post.liked) {
          post.likes++;
        } else {
          post.likes--;
        }
      }
      return post;
    });
    this.setData({ posts });
  },

  // 跳转至评论页面
  goToComment(event) {
    const postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `/pages/Comment/Comment?postId=${postId}`
    });
  },

  // 跳转至发表新帖页面
  goToNewPost() {
    wx.navigateTo({
      url: '/pages/Post/Post'
    });
  }
});

