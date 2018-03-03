import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ListBooks from './ListBooks'
import NotFound from './NotFound'
import SearchBooks from './SearchBooks'
import '../styles/App.css'
import * as BooksAPI from '../utils/api'

/**
 * Main component for the My Reads app
 */
class BooksApp extends Component {
  // books: list of books currently reading, want to read, or read
  state = {
    books: []
  }

  // When the component mount, fetch books list from the server
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Change book shelf of a book already in the books list
  changeBookShelf = (book, shelf) => {
    this.setState((state) => {
      state.books.find((prevBook) => prevBook.id === book.id).shelf = shelf
      return {books: state.books}
    })
  }

  // Add a book in the books list
  addBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.concat([ book ])
    }))
  }

  // Change book shelf of the book
  onBookShelfChange = (book, shelf) => {
    const { books } = this.state

    // If the book is in the list, change book shelf of the book
    if (books.find((prevBook) => prevBook.id === book.id)) {
      this.changeBookShelf(book, shelf)
    } else {
      // If the book isn't in the list, add the book in the books list
      this.addBook(book, shelf)
    }
    BooksAPI.update(book, shelf)
  }

  // Render the component
  render() {
    const { books } = this.state
    // Sort Books by title in alphabetical order
    const sortedBooks = Array.from(books).sort((book1, book2) => (
      book1.title.toUpperCase() > book2.title.toUpperCase() ? 1 :
      book1.title.toUpperCase() < book2.title.toUpperCase() ? -1 : 0
    ))

    return (
      <div className="app">

        <Switch>

          <Route exact path='/' render={() => (
            <ListBooks
              books={sortedBooks}
              onBookShelfChange={this.onBookShelfChange}
            />
          )}/>

          <Route exact path='/search' render={() => (
            <SearchBooks
              books={books}
              onBookShelfChange={this.onBookShelfChange}
            />
          )}/>

          <Route component={NotFound}/>

        </Switch>
      </div>
    )
  }
}

export default BooksApp
