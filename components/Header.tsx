import { useRouter } from "next/router";
// lib
import { FunctionComponent } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
// components
import IconWrapper from "components/common/IconWrapper";
import AddIcon from "components/icons/AddIcon";
// types
import { ElementSizes } from "types";

const Main = styled.div`
  padding: 16px 32px;
  display: flex;
`;

const IconSpacer = styled.div`
  margin-top: 32px;
  margin-right: 40%;
`;

interface HeaderProps {
  title: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const router = useRouter();
  return (
    <Main>
      <IconSpacer>
        <IconWrapper
          onClick={() => router.push(`/books/new`)}
          icon={AddIcon}
          size={ElementSizes.lg}
        />
      </IconSpacer>
      <Typography variant="h2">{title}</Typography>
    </Main>
  );
};

export default Header;
