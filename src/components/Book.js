import React from "react";

const Book = ({ book, updateBook }) => {
  const handleChange = (e) => {
    e.preventDefault();
    if (updateBook) {
      updateBook(book, e.target.value);
    }
  };
  if (!book.shelf) {
    book.shelf = "none";
  }
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          {book.imageLinks && (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: "url(" + book.imageLinks.thumbnail + ")",
              }}
            ></div>
          )}
          <div className="book-shelf-changer">
            {book.shelf && (
              <select onChange={handleChange} defaultValue={book.shelf}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            )}
          </div>
        </div>
        {book.title && <div className="book-title">{book.title}</div>}
        {book.authors &&
          book.authors.map((author) => (
            <div className="book-authors" key={author}>
              {author}
            </div>
          ))}
      </div>
    </li>
  );
};

export default Book;
