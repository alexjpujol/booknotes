// next
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
// lib
import fetch from "node-fetch";
import absoluteUrl from "next-absolute-url";
import styled from "styled-components";
// components
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
            <CatalogueBook key={book.id} {...book} />
          ))}
        </Main>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  try {
    const { origin } = absoluteUrl(req);
    const result = await fetch(`${origin}/api/books`);
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
