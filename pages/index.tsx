import { connectToDatabase } from "utils/mongodb";

export default function Home({ books }) {
  return books.map((book, idx1) => (
    <div key={`book-${book.name}-${idx1}`}>
      <div>{book.name}</div>
      <ul>
        {book.notes.map((note, idx2) => (
          <li key={`${book.name}-note-${idx2}`}>{note}</li>
        ))}
      </ul>
    </div>
  ));
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const books = await db
    .collection("books")
    .find({})
    .sort({})
    .limit(100)
    .toArray();
  return {
    props: {
      books: JSON.parse(JSON.stringify(books)),
    },
  };
}
