import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FlashcardSet } from "~/src/types";
import styles from "./SetLink.module.css";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import db from "~/src/api/firebase-config";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import useAuth from "~/src/hooks/useAuth";

const SetLink = ({ set }: { set: FlashcardSet }) => {
  const user = useAuth();

  const markLike = async (id: string, isLiked: boolean) => {
    if (isLiked) {
      if (id) {
        const set = doc(db, "flashcardset", id);
        await updateDoc(set, {
          likes: arrayRemove(user?.email),
        });
      }
    } else if (id) {
      const set = doc(db, "flashcardset", id);
      await updateDoc(set, {
        likes: arrayUnion(user?.email),
      });
    }
  };

  return (
    <Link to={`/${set._id}`} key={set._id} className={styles.set}>
      <h3>{set.title}</h3>
      <div className={styles.setContent}>
        <p className={styles.description}>{set.description}</p>
        <div className={styles.createdBy}>
          <div>
            <FontAwesomeIcon icon={faUser} size="lg" />
            {set.createdBy}
          </div>
        </div>
        <div>
          <div>
            <FontAwesomeIcon
              icon={set ? heartSolid : heartRegular}
              size="lg"
              className={
                set.likes?.includes(user?.email || "") ? styles.likeButton : ""
              }
              onClick={(e) => {
                e.preventDefault();
                markLike(set._id, set.likes?.includes(user?.email || ""));
              }}
            />
            {set.likes?.length ? set.likes.length : 0}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SetLink;
