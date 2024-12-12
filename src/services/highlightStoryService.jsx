import axiosCreate from "react/utils/axiosRelease";

export const createHighlightStoryService = (Data) => {
    const formData = new FormData();
    formData.append("userId", Data.userId);
    formData.append("storyName", Data.storyName);
    if (Array.isArray(Data.images)) {
        Data.images.forEach((image) => {
            formData.append("images", image);
        });
    } else {
        formData.append("images", Data.images);
    }

    return axiosCreate.post("http://localhost:8080/api/v1/highlightStory/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateHighlightStoryNameService = (Data, Hls_id) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/highlightStory/updateName/${Hls_id}`, {
        story_name: Data.story_name,
    });
};

export const deleteHighlightStoryImageService = (Hls_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/delete/${Hls_id}`, {
    });
};

export const getAllHighlightStoryService = (user_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/allDetails/${user_id}`, {
    });
};

export const getDetailHighlightStoryImageService = (Hls_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/getDetail/${Hls_id}`, {
    });
};
