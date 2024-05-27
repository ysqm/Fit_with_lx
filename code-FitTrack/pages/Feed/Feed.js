Page({
  data: {
    posts: [
      {
        id: 1,
        username: 'User1',
        avatar: '/image/avatar1.jpg',
        content: '今天完成了一次很棒的健身训练！',
        images: ['/image/workout.jpg'],
        likes: 10,
        liked: false,
        comments: 5
      },
      {
        id: 2,
        username: 'User2',
        avatar: '/image/avatar1.jpg',
        content: '分享一张我减肥后的照片，感觉自己焕然一新！',
        images: ['/image/after.jpg'],
        likes: 20,
        liked: false,
        comments: 8
      },
      // 添加更多用户分享的内容
    ]
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
      url: `/pages/comment/comment?postId=${postId}`
    });
  },

  // 跳转至发表新帖页面
  goToNewPost() {
    wx.navigateTo({
      url: '/pages/Post/Post'
    });
  }
});
