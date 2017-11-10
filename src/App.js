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

      /**
      /* TODO: Remove log statement after refactoring code
      **/
      console.log(this.state.books)
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
