import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { userState } from "@/components/atoms/state/userAuth.State";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebase";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const setUser = useSetRecoilState(userState);
  const users = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        // console.log(users);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
