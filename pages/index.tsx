import { connectToDatabase } from "utils/mongodb";
import styled from "styled-components";
import Header from "pages/components/Header";
import Sidebar from "pages/components/Sidebar";
import CatalogueBook from "pages/components/CatalogueBook";

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
      <Header />
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
