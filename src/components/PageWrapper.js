import React from 'react';
import Header from './AppBar';
import { isLoggedIn } from '../services/auth'

class PageWrapper extends React.Component {
    render() {
        const loggedIn = isLoggedIn();
        return (
            <React.Fragment>
                <Header loggedIn={loggedIn}/>
                <div className="appContainer">
                    {this.props.children}
                </div>

            </React.Fragment>
        );
    }
}

export default PageWrapper;