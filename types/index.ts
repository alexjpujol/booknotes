export interface Book {
  _id: string;
  author: string;
  name: string;
  notes: Array<string>;
  genre: Array<Genres>;
  imageUrl: string;
}

export interface CreateBookValues {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  genre: Genres;
  image?: File;
}

export interface CreateNoteValues {
  bookId: string;
  noteText: string;
}

export interface EditOrDeleteNoteValues {
  bookId: string;
  noteText: string;
  newNoteText?: string;
}

export enum ElementSizes {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum Genres {
  FICTION = "Fiction",
  PHILOSOPHY = "Philosophy",
  PHYSICS = "Physics",
  CLASSICS = "Classics",
  PROGRAMMING = "Programming",
  SELF_HELP = "Self Help",
  MATH = "Math",
  ECONOMICS = "Economics",
  BIOGRAPHY = "Biography",
}
