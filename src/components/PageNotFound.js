import { Button } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from './AppBar'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <AppBar />
            <div className="errorPage">
                <p className="errorCode">404</p>
                <p className="errorMessage">The page you were looking for could not be found</p>
                <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Homepage</Button>
            </div>
        </React.Fragment>
    )
}

export default PageNotFound