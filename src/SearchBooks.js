import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/**
 * Component to represent the search page for the app
 */
class SearchBooks extends Component {

  // books: list of books currently reading, want to read, or read
  // onBookShelfChange: event handler for changing book shelf of a book
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  // query: user input string to search books
  // searchResults: query results from the server
  state = {
		query: '',
    searchResults: []
	}

  // Sync query string on user input
  updateQuery = (query) => {
		this.setState({ query: query })
	}

  // When user press enter key, fetch search results from the server
  onEnterKeyPress = (query) => {
    this.updateQuery(query)
    // Fetch search results from the server
    BooksAPI.search(query, 20).then(searchResults => {
      // When error occurs while fetching data, empty search results
      if (searchResults.error) {
        this.setState({ searchResults: [] })
      } else {
        // If searched books are already on the books list,
        // synchronize book shelf status of the searched books
        this.props.books.forEach((book) => {
          let bookOnShelf = searchResults.find((result) => result.id === book.id)
          if (bookOnShelf) {
            bookOnShelf.shelf = book.shelf
          }
        })
        this.setState({ searchResults })
      }
    })
  }

  // Render the component
  render() {
    const { onBookShelfChange } = this.props
    const { query, searchResults } = this.state

    return (
      <div className="search-books">

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              onKeyPress={(event) => (event.key === 'Enter' && this.onEnterKeyPress(query.trim()))}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
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
  }
}

export default SearchBooks
