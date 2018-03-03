import React from 'react'
import { Link } from 'react-router-dom'

import PageNotFoundImg from '../assets/imgs/page_not_found.jpg'

/**
 * Presentational Component which represent 404 Not Found page
 */
const NotFound = () => (

  <div className="page-not-found">

    <div className="page-not-found-title">
      <h1>MyReads</h1>
    </div>


    <div className="page-not-found-body">

      <img className="page-not-found-img" src={PageNotFoundImg} alt="Page Not Found"/>

      <h2>Page Not Found</h2>

      <Link to="/">Go Back</Link>

    </div>

  </div>
)

export default NotFound
