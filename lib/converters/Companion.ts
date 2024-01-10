import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  Timestamp,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

export interface Companion {
  id?: string;
  src: string;
  name: string;
  description: string;
  instructions: string;
  seed: string;
  categoryId: string;
}

const companionConvertor: FirestoreDataConverter<Companion> = {
  // what goes into firebase
  toFirestore: function (companion: Companion): DocumentData {
    return {
      ...companion,
    };
  },
  // what comes from firebase (we can mutate data here as well)
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Companion {
    const data = snapshot.data(options);

    const sub: Companion = {
      id: snapshot.id,
      src: data.src,
      name: data.name,
      description: data.description,
      instructions: data.instructions,
      seed: data.seed,
      categoryId: data.categoryId,
    };

    return sub;
  },
};

export const companionRef = (userId: string) => {
  return collection(db, "users", userId, "companion").withConverter(
    companionConvertor
  );
};

export const getCompanionDocumentReferenceById = (
  userId: string,
  companionId: string
) => doc(companionRef(userId), companionId).withConverter(companionConvertor);

export const getCompanionDocumentReferenceByCategoryIdOrCompanionName = (
  userId: string,
  categoryId: string,
  companionName: string,
) => {
  let baseQuery = query(companionRef(userId));

  if (categoryId && companionName) {
    // If both categoryId and name are provided, apply both conditions
    baseQuery = query(
      baseQuery,
      where("categoryId", "==", categoryId),
      where("name", "==", companionName)
    );
  } else {
    // Apply individual conditions if only one is provided
    if (categoryId) {
      baseQuery = query(baseQuery, where("categoryId", "==", categoryId));
    }
    if (companionName) {
      baseQuery = query(baseQuery, where("name", "==", companionName));
    }
  }

  // If neither categoryId nor name is provided, it will return all companions
  return baseQuery.withConverter(companionConvertor);
};
