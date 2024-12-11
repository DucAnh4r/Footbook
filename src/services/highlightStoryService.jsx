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
