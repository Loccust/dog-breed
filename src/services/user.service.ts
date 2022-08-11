import UserRegisterModel from "../models/RegisterUser";
import IUserData from "../types/IUserData";
import http from "./http-common";

const register = async (user: UserRegisterModel) => {
  return http.post<IUserData>("/register", user).then(
    (res) => {
      if (res.status == 200) return res.data;
      throw new Error("Error registering user");
    },
    (err) => {
      console.log(err);
      throw new Error("Error registering user");
    }
  );
};

export default {
  register,
};
