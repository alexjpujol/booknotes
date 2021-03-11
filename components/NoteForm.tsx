// next
import { useRouter } from "next/router";
// lib
import { FunctionComponent, BaseSyntheticEvent, useRef } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-right: 16px;
`;

interface NoteFormProps {
  onSubmit: (event: BaseSyntheticEvent) => Promise<void>;
  onClose: () => void;
}

export const NoteForm: FunctionComponent<NoteFormProps> = ({
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="noteText"></label>
      <textarea
        id="noteText"
        rows={10}
        cols={31}
        placeholder="Type your note here"
        required
      ></textarea>
      <>
        <StyledButton type="submit">Save</StyledButton>
        <StyledButton type="button" onClick={() => onClose()}>
          Cancel
        </StyledButton>
      </>
    </form>
  );
};

export default NoteForm;
