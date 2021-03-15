// next
import { useRouter } from "next/router";
// lib
import { BaseSyntheticEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { timeout } from "utils/timeout";
// components
import NoteForm from "components/NoteForm";
import IconEdit from "components/icons/EditIcon";
import IconDelete from "components/icons/DeleteIcon";
import IconWrapper from "./common/IconWrapper";
// types
import { EditOrDeleteNoteValues } from "types";

const PostItColor = `rgb(254, 255, 156)`;

const PostIt = styled.div`
  width: 250px;
  height: 250px;
  overflow: scroll;
  background-color: ${PostItColor};
  margin: 24px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
  span {
    padding-left: 8px;
  }
`;

interface NoteProps {
  text: string;
}

const Note: FunctionComponent<NoteProps> = ({ text }) => {
  const [showEditNoteForm, setShowEditNoteForm] = useState(false);
  const router = useRouter();
  const bookId = router.query.id as string;

  const editNote = async (event: BaseSyntheticEvent) => {
    const formValues: EditOrDeleteNoteValues = {
      bookId,
      noteText: text,
      newNoteText: event.target.noteText.value,
    };
    try {
      const res = await fetch(`/api/note`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      if (res.status === 200) {
        timeout(2000);
        router.reload();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const deleteNote = async (event: BaseSyntheticEvent) => {
    const formValues: EditOrDeleteNoteValues = {
      bookId,
      noteText: text,
    };
    try {
      const res = await fetch(`/api/note`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (res.status === 200) {
        timeout(2000);
        router.reload();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <PostIt>
      {showEditNoteForm ? (
        <NoteForm
          onClose={() => setShowEditNoteForm(false)}
          onSubmit={editNote}
          initialValues={text}
        />
      ) : (
        <>
          <Icons>
            <IconWrapper
              onClick={() => setShowEditNoteForm(true)}
              backgroundColor={PostItColor}
              icon={IconEdit}
            />
            <IconWrapper
              onClick={deleteNote}
              backgroundColor={PostItColor}
              icon={IconDelete}
            />
          </Icons>
          <Typography>{text}</Typography>
        </>
      )}
    </PostIt>
  );
};

export default Note;
