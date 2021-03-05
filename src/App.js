import { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);
  console.log(books);

  const updateBook = (book, shelf) => {
    book.shelf = shelf;

    if (books.indexOf(book) < 0) {
      books.push(book);
    }
    BooksAPI.update(book, shelf).then(() =>
      setBooks((prevState) => [...prevState.map((b) => (b.id === book.id ? book : b))])
    );
  };
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <ListBooks books={books} updateBook={updateBook} />}
          />

          <Route
            path="/search"
            render={() => <SearchBooks books={books} updateBook={updateBook} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

