import axiosCreate from "react/utils/axiosRelease";

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