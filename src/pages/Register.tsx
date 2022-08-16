import UserRegisterModel from "../common/models/RegisterUser";
import { UserContext } from "../contexts/UserContext";
import userService from "../services/user.service";
import useModel from "../common/hooks/useModel";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  WrapItem,
  Image,
  useToast,
} from "@chakra-ui/react";

export default function Register() {
  const initialRegisterUser = new UserRegisterModel();
  const [userRegister, setUserRegister, setUserRegisterProp] =
    useModel<UserRegisterModel>(initialRegisterUser);
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const toast = useToast();
  const toastIdRef = useRef();

  const handleEmailChange = (email: string) => {
    setUserRegisterProp("email", email);
  };

  const handleRegister = async () => {
    const userResponse = await userService.register(userRegister);
    if (userResponse.status === 200) {
      setUserRegister(initialRegisterUser);
      const { token, ...userData } = userResponse.data.user;
      auth.setUser(userData);
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      console.log(userResponse.status);
      toast.call(toastIdRef, {
        title: "Erro",
        description: "Não foi possível logar/registrar o usuário",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center pt={70}>
      <Box
        width={275}
        height={300}
        alignItems="center"
        bg="white"
        boxShadow="md"
        rounded="md"
        p={5}
      >
        <Heading as="h5" size="sm" ml={65}>
          Login/Register
        </Heading>
        <Text fontSize="xs" align="center">
          Informe um email para que possa ver os doguinhos
        </Text>
        <div>
          <Image
            ml={70}
            mt={25}
            width={100}
            height={100}
            src="svg/logotype.svg"
            alt=""
          />
          <Input
            placeholder="Email"
            size="xs"
            type="email"
            id="email"
            onChange={(e) => handleEmailChange(e.target.value)}
            value={userRegister?.email}
          />
          <Button
            colorScheme="yellow"
            size="xs"
            width={235}
            mt={2}
            onClick={() => handleRegister()}
          >
            Register
          </Button>
        </div>
      </Box>
    </Center>
  );
}
