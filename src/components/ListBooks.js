import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'


/**
 * Component to represent the main page for the app
 */
const ListBooks = ({ books, onBookShelfChange }) => (
  <div className="list-books">

    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>

    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(book => book.shelf === 'currentlyReading').map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onBookShelfChange={onBookShelfChange}
                />
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(book => book.shelf === 'wantToRead').map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onBookShelfChange={onBookShelfChange}
                />
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(book => book.shelf === 'read').map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onBookShelfChange={onBookShelfChange}
                />
              ))}
            </ol>
          </div>
        </div>

      </div>
    </div>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>

  </div>
)

ListBooks.propTypes = {
  /**
   * List of books currently reading, want to read, or read
   */
  books: PropTypes.array.isRequired,
  /**
   * Event handler for changing book shelf of a book
   */
  onBookShelfChange: PropTypes.func.isRequired
}

export default ListBooks
