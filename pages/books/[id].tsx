// next
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
import { useState, FunctionComponent } from "react";
// lib
import styled from "styled-components";
import fetch from "node-fetch";
// components
import Header from "components/Header";
import Note from "components/Note";
import AddNoteForm from "components/AddNoteForm";
import IconWrapper from "components/common/IconWrapper";
import AddIcon from "components/icons/AddIcon";
// types
import { Book, ElementSizes } from "types";

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

interface BookDetailProps {
  book: Book;
}

export const BookDetail: FunctionComponent<BookDetailProps> = ({ book }) => {
  if (!book) {
    return <ErrorPage statusCode={404} />;
  }

  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  return (
    <>
      <Header title={book.name} />
      <Main>
        {book.notes.map((note, idx) => (
          <Note key={`${idx}-book-${book.name}`} text={note} />
        ))}
        {showAddNoteForm ? (
          <AddNoteForm
            bookId={book._id}
            onClose={() => setShowAddNoteForm(false)}
          />
        ) : (
          <ButtonContainer>
            <IconWrapper
              onClick={() => setShowAddNoteForm(true)}
              icon={AddIcon}
              size={ElementSizes.lg}
            />
          </ButtonContainer>
        )}
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res } = context;
  try {
    const result = await fetch(`${process.env.API_URL}/api/books/${params.id}`);
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
