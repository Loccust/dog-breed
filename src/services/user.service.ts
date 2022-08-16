import UserRegisterModel from "../models/RegisterUser";
import {IUserData} from "../types/IUserData";
import http from "./http-common";

const register = async (user: UserRegisterModel) => {
  return await http.post<IUserData>("/register", user);
};

export default {
  register,
};
