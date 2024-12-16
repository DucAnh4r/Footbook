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

export const createHighlightStoryImageService = (Data, hls_id) => {
    const formData = new FormData();
    if (Array.isArray(Data.images)) {
        Data.images.forEach((image) => {
            formData.append("images", image);
        });
    } else {
        formData.append("images", Data.images);
    }

    return axiosCreate.post(`http://localhost:8080/api/v1/highlightStoryImage/add/${hls_id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateHighlightStoryNameService = (Data, hls_id) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/highlightStory/updateName/${hls_id}`, {
        story_name: Data.story_name,
    });
};

export const deleteHighlightStoryService = (hls_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/delete/${hls_id}`, {
    });
};

export const deleteHighlightStoryImageService = (image_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStoryImage/softDelete/${image_id}`, {
    });
};

export const getAllHighlightStoryService = (user_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/allDetails/${user_id}`, {
    });
};

export const getDetailHighlightStoryImageService = (hls_id) => {
    return axiosCreate.delete(`http://localhost:8080/api/v1/highlightStory/getDetail/${hls_id}`, {
    });
};
