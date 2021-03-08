import { useRouter } from "next/router";
import { connectToDatabase } from "utils/mongodb";
import { GetServerSideProps } from "next";

export const Book = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Book ID: {props.book.id}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectToDatabase();
  const book = await db.collection("books").findOne({ id: context.params.id });
  return {
    props: {
      id: context.params.id,
      book: JSON.parse(JSON.stringify(book)),
    },
  };
};

export default Book;
