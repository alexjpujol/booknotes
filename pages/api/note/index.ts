import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import Book from "models/Book";
import { timeout } from "utils/timeout";
import { UpdateQuery } from "mongoose";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const newNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await cors(req, res);
    await dbConnection();
    const { body } = req;
    const book = await Book.findById(body.bookId);
    book.notes.push(body.noteText);
    await book.save();
    res.statusCode = 201;
    return res.end();
  } catch (e) {
    return res.status(500).json({ statusCode: 500, message: e.message });
  }
};

const editNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await cors(req, res);
    await dbConnection();
    const { body } = req;
    const book = await Book.findById(body.bookId);
    book.notes = book.notes.map((note: string) => {
      if (note === body.noteText) {
        note = body.newNoteText;
      }
      return note;
    });
    book.save();
    res.statusCode = 200;
    return res.end();
  } catch (e) {
    return res.status(500).json({ statusCode: 500, message: e.message });
  }
};

const deleteNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await cors(req, res);
    await dbConnection();
    const { body } = req;
    const book = await Book.findById(body.bookId);
    book.notes.pull(body.noteText);
    await book.save();
    res.statusCode = 200;
    return res.end();
  } catch (e) {
    return res.status(500).json({ statusCode: 500, message: e.message });
  }
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      newNote(req, res);
      break;
    case "PUT":
      editNote(req, res);
      break;
    case "DELETE":
      deleteNote(req, res);
      break;
    default:
      res.status(405).end();
  }
};
