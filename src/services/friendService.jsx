import axiosCreate from "react/utils/axiosRelease";

export const createFriendshipService = (Data) => {//gui loi moi
    const { userId1, userId2 } = Data;
    return axiosCreate.post(`http://localhost:8080/api/v1/friendship/create`, {
        params: {
            userId1,//minh
            userId2,//no
        },
    });
};

export const acceptFriendshipService = (Data) => {//chap nhan ban
    const { userId1, userId2 } = Data;
    return axiosCreate.put(`http://localhost:8080/api/v1/friendship/accept`, {
        params: {
            userId1,//no
            userId2,//minh
        },
    });
};

export const deleteFriendshipService = (Data) => {//xoa ban
    const { userId1, userId2 } = Data;
    return axiosCreate.delete(`http://localhost:8080/api/v1/friendship/delete`, {
        params: {
            userId1,//minh
            userId2,//no
        },
    });
};

export const getFriendshipStatusService = (Data) => {//pending, accept, block
    const { userId1, userId2 } = Data;
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/status`, {
        params: {
            userId1, //minh
            userId2, //no
        },
    });
};

export const getFriendshipRequestService = (Data) => {//hien thi danh sach pendin
    const { userId2 } = Data;
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/received-requests`, {
        params: {
            userId2, //là mình
        },
    });
};
//sender

export const countFriendService = (userId) => {//dem so ban
    return axiosCreate.get(`http://localhost:8080/api/v1/friendship/count/${userId}`, {
    });
};
