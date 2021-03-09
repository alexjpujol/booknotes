import { FunctionComponent } from "react";
import styled from "styled-components";

const PostIt = styled.div`
  width: 250px;
  height: 250px;
  background-color: rgb(254, 255, 156);
  margin: 24px;
  text-align: center;
  padding: 16px;
`;

interface NoteProps {
  text: string;
}

const Note: FunctionComponent<NoteProps> = ({ text }) => {
  return <PostIt>{text}</PostIt>;
};

export default Note;
