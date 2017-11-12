# MyReads: A Book Tracking App

MyReads is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. MyReads is built using React and interact with an API server to persist information as you interact with the application.

## TL;DR

To start MyReads App:

* clone the project with `git clone https://github.com/YoungsAppWorkshop/reactnd-project-myreads`
* change directory into `cd reactnd-project-myreads`
* install all project dependencies with `npm install`
* start the server with `npm start`

## Structure of the App

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js # This is the root of the app.
    ├── App.test.js
    ├── Book.js # This represents a book instance.
    ├── BooksAPI.js
    ├── icons
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── imgs
    │   └── no_image.jpg # If a book's cover image is not available, this image is used as cover.
    ├── index.css
    ├── index.js
    ├── ListBooks.js # This is the main page of the app.
    └── SearchBooks.js # This is the search page of the app.
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## License

This is a public domain work, dedicated using
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
