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
  await cors(req, res);
  await dbConnection();
  const { body } = req;
  const book = await Book.findById(body.bookId);
  book.notes.push(body.noteText);
  await book.save();
  return res.status(201).json(book._id);
};

const editNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await cors(req, res);
    await dbConnection();
    const { body } = req;
    Book.updateOne(
      { _id: body.bookId, notes: body.noteText },
      { $set: { "notes.$": body.newNoteText } }
    );
    return res.status(200).end();
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: e.message });
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
    book.save();
    return res.status(200).end();
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: e.message });
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
    case "PUT":
      editNote(req, res);
    case "DELETE":
      deleteNote(req, res);
  }
};
