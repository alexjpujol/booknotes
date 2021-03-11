import { useRouter } from "next/router";
import { BaseSyntheticEvent, FunctionComponent } from "react";
import styled from "styled-components";
import { CreateBookValues, Genres } from "types";

const Form = styled.form`
  padding: 48px;
  margin: 0 auto;
  width: 300px;
`;

const FormSection = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const NewBook: FunctionComponent = () => {
  const router = useRouter();
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

      {/* <FormSection>
        <label htmlFor="image">Image: </label>
        <input type="file" id="image" accept="image/*" />
      </FormSection> */}

      <button type="submit">Create</button>
    </Form>
  );
};

export default NewBook;
