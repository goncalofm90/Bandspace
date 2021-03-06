import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_LIKES_COMMENT,
} from "./constants";
import { setAlert } from "./alert";

//get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//get single post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Discussion deleted.", "danger"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/posts/", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Discussion added.", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added.", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//remove comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment removed.", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

//like comment
export const addLikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/comment/like/${postId}/${commentId}`
    );
    dispatch({
      type: UPDATE_LIKES_COMMENT,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "addLikeComment error", status: "404" },
    });
  }
};

//Unlike Comment
export const removeLikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/comment/unlike/${postId}/${commentId}`
    );
    dispatch({
      type: UPDATE_LIKES_COMMENT,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: "removeLikeComment error", status: "404" },
    });
  }
};
