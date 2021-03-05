import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const SearchBooks = ({ books, updateBook }) => {
  const [searchQuery, setQuery] = useState("");
  const [selectedBooks, setSelected] = useState([]);
  const updateQuery = (query) => {
    if (query) {
      setQuery("Searching...");
      BooksAPI.search(query, 20).then((data) => {
        if (data) {
          if (!data.error) {
            data = data.map((book) => {
              const bookInShelf = books.find((b) => b.id === book.id);
              if (bookInShelf) {
                book.shelf = bookInShelf.shelf;
              }
              return book;
            });
            setQuery("Results");
            setSelected(data);
          } else {
            setQuery("error");
            setSelected(data.error);
          }
        }
      });
    } else {
      setQuery("No Results");
      setSelected([]);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => updateQuery(e.target.value)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchQuery === "Searching..." && (
            <div className="search-book-results-msg">Searching...</div>
          )}
          {searchQuery === "No Results" && (
            <div className="search-book-results-msg"></div>
          )}
          {searchQuery === "error" && selectedBooks === "empty query" && (
            <div className="search-book-results-msg">No results</div>
          )}
          {searchQuery === "Results" &&
            selectedBooks.map((book) => (
              <Book key={book.id} book={book} updateBook={updateBook} />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
