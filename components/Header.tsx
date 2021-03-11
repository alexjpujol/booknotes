// lib
import { FunctionComponent } from "react";
import styled from "styled-components";
// components
import IconWrapper from "components/common/IconWrapper";
import AddIcon from "components/icons/AddIcon";
// types
import { ElementSizes } from "types";

const Main = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  title: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <Main>
      <IconWrapper icon={AddIcon} size={ElementSizes.lg} />
      <h1>{title}</h1>
    </Main>
  );
};

export default Header;
