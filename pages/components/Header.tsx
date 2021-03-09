import styled from "styled-components";
import IconWrapper from "pages/components/common/IconWrapper";
import AddIcon from "pages/components/Icons/AddIcon";
import { ElementSizes } from "types";

const Main = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  title: string;
}

const Header = ({ title }) => {
  return (
    <Main>
      <IconWrapper icon={AddIcon} size={ElementSizes.lg} />
      <h1>{title}</h1>
    </Main>
  );
};

export default Header;
