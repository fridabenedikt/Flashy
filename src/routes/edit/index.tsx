import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "~/src/api/firebase-config";
import useAuth from "~/src/hooks/useAuth";
import FlashyForm, { FormValues } from "~/src/components/FlashyForm";
import StatusMessage from "~/src/components/StatusMessage";

const Edit = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const getSetQuery = useQuery({
    queryKey: ["set", id],
    queryFn: async () => await getDoc(doc(db, "flashcardset", id || "")),
  });

  const editSet = (values: FormValues) => {
    updateDoc(doc(db, "flashcardset", id || ""), {
      ...values,
      length: values.cards.length,
    });
    navigate(-1);
  };

  if (getSetQuery.isLoading) {
    return <StatusMessage loading />;
  }

  if (getSetQuery.isError) {
    return <StatusMessage error message={getSetQuery.error.message} />;
  }

  if (getSetQuery.data?.data()?.createdByID !== user?.uid) {
    return (
      <StatusMessage message="You do not have permission to edit this set!" />
    );
  }

  return (
    <FlashyForm
      type="edit"
      onSubmit={editSet}
      initialValues={getSetQuery.data?.data() as FormValues}
    />
  );
};

export default Edit;
