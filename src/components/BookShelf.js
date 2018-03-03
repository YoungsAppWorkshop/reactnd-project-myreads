import PropTypes from 'prop-types'
import React from 'react'

import Book from './Book'


/**
 * Component to represent a Book Shelf
 */
const BookShelf = ({ books, onBookShelfChange, title }) => (

  <div className="bookshelf">

    <h2 className="bookshelf-title">{title}</h2>

    <div className="bookshelf-books">

      <ol className="books-grid">
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onBookShelfChange={onBookShelfChange}
          />
        ))}
      </ol>

    </div>

  </div>
)

BookShelf.propTypes = {
  /**
   * List of books currently reading, want to read, or read
   */
  books: PropTypes.array.isRequired,
  /**
   * Event handler for changing book shelf of a book
   */
  onBookShelfChange: PropTypes.func.isRequired,
  /**
   * Title string for the book shelf
   */
  title: PropTypes.string.isRequired
}

export default BookShelf
