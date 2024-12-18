import axiosCreate from "../utils/axiosRelease";

export const addCommentService = (Data) => {
  return axiosCreate.post("http://localhost:8080/api/v1/comments/add", {
    postId: Data.postId,
    userId: Data.userId,
    content: Data.content,
    parentCommentId: Data.parentCommentId,
  });
};

export const getCommentService = (postId) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/comments/post/${postId}`, {
    });
};

export const countCommentService = (postId) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/comments/count/${postId}`, {
    });
};

export const eidtCommentService = (Data) => {
    return axiosCreate.put("http://localhost:8080/api/v1/comments/edit", {
      commentId: Data.commentId,
      userId: Data.userId,
      newContent: Data.newContent,
    });
  };

  export const deleteCommentService = (Data) => {
    const { commentId, userId } = Data; 
    return axiosCreate.delete(`http://localhost:8080/api/v1/comments/delete`, {
      params: { 
        commentId,
        userId,
      },
    });
  };
  