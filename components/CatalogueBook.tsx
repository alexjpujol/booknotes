// next
import Link from "next/link";
// lib
import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

interface CatalogueBookProps {
  _id: string;
  name: string;
  author: string;
  imageUrl: string;
}

const BookContainer = styled.div`
  width: 400px;
  height: fit-content;
  margin: 3em;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: white;
`;

const BookTitle = styled(Typography)`
  margin-top: 12px !important;
  a {
    text-decoration: underline;
    color: black;
  }

  a:visited {
    color: black;
  }
`;

const CatalogueBook: FunctionComponent<CatalogueBookProps> = ({
  _id,
  name,
  author,
  imageUrl,
}) => {
  return (
    <BookContainer>
      <BookTitle variant="h5">
        <Link href={`/books/${_id}`}>
          <a>{name}</a>
        </Link>
      </BookTitle>
      <Typography variant="h6">by {author}</Typography>
      <img style={{ width: "350px" }} src={imageUrl} />
    </BookContainer>
  );
};

export default CatalogueBook;
