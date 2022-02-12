import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from './AppBar'

const PageNotFound = () => {
    return (
        <div id="wrapper">
            <AppBar/>
            <img src="https://i.imgur.com/qIufhof.png" alt="Not found"/>
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default PageNotFound