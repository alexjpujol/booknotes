export interface Book {
  _id: string;
  name: string;
  notes: Array<string>;
  genre: Array<Genres>;
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
}
