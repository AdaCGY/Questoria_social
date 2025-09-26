import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5260/api", // 後端 API 根路徑
});

export default {
  // ---------------------
  // 貼文相關
  // ---------------------
  getPosts: () => instance.get("/Posts"),
  getPostById: (id) => instance.get(`/Posts/${id}`),
  createPost: (data) => instance.post("/Posts", data),
  updatePost: (id, data) => instance.put(`/Posts/${id}`, data),
  deletePost: (id) => instance.delete(`/Posts/${id}`),
  getCommentsCount: (postId) => instance.get(`/Posts/${postId}/comments/count`),

  // 單篇詳閱
  getPostDetail: (id, memberId) =>
    instance.get(`/Posts/${id}/detail?memberId=${memberId}`),

  // 分類
  getCategories: () => instance.get("/PostCategories"),

  // ---------------------
  // 留言相關
  // ---------------------
  getComments: (postId) => instance.get(`/Comments/post/${postId}`),
  createComment: (data) => instance.post("/Comments", data),
  updateComment: (id, data) => instance.put(`/Comments/${id}`, data),
  deleteComment: (id) => instance.delete(`/Comments/${id}`),

  // ---------------------
  // 貼文點讚
  // ---------------------
  likePost: (data) => instance.post("/PostsLikes", data),
  unlikePost: (postId, memberId) => instance.delete(`/PostsLikes/${postId}/${memberId}`),
  getPostLikes: (postId) => instance.get(`/PostsLikes/${postId}`),

  // ---------------------
  // 收藏貼文
  // ---------------------
  addFavorite: (data) => instance.post("/Favorites", data),
  removeFavorite: (postId, memberId) => instance.delete(`/Favorites/${postId}/${memberId}`),
  getFavorites: (memberId) => instance.get(`/Favorites/member/${memberId}`),

  // ---------------------
  // 留言點讚
  // ---------------------
  likeComment: (data) => instance.post("/CommentLikes", data),
  unlikeComment: (commentId, memberId) => instance.delete(`/CommentLikes/${commentId}/${memberId}`),
  getCommentLikes: (commentId) =>instance.get(`/CommentLikes/count/${commentId}`),

  // ---------------------
  // 檢舉
  // ---------------------
  createReport: (data) => instance.post("/Reports", data),
  getReports: () => instance.get("/Reports"),
  getReportById: (id) => instance.get(`/Reports/${id}`),
  processReport: (data) => instance.put("/Reports/process", data),
  getReportCategories: () => instance.get("/Reports/categories"),
};


