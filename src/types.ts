export type User = {
  _id: string;
  name: string;
  age: string;
  adminID: string;
};

export type Flashcard = {
  front: string;
  back: string;
};

export type FlashcardSet = {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  createdByID: string;
  cards: Flashcard[];
  length: number;
  isPrivate: boolean;
  favorite: string[];
  likes: string[];
  subject: string;
  comments: Comment[];
};

export type Comment = {
  content: string;
  userMail: string;
};
