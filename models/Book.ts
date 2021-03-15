import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this book."],
    maxlength: [60, "Book name cannot be more than 60 characters"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author for this book."],
    maxlength: [60, "Book author cannot be more than 60 characters"],
  },
  genre: {
    type: Array,
    required: [true, "Please provide the book genre"],
  },
  dateStart: {
    required: [true, "Please provide a start date for this book."],
    type: Date,
  },
  dateEnd: {
    type: Date,
  },
  notes: {
    type: Array,
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
