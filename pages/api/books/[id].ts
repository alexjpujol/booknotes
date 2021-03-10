import { NextApiHandler } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import Book from "models/Book";

const cors = initMiddleware(Cors());

export const book: NextApiHandler = async (req, res) => {
  await cors(req, res);
  await dbConnection();
  const { id } = req.query;
  const result = await Book.findById(id);
  return res.status(200).json(result);
};

export default book;
