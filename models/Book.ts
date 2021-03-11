import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this book."],
    maxlength: [20, "Book name cannot be more than 60 characters"],
  },
  genre: {
    type: Array,
    required: [true, "Please provide the book genre"],
  },
  image_url: {
    // required: [true, "Please provide an image url for this book."],
    type: String,
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
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
