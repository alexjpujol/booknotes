// next
import Link from "next/link";
// lib
import { FunctionComponent } from "react";
import styled from "styled-components";
import { Breadcrumbs as MUBreadcrumbs, Typography } from "@material-ui/core";

const Container = styled.div`
  padding: 16px;

  a {
    color: black;
  }
`;

interface BreadCrumbsProps {
  title?: string;
}

export const Breadcrumbs: FunctionComponent<BreadCrumbsProps> = ({ title }) => {
  return (
    <Container>
      <MUBreadcrumbs>
        <Link href="/">
          <a>Home</a>
        </Link>
        {title && <Typography>{title}</Typography>}
      </MUBreadcrumbs>
    </Container>
  );
};

export default Breadcrumbs;
