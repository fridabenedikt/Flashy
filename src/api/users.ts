import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase-config";
import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  const users: User[] = [];
  const data = await getDocs(collection(db, "users"));
  data.forEach((doc) => {
    users.push({
      _id: doc.id,
      name: doc.data().name,
      age: doc.data().age,
      adminID: doc.data().adminID,
    });
  });
  return users;
};

export const getAdmin = async (id: string): Promise<User> => {
  const setDoc = await getDoc(doc(db, "users", id));
  if (setDoc.exists()) {
    return {
      _id: setDoc.id,
      name: setDoc.data().name,
      age: setDoc.data().age,
      adminID: setDoc.data().adminID,
    };
  }
  // Should maybe handle this better
  return {
    _id: "NO ID",
    name: "undefined",
    age: "undefined",
    adminID: "undefined",
  };
};
