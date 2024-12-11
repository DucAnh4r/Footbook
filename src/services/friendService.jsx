import axiosCreate from "react/utils/axiosRelease";

export const createFriendshipService = (Data) => {
    const { userId1, userId2 } = Data;
    return axiosCreate.post(`http://localhost:8080/api/v1/friendship/create`, {
        params: {
            userId1,
            userId2,
        },
    });
};

export const acceptFriendshipService = (Data) => {
    const { userId1, userId2 } = Data;
    return axiosCreate.post(`http://localhost:8080/api/v1/friendship/accept`, {
        params: {
            userId1,
            userId2,
        },
    });
};

export const deleteFriendshipService = (Data) => {
    const { userId1, userId2 } = Data;
    return axiosCreate.delete(`http://localhost:8080/api/v1/friendship/delete`, {
        params: {
            userId1,
            userId2,
        },
    });
};

export const getFriendshipStatusService = (Data) => {
    const { userId1, userId2 } = Data;
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/status`, {
        params: {
            userId1,
            userId2, //là mình
        },
    });
};

export const getFriendshipRequestService = (Data) => {
    const { userId2 } = Data;
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/received-requests`, {
        params: {
            userId2, //là mình
        },
    });
};

export const countFriendshipRequestService = (userId) => {
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/count/${userId}`, {
    });
};
