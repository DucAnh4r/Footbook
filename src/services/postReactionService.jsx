import axiosCreate from "react/utils/axiosRelease";

export const addPostReactionService = (Data) => {
    return axiosCreate.post("http://localhost:8080/api/v1/postReaction/add", {
        post_id: Data.post_id,
        user_id: Data.user_id,
        reaction_type: Data.reaction_type,
    });
};

export const getPostReactionService = (post_id) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/postReaction/reactions/${post_id}`, {
    });
};

export const countPostReactionService = (post_id) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/postReaction/count-reactions/${post_id}`, {
    });
};

export const deleteCommentService = (Data) => {
    const { post_id, user_id } = Data;
    return axiosCreate.delete(`http://localhost:8080/api/v1/comments/delete`, {
        params: {
            post_id,
            user_id,
        },
    });
};
