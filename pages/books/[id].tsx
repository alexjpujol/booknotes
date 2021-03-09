import styled from "styled-components";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import dbConnection from "utils/mongodb";
import Book from "models/Book";
import Header from "pages/components/Header";
import Note from "pages/components/Note";
import IconWrapper from "pages/components/common/IconWrapper";
import AddIcon from "pages/components/Icons/AddIcon";
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
  const router = useRouter();
  const { id } = router.query;
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
  await dbConnection();
  const book = await Book.findById(context.params.id).lean();
  book._id = book._id.toString();
  return {
    props: {
      book,
    },
  };
};

export default BookDetail;
