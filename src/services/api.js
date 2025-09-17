import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5260/api", // 後端 API 根路徑
});

// ---------------------
// 貼文相關
// ---------------------
export const getPosts = () => api.get("/Posts");
export const getPostById = (id) => api.get(`/Posts/${id}`);
export const createPost = (data) => api.post("/Posts", data);
export const updatePost = (id, data) => api.put(`/Posts/${id}`, data);
export const deletePost = (id) => api.delete(`/Posts/${id}`);

export const getCategories = () => api.get("/PostCategories");

// ---------------------
// 留言相關
// ---------------------
export const getComments = (postId) => api.get(`/Comments/post/${postId}`);
export const createComment = (data) => api.post("/Comments", data);
export const deleteComment = (id) => api.delete(`/Comments/${id}`);

// ---------------------
// 貼文點讚
// ---------------------
export const likePost = (data) => api.post("/PostsLikes", data);
export const unlikePost = (id) => api.delete(`/PostsLikes/${id}`);
export const getPostLikes = (postId) => api.get(`/PostsLikes/${postId}`);

// ---------------------
// 收藏貼文
// ---------------------
export const addFavorite = (data) => api.post("/Favorites", data);
export const removeFavorite = (id) => api.delete(`/Favorites/${id}`);
export const getFavorites = (memberId) => api.get(`/Favorites/member/${memberId}`);

// ---------------------
// 留言點讚
// ---------------------
export const likeComment = (data) => api.post("/CommentLikes", data);
export const unlikeComment = (id) => api.delete(`/CommentLikes/${id}`);
export const getCommentLikes = (commentId) => api.get(`/CommentLikes/count/${commentId}`);

// ---------------------
// 檢舉
// ---------------------
export const createReport = (data) => api.post("/Reports", data);
export const getReports = () => api.get("/Reports");
export const getReportById = (id) => api.get(`/Reports/${id}`);
export const processReport = (data) => api.put("/Reports/process", data);

export default api;
