const NewBook = () => {
  const createBook = (e) => {
    e.preventDefault();
    fetch("/api/new", {
      body: JSON.stringify({}),
    });
  };

  return (
    <form onSubmit={createBook}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" required />

      <label htmlFor="name">Date Started</label>
      <input id="dateStart" type="text" required />

      <button type="submit">Create</button>
    </form>
  );
};

export default NewBook;
