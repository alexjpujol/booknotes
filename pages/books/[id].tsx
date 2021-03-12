// next
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { useState, FunctionComponent, BaseSyntheticEvent } from "react";
// lib
import styled from "styled-components";
import fetch from "node-fetch";
import { timeout } from "utils/timeout";
// components
import Header from "components/Header";
import Note from "components/Note";
import NoteForm from "components/NoteForm";
import IconWrapper from "components/common/IconWrapper";
import AddIcon from "components/icons/AddIcon";
// types
import { Book, ElementSizes, CreateNoteValues } from "types";

const Main = styled.div`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
`;

const FormContainer = styled.div`
  height: 250px;
  width: 250px;
  margin: 24px;
`;

const ButtonContainer = styled.div`
  height: 282px;
  width: 282px;
  text-align: center;
  margin: 24px;
  padding-top: 120px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  box-sizing: border-box;
`;

interface BookDetailProps {
  book: Book;
}

export const BookDetail: FunctionComponent<BookDetailProps> = ({ book }) => {
  if (!book) {
    return <ErrorPage statusCode={404} />;
  }
  const router = useRouter();
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const createNote = async (event: BaseSyntheticEvent) => {
    try {
      event.preventDefault();
      const formValues: CreateNoteValues = {
        bookId: book._id,
        noteText: event.target.noteText.value,
      };
      const res = await fetch(`/api/note`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (res.status === 201) {
        timeout(2000);
        router.reload();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <Header title={book.name} author={book.author} />
      <Main>
        {book.notes.map((note, idx) => (
          <Note key={`${idx}-book-${book.name}`} text={note} />
        ))}
        {showAddNoteForm ? (
          <FormContainer>
            <NoteForm
              onSubmit={createNote}
              onClose={() => setShowAddNoteForm(false)}
            />
          </FormContainer>
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
