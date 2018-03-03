import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'


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

        <BookShelf
          books={books.filter(book => book.shelf === 'currentlyReading')}
          onBookShelfChange={onBookShelfChange}
          title={'Currently Reading'}
        />

        <BookShelf
          books={books.filter(book => book.shelf === 'wantToRead')}
          onBookShelfChange={onBookShelfChange}
          title={'Want to Read'}
        />

        <BookShelf
          books={books.filter(book => book.shelf === 'read')}
          onBookShelfChange={onBookShelfChange}
          title={'Read'}
        />

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
