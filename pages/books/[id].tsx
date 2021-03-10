// next
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
// lib
import styled from "styled-components";
import fetch from "node-fetch";
import absoluteUrl from "next-absolute-url";
// components
import Header from "components/Header";
import Note from "components/Note";
import IconWrapper from "components/common/IconWrapper";
import AddIcon from "components/Icons/AddIcon";
// types
import { ElementSizes } from "types";

const Main = styled.div`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  height: 130px;
  width: 250px;
  text-align: center;
  margin: 24px;
  padding-top: 120px;
`;

export const BookDetail = ({ book }) => {
  if (!book) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Header title={book.name} />
      <Main>
        {book.notes.map((note, idx) => (
          <Note key={`${idx}-book-${book.name}`} text={note} />
        ))}
        <ButtonContainer>
          <IconWrapper icon={AddIcon} size={ElementSizes.lg} />
        </ButtonContainer>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;
  try {
    const { origin } = absoluteUrl(req);
    const result = await fetch(`${origin}/api/books/${params.id}`);
    const book = await result.json();
    return {
      props: {
        book,
      },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default BookDetail;
