import { useEffect, useState } from "react";
import { auth } from "../api/firebase-config";
import { User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};

export default useAuth;
