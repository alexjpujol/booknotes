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

  /* Binder Paper Effect */
  font-size: 16px;
  height: 100vh;

  background-image: -webkit-linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 0.2) 0,
      transparent 5.1em
    ),
    -webkit-linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
  background-image: -moz-linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 0.2) 0,
      transparent 5.1em
    ),
    -moz-linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
  background-image: -o-linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 0.2) 0,
      transparent 5.1em
    ),
    -o-linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
  background-image: -ms-linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 0.2) 0,
      transparent 5.1em
    ),
    -ms-linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
  -webkit-background-size: 100% 2em;
  -moz-background-size: 100% 2em;

  background-image: linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 0.2) 0,
      transparent 5.1em
    ),
    linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
  background-size: 100% 2em;
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
