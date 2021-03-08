import styled from "styled-components";

const Main = styled.div`
  border: 1px solid black;
  padding: 32px;
  color: green;
`;

const years = [2019, 2020, 2021];

export const Sidebar = () => {
  return (
    <Main>
      <ul>
        {years.map((year) => (
          <li key={`${year}-sidenav`}>{year}</li>
        ))}
      </ul>
    </Main>
  );
};

export default Sidebar;
