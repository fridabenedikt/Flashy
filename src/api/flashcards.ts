import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FlashcardSet } from "../types";
import db from "./firebase-config";

const COL_NAME = "flashcardset";

export const getAllSets = async (): Promise<FlashcardSet[]> => {
  const sets: FlashcardSet[] = [];
  const docs = await getDocs(collection(db, COL_NAME));
  docs.forEach((doc) => {
    sets.push({
      _id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      createdBy: doc.data().createdBy || "Unknown",
      createdByID: doc.data().createdByID,
      cards: doc.data().cards,
      length: doc.data().length,
      isPrivate: doc.data().isPrivate,
      favorite: doc.data().favorite,
      likes: doc.data().likes,
      subject: doc.data().subject,
      comments: doc.data().comments,
    });
  });
  return sets;
};

export const getSet = async (id: string): Promise<FlashcardSet> => {
  const setDoc = await getDoc(doc(db, COL_NAME, id));
  if (setDoc.exists()) {
    return {
      _id: setDoc.id,
      title: setDoc.data().title,
      description: setDoc.data().description,
      createdBy: setDoc.data().createdBy,
      createdByID: setDoc.data().createdByID,
      cards: setDoc.data().cards,
      length: setDoc.data().length,
      isPrivate: setDoc.data().isPrivate,
      favorite: setDoc.data().favorite,
      likes: setDoc.data().likes,
      subject: setDoc.data().subject,
      comments: setDoc.data().comments,
    };
  }
  // Should maybe handle this better
  return {
    _id: "NO ID",
    title: "undefined",
    description: "undefined",
    createdBy: "NO ONE",
    createdByID: "NO ONE",
    cards: [],
    length: 0,
    isPrivate: false,
    favorite: [],
    likes: [],
    subject: "",
    comments: [],
  };
};
