import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import Book from "models/Book";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
  })
);

const newNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);
  await dbConnection();
  const { body } = req;
  const book = await Book.findById(body.bookId);
  book.notes.push(body.noteText);
  debugger;
  await book.save();
  return res.status(201).json(book._id);
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export default newNote;
