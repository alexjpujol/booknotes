import { connectToDatabase } from "utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const books = await db
    .collection("books")
    .find({})
    .sort({})
    .limit(100)
    .toArray();
  res.status(200).json({ books });
};
