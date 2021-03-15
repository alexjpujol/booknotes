import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import dbConnection from "utils/mongodb";
import initMiddleware from "utils/init-middleware";
import cloudinaryInit from "utils/cloudinary";
import Book from "models/Book";
import multer from "multer";
import cloudinary from "cloudinary";

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[];
};

const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
  })
);

const upload = multer({
  storage: multer.diskStorage({}),
});
const initUpload = initMiddleware(upload.any());

export const config = {
  api: {
    bodyParser: false,
  },
};

const newBook: NextApiHandler = async (
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) => {
  await cors(req, res);
  await initUpload(req, res);
  await await dbConnection();
  cloudinaryInit();
  const { body, files } = req;
  const image = await cloudinary.v2.uploader.upload(files[0].path, {
    resource_type: "image",
    folder: "books",
    eager: [
      {
        width: 300,
        height: 300,
        crop: "crop",
        gravity: "faces",
      },
    ],
  });
  const newBook = new Book({
    name: body.name,
    author: body.author,
    genre: body.genre,
    dateStart: body.dateStart,
    dateEnd: body.dateEnd,
    imageUrl: image.secure_url,
  });
  newBook.save((err) => {
    if (err) throw new Error(err);
  });
  return res.status(201).json(newBook);
};

export default newBook;
