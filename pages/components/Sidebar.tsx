import { FunctionComponent } from "react";
import styled from "styled-components";
import { Genres } from "types";

const Main = styled.div`
  padding: 32px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  margin: 12px;
`;

const years: Array<number> = [2021, 2020, 2019];
const genres: Array<Genres> = Object.values(Genres);

export const Sidebar: FunctionComponent = () => {
  return (
    <Main>
      <h4>Year</h4>
      <StyledList>
        {years.map((year) => (
          <StyledListItem key={`${year}-sidenav`}>{year}</StyledListItem>
        ))}
      </StyledList>

      <h4>Genre</h4>
      <StyledList>
        {genres.map((genre) => (
          <StyledListItem key={`${genre}-sidenav`}>{genre}</StyledListItem>
        ))}
      </StyledList>
    </Main>
  );
};

export default Sidebar;
