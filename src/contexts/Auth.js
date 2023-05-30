import { createContext, useState, useEffect } from "react";
import destr from "destr";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const { pathname } = router;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const res = destr(
      window !== "undefined" && window.localStorage.getItem("user")
    );
    console.log(res);
    if (res) {
      setUser(res);
    } else {
      router.push("/auth");
      setUser(null);
      if (pathname !== "/auth") {
        toast({
          title: "Please login",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [pathname]);

  const logout = () => {
    router.push("/auth");
    window.localStorage.removeItem("user");
    toast({
      title: "Bye, see you soon",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setUser(null);

    return;
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
