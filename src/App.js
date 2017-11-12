import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

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

  // When user changes shelf of a book, change book shelf of the book
  // or add the book in the books list
  onBookShelfChange = (book, shelf) => {
    if (this.state.books.find((prevBook) => prevBook.id === book.id)) {
      this.changeBookShelf(book, shelf)
    } else {
      this.addBook(book, shelf)
    }
    BooksAPI.update(book, shelf)
  }

  // Render the component
  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onBookShelfChange={this.onBookShelfChange}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onBookShelfChange={this.onBookShelfChange}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
