import axiosCreate from "react/utils/axiosRelease";

export const commentService = (Data) => {
  return axiosCreate.post("http://localhost:8080/api/v1/comments/add", {
    postId: Data.postId,
    userId: Data.userId,
    content: Data.content,
    parentCommentId: Data.parentCommentId,
  });
};