import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

export default db;
