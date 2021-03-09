import styled from "styled-components";
import Add from "pages/components/Icons/add";

const Main = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  border: none;
  background-color: white;
  margin-right: 32px;
`;

const Header = () => {
  return (
    <Main>
      <AddButton>
        <Add />
      </AddButton>
      <h1>Booknotes</h1>
    </Main>
  );
};

export default Header;
