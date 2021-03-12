// next
import Link from "next/link";
// lib
import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

interface CatalogueBookProps {
  _id: string;
  name: string;
}

const BookContainer = styled.div`
  width: 350px;
  height: 350px;
  margin: 3em;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const BookTitle = styled(Typography)`
  margin-top: 12px !important;
  a {
    text-decoration: underline;
  }

  a:visited {
    color: black;
  }
`;

const CatalogueBook: FunctionComponent<CatalogueBookProps> = ({
  _id,
  name,
}) => {
  return (
    <BookContainer>
      <BookTitle variant="h5">
        <Link href={`/books/${_id}`}>
          <a>{name}</a>
        </Link>
      </BookTitle>
    </BookContainer>
  );
};

export default CatalogueBook;
