import UserRegisterModel from "../models/RegisterUser";
import userService from "../services/user.service";
import useModel from "../hooks/useModel";
import { IUserData } from "../types/IUserData";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const initialRegisterUser = new UserRegisterModel();
  const [userRegister, setUserRegister, setUserRegisterProp] =
    useModel<UserRegisterModel>(initialRegisterUser);
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (email: string) => {
    setUserRegisterProp("email", email);
  };

  const handleRegister = async () => {
    const userResponse = await userService.register(userRegister);
    debugger;
    if (userResponse.status === 200) {
      setUserRegister(initialRegisterUser);
      const { token, ...userData } = userResponse.data.user;
      auth.setUser(userData);
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      console.log(userResponse.status);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => handleEmailChange(e.target.value)}
          value={userRegister?.email}
        />
        <button type="submit" onClick={() => handleRegister()}>
          Register
        </button>
      </div>
    </div>
  );
}
