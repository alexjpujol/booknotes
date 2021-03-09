import { FunctionComponent, MouseEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CatalogueBookProps {
  id: string;
  name: string;
}

const BookContainer = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid black;
  margin: 3em;
  text-align: center;
`;

const CatalogueBook: FunctionComponent<CatalogueBookProps> = ({ id, name }) => {
  const router = useRouter();
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`books/${id}`);
  };

  return (
    <BookContainer>
      <h2>
        <a href={`books/${id}`} onClick={handleClick}>
          {name}
        </a>
      </h2>
    </BookContainer>
  );
};

export default CatalogueBook;
