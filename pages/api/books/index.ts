import { NextApiHandler } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import Book from "models/Book";
import cloudinary from "cloudinary";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

const books: NextApiHandler = async (req, res) => {
  await cors(req, res);
  await dbConnection();
  const results = await Book.find(req.query);
  const books = results.map((result) => {
    const book = result.toObject();
    book._id = book._id.toString();
    book.imageUrl = cloudinary.v2.url(book.imageId);
    return book;
  });
  return res.status(200).json(books);
};

export default books;
