import Button from "../Button";
import styles from "./Comments.module.css";
import { doc, updateDoc } from "firebase/firestore";
import db from "~/src/api/firebase-config";
import useAuth from "~/src/hooks/useAuth";
import { Field, Form } from "react-final-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Comment } from "~/src/types";

type Props = {
  comments: Comment[];
  id: string;
};

const Comments = ({ comments, id }: Props) => {
  const user = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentComments, setCurrentComments] = useState<Array<any>>(
    comments || [],
  );

  const onSubmit = (values: { content: string }) => {
    const newComment = {
      content: values.content,
      userMail: user?.email,
    };
    const updatedComments = [...currentComments, newComment];
    setCurrentComments(updatedComments);
    updateDoc(doc(db, "flashcardset", id || ""), {
      comments: updatedComments,
    });
  };

  return (
    <div className={styles.commentContainer}>
      <h2>Comments</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.new}>
            <Field
              className={styles.commentInput}
              name="content"
              component="input"
              placeholder="Comment what you think!"
            />
            <Button type="submit">COMMENT</Button>
          </form>
        )}
      />

      <div className={styles.comments}>
        {!currentComments || currentComments.length <= 0 ? (
          <p>Be the first to comment!</p>
        ) : (
          currentComments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div className={styles.comment} key={index}>
                <p key={index}>{comment.content}</p>
                <div>
                  <FontAwesomeIcon icon={faUser} size="lg" />
                  {comment.userMail || "Anonymous"}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Comments;
