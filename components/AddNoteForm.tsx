// next
import { useRouter } from "next/router";
// lib
import { FunctionComponent, BaseSyntheticEvent, useRef } from "react";
import styled from "styled-components";
// types
import { CreateNoteValues } from "types";

const Main = styled.div`
  width: 250px;
  height: 250px;
  margin: 24px;
`;

const StyledButton = styled.button`
  margin-right: 16px;
`;

interface AddNoteFormProps {
  bookId: string;
  onClose: () => void;
}

export const AddNoteForm: FunctionComponent<AddNoteFormProps> = ({
  bookId,
  onClose,
}) => {
  const router = useRouter();
  const createNote = async (event: BaseSyntheticEvent) => {
    try {
      event.preventDefault();
      const formValues: CreateNoteValues = {
        bookId,
        noteText: event.target.noteText.value,
      };
      const res = await fetch(`/api/notes/new`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (res.status === 201) {
        router.reload();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Main>
      <form onSubmit={createNote}>
        <label htmlFor="noteText"></label>
        <textarea
          id="noteText"
          rows={5}
          cols={32}
          placeholder="Type your note here"
          required
        ></textarea>
        <>
          <StyledButton type="submit">Save</StyledButton>
          <StyledButton
            type="button"
            onClick={() => {
              onClose();
              // formRef.current.reset();
            }}
          >
            Cancel
          </StyledButton>
        </>
      </form>
    </Main>
  );
};

export default AddNoteForm;
