import { useRouter } from "next/router";
import { BaseSyntheticEvent, FunctionComponent, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { CreateBookValues, Genres } from "types";

const Form = styled.form`
  padding: 128px;
  margin: 0 auto;
  width: 600px;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
`;

const NewBook: FunctionComponent = () => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const createBook = async (event: BaseSyntheticEvent) => {
    try {
      event.preventDefault();
      const formValues: CreateBookValues = {
        name: event.target.name.value as string,
        dateStart: event.target.dateStart.value as Date,
        dateEnd: event.target.dateEnd.value as Date,
        genre: event.target.genre.value,
        // image: event.target.image.files[0],
      };
      const res = await fetch(`/api/books/new`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (res.status === 201) {
        router.push(`/`, undefined, { shallow: false });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const onUploadImage = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    setImageSrc(src);
    setImageUploaded(true);
  };

  return (
    <Form onSubmit={createBook}>
      <FormSection>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" required />
      </FormSection>

      <FormSection>
        <label htmlFor="dateStart">Date Started: </label>
        <input id="dateStart" type="date" max={Date.now()} required />
      </FormSection>

      <FormSection>
        <label htmlFor="dateEnd">Date Ended: </label>
        <input id="dateEnd" type="date" max={Date.now()} required />
      </FormSection>

      <FormSection>
        <label htmlFor="genre">Genre: </label>
        <select id="genre">
          {Object.values(Genres).map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </FormSection>

      <FormSection>
        <label htmlFor="image">Image: </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={onUploadImage}
          style={{ marginLeft: "80px" }}
        />
      </FormSection>

      {imageUploaded && (
        <div style={{ textAlign: "center" }}>
          <img style={{ maxWidth: "400px" }} src={imageSrc} />
        </div>
      )}
      <>
        <Button
          type="reset"
          value="Reset"
          onClick={() => {
            setImageUploaded(false);
            setImageSrc("");
          }}
        >
          Reset
        </Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </>
    </Form>
  );
};

export default NewBook;
