// lib
import { FunctionComponent, BaseSyntheticEvent } from "react";
import { Button } from "@material-ui/core";

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
        <Button variant="contained" type="submit">
          Save
        </Button>
        <Button type="button" onClick={() => onClose()}>
          Cancel
        </Button>
      </>
    </form>
  );
};

export default NoteForm;
