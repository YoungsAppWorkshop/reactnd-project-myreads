import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from '../utils/api'

/**
 * Component to represent the search page for the app
 */
class SearchBooks extends Component {

  static propTypes = {
    /**
     * List of books currently reading, want to read, or read
     */
    books: PropTypes.array.isRequired,
    /**
     * Event handler for changing book shelf of a book
     */
    onBookShelfChange: PropTypes.func.isRequired
  }

  state = {
    /**
     * User input string to search books
     */
		query: '',
    /**
     * Search results from the server: List of books
     */
    searchResults: []
	}

  // Sync query string on user input
  updateQuery = (query) => {
		this.setState({ query: query }, this.searchWhenUserStoppedTyping)
	}

  // Fetch search results from the server
  searchBooks = (query) => {
    // Fetch search results from the server
    BooksAPI.search(query, 20).then(searchResults => {
      // When error occurs while fetching data, clear search results
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
    }).catch(e => {
      console.log(e)
      this.setState({ searchResults: [] })
    })
  }

  // Trigger books search when user stopped typing
  searchWhenUserStoppedTyping = debounce(() => {
    const { query } = this.state

    if (query.trim() !== '') {
      this.searchBooks(query.trim())
    } else {
      // When user clears input field, clear search results
      this.setState({ searchResults: [] })
    }
  }, 500)

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
