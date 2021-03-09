import { FunctionComponent } from "react";
import Link from "next/link";
import styled from "styled-components";

interface CatalogueBookProps {
  _id: string;
  name: string;
}

const BookContainer = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid black;
  margin: 3em;
  text-align: center;
`;

const BookTitle = styled.h2`
  text-decoration: none;
`;

const CatalogueBook: FunctionComponent<CatalogueBookProps> = ({
  _id,
  name,
}) => {
  return (
    <BookContainer>
      <BookTitle>
        <Link href={`/books/${_id}`}>
          <a>{name}</a>
        </Link>
      </BookTitle>
    </BookContainer>
  );
};

export default CatalogueBook;
