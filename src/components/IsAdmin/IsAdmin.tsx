import { useQuery } from "@tanstack/react-query";
import { getUsers } from "~/src/api/users";
import useAuth from "~/src/hooks/useAuth";
import { useEffect, useState } from "react";

const IsAdmin = () => {
  const user = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const adminQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (adminQuery.isSuccess && user) {
      const isAdminUser = adminQuery.data.some(
        (admin) => admin.adminID === user.uid,
      );
      setIsAdmin(isAdminUser);
    }
  }, [adminQuery.isSuccess, adminQuery.data, user]);

  return isAdmin;
};

export default IsAdmin;
