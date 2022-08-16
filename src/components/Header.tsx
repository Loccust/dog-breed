import {
  Box,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const isLogged = !!localStorage.getItem("token");
  const { user } = useContext(UserContext);
  const email = user?.email;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {isLogged && (
        <Box
          bg="#F5F2EA"
          w="100%"
          h={45}
          p="fixed"
          pt={1}
          px={3}
          justifyContent="space-between"
          display="flex"
        >
          <Image src="svg/logo.svg" boxSize={35} ml={10} />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaUserCircle />}
              variant="outline"
              _hover={{ bg: "gray.200" }}
              _expanded={{ bg: "yellow.400" }}
              _focus={{ boxShadow: "outline" }}
            />
            <MenuList>
              <MenuGroup title={email || "Profile"}>
                <MenuDivider />
                <MenuItem
                  icon={<MdLogout />}
                  _focus={{ bg: "gray.200" }}
                  onClick={() => logout()}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      )}
    </>
  );
};
export default Header;
