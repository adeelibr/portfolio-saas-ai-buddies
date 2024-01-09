import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

export interface Category {
  id?: string;
  name: string;
}

const categoryConvertor: FirestoreDataConverter<Category> = {
  // what goes into firebase
  toFirestore: function (category: Category): DocumentData {
    return {
      name: category.name,
      // ...other fields
    };
  },
  // what comes from firebase, that we mutate on for type definition, can
  // be used for adding other information as well
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category {
    const data = snapshot.data(options);

    const sub: Category = {
      id: snapshot.id,
      name: data.name,
    };

    return sub;
  },
};

export const categoryRef = () =>
  collection(db, "category").withConverter(categoryConvertor);

export const sortedCategoryRef = () =>
  query(query(categoryRef()), orderBy("name", "asc")).withConverter(
    categoryConvertor
  );
