import styles from "./user.module.css";
import { getAllSets } from "~/src/api/flashcards";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faCircleUser,
  faPenToSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useAuth from "~/src/hooks/useAuth";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "~/src/api/firebase-config";
import StatusMessage from "~/src/components/StatusMessage";
import { FlashcardSet } from "~/src/types";
import IsAdmin from "~/src/components/IsAdmin/IsAdmin";
import Button from "~/src/components/Button";
import { deleteUser } from "firebase/auth";
import { faStar as star_regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as star_solid } from "@fortawesome/free-solid-svg-icons";

enum Page {
  ALL = "all",
  MINE = "mine",
  FAVOURITES = "favourites",
}

const User = () => {
  const user = useAuth();
  const [page, setPage] = useState<Page>(Page.MINE);
  const isAdmin = IsAdmin();
  const navigate = useNavigate();
  const userEmail = String(user?.email);
  const [edit, setEdit] = useState(false);

  const flashcardsQuery = useQuery({
    queryKey: ["flashcards"],
    queryFn: getAllSets,
  });

  if (flashcardsQuery.isLoading) {
    return <StatusMessage loading />;
  }

  if (flashcardsQuery.isError) {
    return <StatusMessage error message={flashcardsQuery.error?.message} />;
  }

  if (!flashcardsQuery.data) {
    return <StatusMessage error message="Undefined data" />;
  }

  if (!user) {
    return <StatusMessage error message="User does not exists" />;
  }

  return (
    <>
      <div className={styles.user}>
        <div className={styles.userinfo}>
          <FontAwesomeIcon
            icon={faUser}
            size="5x"
            className={styles.profilePicture}
          />
          <button
            id="editBtn"
            className={styles.edit}
            onClick={() => setEdit(!edit)}
          >
            EDIT
          </button>
          <Button
            className={edit ? "" : styles.delete}
            onClick={() => deleteUser(user).then(() => navigate("/"))}
          >
            DELETE
          </Button>
          <h2>{user.email}</h2>
          {isAdmin && (
            <>
              <p>
                Admin
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="xs"
                  className={styles.adminIcon}
                />
              </p>
            </>
          )}
        </div>

        <div className={styles.displayButtons}>
          <button
            onClick={() => setPage(Page.ALL)}
            className={page === Page.ALL ? styles.active : ""}
          >
            Stacks
          </button>
          <button
            onClick={() => setPage(Page.MINE)}
            className={page === Page.MINE ? styles.active : ""}
          >
            My Stacks
          </button>
          <button
            onClick={() => setPage(Page.FAVOURITES)}
            className={page === Page.FAVOURITES ? styles.active : ""}
          >
            Favorites
          </button>
        </div>

        <div className={styles.setList}>
          {page === Page.MINE
            ? flashcardsQuery.data.map(
                (set) =>
                  set.createdByID === user?.uid && (
                    <Set set={set} key={set._id} />
                  ),
              )
            : page === Page.ALL
              ? flashcardsQuery.data
                  .filter((set) => set.isPrivate === false) // This line filters the sets
                  .map((set) => <Set set={set} key={set._id} />)
              : page === Page.FAVOURITES &&
                flashcardsQuery.data
                  /* .filter(set => set.isPrivate === false) */ // This line filters the sets
                  .filter((set) => set.favorite?.includes(userEmail) === true)
                  .map((set) => <Set set={set} key={set._id} />)}
        </div>
      </div>
    </>
  );
};

const Set = ({ set }: { set: FlashcardSet }) => {
  const user = useAuth();
  const isMine = set.createdByID === user?.uid;
  const navigate = useNavigate();
  const isAdmin = IsAdmin();
  const userEmail = String(user?.email);
  const isFavouriteUpdate = set.favorite?.includes(userEmail);
  const [isFavourite, setIsFavourite] = useState(false);

  const addEmailToFavorites = async () => {
    const docRef = doc(db, "flashcardset", set._id);

    try {
      await updateDoc(docRef, {
        ["favorite"]: arrayUnion(user?.email),
      });
      console.log("String added to array successfully");
    } catch (error) {
      console.error("Error adding string to array:", error);
    }
    return setIsFavourite(true);
  };

  const removeEmailFromFavorites = async () => {
    const docRef = doc(db, "flashcardset", set._id);

    try {
      await updateDoc(docRef, {
        ["favorite"]: arrayRemove(user?.email),
      });
      console.log("String added to array successfully");
    } catch (error) {
      console.error("Error adding string to array:", error);
    }
    return setIsFavourite(true);
  };

  return (
    <Link to={`/${set._id}`} className={styles.set}>
      <div className={styles.setTop}>
        <div className={styles.setInfo}>
          <h2>{set.title}</h2>
          <p className={styles.createdBy}>
            <FontAwesomeIcon icon={faCircleUser} size="lg" />
            {isMine ? "Me" : set.createdBy}
          </p>
          <p>
            {set.length || 0} card{set.length !== 1 && "s"}
          </p>
          <p className={styles.po_farge}>
            {set.isPrivate && "Private"}
            {!set.isPrivate && "Public"}
          </p>
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
              size="xl"
              icon={
                isFavouriteUpdate || isFavourite ? star_solid : star_regular
              }
              className={
                isFavouriteUpdate || isFavourite ? styles.isFavourite : ""
              }
              onClick={() => {
                isFavouriteUpdate || isFavourite
                  ? removeEmailFromFavorites()
                  : addEmailToFavorites();
              }}
            />
          </p>
          {(isAdmin ? isAdmin : isMine) && (
            <div>
              {isMine && (
                <p>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xl"
                    className={styles.editIcon}
                    onClick={() => navigate(`/edit/${set._id}`)}
                  />
                </p>
              )}
              <p>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="xl"
                  className={styles.trashIcon}
                  // TODO: add "are you sure" modal
                  onClick={() => deleteDoc(doc(db, "flashcardset", set._id))}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className={styles.setDescription}>{set.description}</p>
    </Link>
  );
};

export default User;
