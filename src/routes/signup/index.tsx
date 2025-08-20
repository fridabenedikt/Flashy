import styles from "./SignUp.module.css";
import { useState } from "react";
import db, { auth } from "~/src/api/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "~/src/components/Button";
import { getUsers } from "~/src/api/users";
import StatusMessage from "~/src/components/StatusMessage";
import { useQuery } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const UserQuery = useQuery({
    queryKey: ["User"],
    queryFn: getUsers,
  });

  if (UserQuery.isLoading) {
    return <StatusMessage loading />;
  }

  if (UserQuery.isError) {
    return <StatusMessage error message={UserQuery.error?.message} />;
  }

  if (!UserQuery.data) {
    return <StatusMessage error message="Undefined data" />;
  }

  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredendential) => {
        navigate("/");
        return setDoc(doc(db, "users", userCredendential.user.uid), {
          name: auth.currentUser?.email,
          age: 0,
          adminID: "undefined",
          email: auth.currentUser?.email,
        });
      })
      .catch((error) => console.log(error));
  };

  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const googleSignin = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredendential) => {
        navigate("/");
        return setDoc(doc(db, "users", userCredendential.user.uid), {
          name: auth.currentUser?.email,
          age: 0,
          adminID: "undefined",
          email: auth.currentUser?.email,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={styles.signup}>
        <h2>{pathname === "/signup" ? "Sign up" : "Sign in"}</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className={styles.buttons}>
          <Button
            id="signUpBtn"
            onClick={pathname === "/signup" ? signUp : signIn}
          >
            {pathname === "/signup" ? "Sign up" : "Sign in"}
          </Button>
          <Button onClick={googleSignin}>Sign in with google</Button>
        </div>

        <p>
          {pathname === "/signup"
            ? "Har du alt en bruker? klikk"
            : "Har du ingen bruker? klikk"}
          <Link to={pathname === "/signup" ? "/signin" : "/signup"}> her </Link>
        </p>
        <p>
          <Link to="/">Explore Flashy</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
