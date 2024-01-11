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

export interface Message {
  id?: string;
  role: "user" | "system";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageConvertor: FirestoreDataConverter<Message> = {
  // what goes into firebase
  toFirestore: function (message: Message): DocumentData {
    return {
      ...message,
    };
  },
  // what comes from firebase (we can mutate data here as well)
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);

    const sub: Message = {
      id: snapshot.id,
      role: data.role,
      content: data.content,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };

    return sub;
  },
};

export const messageRef = (userId: string, companionId: string) => {
  return collection(
    db,
    "users",
    userId,
    "companion",
    companionId,
    "message"
  ).withConverter(messageConvertor);
};
