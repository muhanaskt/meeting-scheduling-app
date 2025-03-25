import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/authAtoms";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [, setUserState] = useAtom(userAtom);
 

  useEffect(() => {
    const token = localStorage.getItem("token");

     if (token) {
      const user = jwtDecode(token);
      setUserState({ isLoggedIn: true, user });
    } else {
      setUserState({ isLoggedIn: false, user: null });
    }
  }, []);

  return children;
};

export default AuthProvider;
