import Book from "./Book"

const BookShelf = ({books,updateBook}) => {
    return (
        <div className="bookshelf-books">
	  	<ol className="books-grid">
		  {books && books.map((book) => (
			<Book
				key={book.id}
				book={book}
				updateBook={updateBook}
			/>
		  ))}
		</ol>
	  </div>   
    )
}

export default BookShelf
