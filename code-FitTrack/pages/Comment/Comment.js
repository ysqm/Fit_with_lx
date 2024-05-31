Page({
  data: {
    postId: null,
    comments: [],
    newComment: ''
  },

  onLoad(options) {
    const { postId } = options;
    this.setData({ postId });
    this.loadComments(postId);
  },

  loadComments(postId) {
    // 假设从服务器获取评论数据，这里使用模拟数据
    const comments = [
      {
        id: 1,
        username: 'User1',
        avatar: '/image/avatar1.jpg',
        content: '这是一个很棒的帖子！'
      },
      {
        id: 2,
        username: 'User2',
        avatar: '/image/avatar1.jpg',
        content: '谢谢你的分享！'
      },
      // 添加更多评论
    ];

    this.setData({ comments });
  },

  onCommentInput(event) {
    this.setData({
      newComment: event.detail.value
    });
  },

  submitComment() {
    const { newComment, comments, postId } = this.data;
    if (!newComment) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      });
      return;
    }

    const newCommentData = {
      id: new Date().getTime(),
      username: 'Current User',
      avatar: '/image/avatar1.jpg',
      content: newComment
    };

    this.setData({
      comments: [...comments, newCommentData],
      newComment: ''
    });

    // 更新社区页面的评论数
    const pages = getCurrentPages();
    const communityPage = pages[pages.length - 2];
    const posts = communityPage.data.posts.map(post => {
      if (post.id === postId) {
        post.comments++;
      }
      return post;
    });
    communityPage.setData({ posts });
  }
});
