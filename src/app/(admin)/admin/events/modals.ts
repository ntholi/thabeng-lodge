import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  description: string;
  date?: Timestamp | null;
  dateCreated?: Timestamp;
}
