import styled from "styled-components";

const Main = styled.div`
  padding: 32px;
`;

const YearList = styled.ul`
  list-style-type: none;
  text-align: center;
  padding: 0;
`;

const Year = styled.li`
  margin: 8px;
`;

const years = [2021, 2020, 2019];

export const Sidebar = () => {
  return (
    <Main>
      <YearList>
        {years.map((year) => (
          <Year key={`${year}-sidenav`}>{year}</Year>
        ))}
      </YearList>
    </Main>
  );
};

export default Sidebar;
