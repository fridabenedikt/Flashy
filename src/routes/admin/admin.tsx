import StatusMessage from "~/src/components/StatusMessage";
import styles from "./admin.module.css";
import { getUsers } from "~/src/api/users";
import { useQuery } from "@tanstack/react-query";
import { User } from "~/src/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCrown } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "~/src/api/firebase-config";

const Admin = () => {
  //initAdmin();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (usersQuery.isLoading) {
    return <StatusMessage loading />;
  }

  if (usersQuery.isError) {
    return <StatusMessage error message={usersQuery.error?.message} />;
  }

  if (!usersQuery.data) {
    return <StatusMessage error message="Undefined data" />;
  }

  return (
    <div className={styles.user}>
      <div className={styles.userInfo}>
        <h1>User overview</h1>
        <div className={styles.setList}>
          {usersQuery.data.map((user) => (
            <UserDisplay key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

const UserDisplay = ({ user }: { user: User }) => {
  const user_db = doc(db, "users", user._id);

  return (
    <div className={styles.set}>
      <div className={styles.setTop}>
        <div className={styles.setInfo}>
          <h2>{user.name}</h2>
        </div>
        <div
          className={styles.setButtons}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <p>
            <FontAwesomeIcon
              icon={faTrash}
              size="xl"
              className={styles.trashIcon}
              onClick={() => {
                deleteDoc(doc(db, "users", user._id));
              }}
            />
          </p>
          <p>
            <FontAwesomeIcon
              icon={faCrown}
              size="xl"
              className={styles.adminIcon}
              onClick={() =>
                updateDoc(user_db, {
                  adminID: user._id,
                }).then(() => {
                  alert(user.name + "is now admin");
                })
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
