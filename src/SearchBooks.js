import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    onBookShelfChange: PropTypes.func.isRequired
  }

  state = {
		query: '',
    searchResults: []
	}

  updateQuery = (query) => {
		this.setState({ query: query })
	}

  onEnterKeyPress = (query) => {
    this.updateQuery(query)
    BooksAPI.search(query, 20).then(searchResults => {
      searchResults.error ? this.setState({ searchResults: [] }): this.setState({ searchResults })
    })
  }

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
