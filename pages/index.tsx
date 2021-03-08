import { connectToDatabase } from "utils/mongodb";
import styled from "styled-components";
import Sidebar from "pages/components/Sidebar";
import CatalogueBook from "pages/components/CatalogueBook";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
`;

const Main = styled.div`
  border: 1px solid red;
  color: red;
  padding: 32px;
`;

export default function Home({ books }) {
  return (
    <Container>
      <Sidebar />
      <Main>it's the motha fuckin dogg</Main>
    </Container>
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
