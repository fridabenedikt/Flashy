import { Link, NavLink, useNavigate } from "react-router-dom";
import flashy_logo2 from "~/src/assets/flashy_logo2.png";
import styles from "./Navbar.module.css";
import Button from "../Button";
import { signOut } from "firebase/auth";
import { auth } from "~/src/api/firebase-config";
import useAuth from "~/src/hooks/useAuth";
import IsAdmin from "../IsAdmin/IsAdmin";

const Navbar = () => {
  const user = useAuth();
  const isAdmin = IsAdmin();
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.header}>
        <img src={flashy_logo2} alt="Logo" />
        <h1>FLASHY</h1>
      </Link>
      <div className={styles.links}>
        <NavbarLink to="/">HOME</NavbarLink>
        <NavbarLink to="/new">NEW SET</NavbarLink>
        {user && <NavbarLink to="/user">PROFILE</NavbarLink>}
        {user && isAdmin && <NavbarLink to="/admin">ADMIN</NavbarLink>}
        {user ? (
          <Button
            id="logOutBtn"
            onClick={() =>
              signOut(auth)
                .then(() => navigate("/"))
                .catch((err) => console.log(err))
            }
          >
            LOG OUT
          </Button>
        ) : (
          <Button id="logInBtn" onClick={() => navigate("/signin")}>
            LOG IN
          </Button>
        )}
      </div>
    </div>
  );
};

const NavbarLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.active : "")}
    >
      {children}
    </NavLink>
  );
};

export default Navbar;
