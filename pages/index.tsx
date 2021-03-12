// next
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
// lib
import { FunctionComponent } from "react";
import fetch from "node-fetch";
import styled from "styled-components";
import qs from "querystring";
// components
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import CatalogueBook from "components/CatalogueBook";
// types
import { Book } from "types";

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

interface HomeProps {
  books: Array<Book>;
}

const Home: FunctionComponent<HomeProps> = ({ books }) => {
  if (!books) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Header title="Booknotes" />
      <Container>
        <Sidebar />
        <Main>
          {books.map((book) => (
            <CatalogueBook key={book._id} {...book} />
          ))}
        </Main>
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context;
  const params = qs.encode(query);
  try {
    const result = await fetch(`${process.env.API_URL}/api/books?${params}`);
    const books = await result.json();
    return {
      props: {
        books,
      },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};
