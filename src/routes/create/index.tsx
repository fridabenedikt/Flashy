import { addDoc, collection } from "firebase/firestore";
import db from "~/src/api/firebase-config";
import useAuth from "~/src/hooks/useAuth";
import FlashyForm, { FormValues } from "~/src/components/FlashyForm";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const createSet = (values: FormValues) => {
    addDoc(collection(db, "flashcardset"), {
      ...values,
      createdByID: user?.uid,
      createdBy: user?.email,
      length: values.cards.length,
      isPrivate: values.isPrivate ?? false,
      comments: [],
    });
    navigate("/");
  };

  return <FlashyForm type="create" onSubmit={createSet} />;
};

export default Create;
