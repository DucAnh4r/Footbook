import axiosCreate from "../utils/axiosRelease";

export const userRegisterService = (userData) => {
  return axiosCreate.post("http://localhost:8080/api/v1/users/register", {
    fullName: userData.fullName,
    gender: userData.gender,
    date_of_birth: userData.date_of_birth,
    password: userData.password,
    email: userData.email,
    username: userData.username,
  });
};


export const userLoginService = (Data) => {
  return axiosCreate.post("http://localhost:8080/api/v1/users/login", {
    phone_number: Data.phone_number,
    password: Data.password
  });
};


export const userSearchService = (Data) => {
  const { keyword, page, size } = Data;
  return axiosCreate.get(`http://localhost:8080/api/v1/users/search`, {
    params: {
      keyword,
      page,
      size,
    },
  });
};

export const updateBioService = (Data, user_id) => {
  return axiosCreate.patch(`http://localhost:8080/api/v1/users/${user_id}/update-bio`, {
    bio: Data.bio,
  });
};

export const updateProfileService = (Data, user_id) => {
  const formData = new FormData();
  formData.append("profileImages", Data.profileImages);
  return axiosCreate.patch(`http://localhost:8080/api/v1/users/${user_id}/update-profile-picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};

export const updateCoverService = (Data, user_id) => {
  const formData = new FormData();
  formData.append("coverImage", Data.coverImage);
  return axiosCreate.patch(`http://localhost:8080/api/v1/users/${user_id}/update-cover-picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};