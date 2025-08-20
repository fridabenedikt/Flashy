import { Routes, Route, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Home from "./home";
import User from "./user";
import Signup from "./signup";
import Gamemode from "./gamemode";
import Create from "./create";
import Edit from "./edit";
import Admin from "./admin/admin";

const RouterConfig = () => (
  <div data-testid="auth-wrapper">
    <Navbar />
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="user" element={<ProtectedRoute element={<User />} />} />
        <Route path="admin" element={<ProtectedRoute element={<Admin />} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signup />} />
        <Route path=":id" element={<Gamemode />} />
        <Route path="new" element={<ProtectedRoute element={<Create />} />} />
        <Route
          path="edit/:id"
          element={<ProtectedRoute element={<Edit />} />}
        />
        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>404 Page Not Found</h1>}
        />
      </Routes>
    </div>
    <Footer />
  </div>
);

// Use this for pages that require login eg. <User /> (see above)
const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const user = useAuth();

  return user ? (
    element
  ) : (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>You have to be logged in to access this page</h1>
      <Link to="/signin">
        <Button>LOG IN</Button>
      </Link>
    </div>
  );
};

export default RouterConfig;
