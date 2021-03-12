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
`;

const IconSpacer = styled.div`
  margin-top: 32px;
  margin-right: 210px;
  display: inline-block;
`;

interface HeaderProps {
  title: string | React.ReactNode;
  author?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title, author }) => {
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

      {!!author ? (
        <Typography style={{ display: "inline-block" }} variant="h2">
          {title} by {author}
        </Typography>
      ) : (
        <Typography style={{ display: "inline-block" }} variant="h2">
          {title}
        </Typography>
      )}
    </Main>
  );
};

export default Header;
