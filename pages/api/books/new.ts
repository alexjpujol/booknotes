import { NextApiHandler } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import Book from "models/Book";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
  })
);

const newBook: NextApiHandler = async (req, res) => {
  await cors(req, res);
  await dbConnection();
  const newBook = new Book(req.body);
  newBook.save((err) => {
    if (err) throw new Error(err);
  });
  return res.status(201).json(newBook);
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export default newBook;
