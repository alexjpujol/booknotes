import { GetServerSideProps } from "next";
import styled from "styled-components";
import dbConnection from "utils/mongodb";
import Book from "models/Book";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import CatalogueBook from "components/CatalogueBook";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
`;

const Main = styled.div`
  padding: 32px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export default function Home({ books }) {
  return (
    <>
      <Header title="Booknotes" />
      <Container>
        <Sidebar />
        <Main>
          {books.map((book) => (
            <CatalogueBook key={book.id} {...book} />
          ))}
        </Main>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnection();
  const results = await Book.find({});
  const books = results.map((result) => {
    const book = result.toObject();
    book._id = book._id.toString();
    return book;
  });
  return {
    props: {
      books,
    },
  };
};
