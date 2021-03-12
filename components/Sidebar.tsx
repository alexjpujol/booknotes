// next
import Link from "next/link";
// lib
import { FunctionComponent } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
// types
import { Genres } from "types";

const Main = styled.div`
  margin: 32px;
  padding: 8px;
  background-color: white;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;

  a {
    color: black;
  }

  a:visited {
    color: black;
  }
`;

const years: Array<number> = [2021, 2020, 2019];
const genres: Array<Genres> = Object.values(Genres);

export const Sidebar: FunctionComponent = () => {
  return (
    <Main>
      <Typography variant="h5">Year</Typography>
      <StyledList>
        {years.map((yearRead) => (
          <Typography key={`${yearRead}-sidenav`}>
            <Link href={{ pathname: "/", query: { year: yearRead } }}>
              <a>{yearRead}</a>
            </Link>
          </Typography>
        ))}
      </StyledList>

      <Typography variant="h5">Genre</Typography>
      <StyledList>
        {genres.map((bookGenre) => (
          <Typography key={`${bookGenre}-sidenav`}>
            <Link href={{ pathname: "/", query: { genre: bookGenre } }}>
              <a>{bookGenre}</a>
            </Link>
          </Typography>
        ))}
      </StyledList>
    </Main>
  );
};

export default Sidebar;
