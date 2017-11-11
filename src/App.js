import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, shelf) => {
    this.setState((state) => {
      state.books.find((prevBook) => prevBook.id === book.id).shelf = shelf
      return {books: state.books}
    })
  }

  addBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.concat([ book ])
    }))
  }

  onBookShelfChange = (book, shelf) => {
    console.log(book)
    if (this.state.books.find((prevBook) => prevBook.id === book.id)) {
      this.changeBookShelf(book, shelf)
    } else {
      this.addBook(book, shelf)
    }
    BooksAPI.update(book, shelf)
  }

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
