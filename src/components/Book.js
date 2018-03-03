import PropTypes from 'prop-types'
import React, { Component } from 'react'

import imageNotFound from '../assets/imgs/no_image.jpg'

/**
 * Component to represent a book in the app
 */
class Book extends Component {
  // book: a book instance from the books list or the search results
  // onBookShelfChange: event handler for changing book shelf of the book
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  // Render the component
  render() {
    const { book, onBookShelfChange } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128, height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : imageNotFound})`
              }}>
            </div>

            <div className="book-shelf-changer">
              <select
                defaultValue={book.shelf || 'none'}
                onChange={(event) => onBookShelfChange(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{book.title}</div>

          {book.authors && (book.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          )))}
        </div>
      </li>
    )
  }
}

export default Book
