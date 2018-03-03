import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/**
 * Component to represent the main page for the app
 */
class ListBooks extends Component {

  // books: list of books currently reading, want to read, or read
  // onBookShelfChange: event handler for changing book shelf of a book
  static propTypes = {
    books: PropTypes.array.isRequired,
		onBookShelfChange: PropTypes.func.isRequired
  }

  // Render the component
  render() {
    const { books, onBookShelfChange } = this.props

    return (
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
  }
}

export default ListBooks