import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const getCards = async () => {
  const querySnapshot = await getDocs(collection(db, 'cards'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { getCards };