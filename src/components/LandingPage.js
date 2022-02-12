import React from 'react'
import { connect } from 'react-redux'
import PageWrapper from './PageWrapper'

const LandingPage = ({username}) => (
    <PageWrapper>
        <div>
            Welcome to homepage {username}
        </div>
    </PageWrapper>
)

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(LandingPage)