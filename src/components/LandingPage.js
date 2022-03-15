import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { connectToRoom } from '../services/socket'
import PageWrapper from './PageWrapper'
import { io } from "socket.io-client"
import { getToken } from '../services/auth'

const LandingPage = ({ username }) => {
    const [activeId, updateActiveId] = useState('');
    const [socket, updateSocket] = useState();
    useEffect(() => {
        updateSocket(io(process.env.REACT_APP_BACKEND_URL, {auth: {token: getToken()}}));
    }, [])

    return (
        <PageWrapper >
            <div>
                Welcome to homepage {username}
            </div>
            <div>
                <TextField id="outlined-basic" label="Room ID" variant="outlined" size="small" onChange={(e) => updateActiveId(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => connectToRoom(socket, activeId)}>Join</Button>
                <Button variant="contained" color="secondary">Create</Button>
            </div>
        </PageWrapper>
    )
}


const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(LandingPage)