import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import PageWrapper from './PageWrapper'
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import { connectSocket, joinRoom } from '../redux/Socket/socket.actions'

class LandingPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeId: '',
            error: '',
            joinRoom: false,
            bigBlind: 0,
            smallBlind: 0,
            displayCreateRoom: false,
            players: {}
        }
    }

    componentDidMount() {
        this.props.connectSocket();
    }

    joinRoom = () => {
        if (!this.state.activeId) {
            return this.setState({error: 'Please provide a room code'})
        }
        try {
            this.props.joinRoom(this.state.activeId)
            this.props.navigate(`/room/${this.state.activeId}`)
        } catch (e) {
            this.setState({error: e.message})
        }
        // if (this.socket.disconnected) {
        //     this.socket.connect(process.env.REACT_APP_BACKEND_URL, {auth: {token: getToken()}})
        // }
        // if (this.socket.connected) {
        //     this.socket.emit('join room', this.state.activeId, (data) => {
        //         if (data.status !== 200) {
        //             this.setState({error: data.message})
        //         } else {
        //             this.setState({joinRoom: true, players: data.players})
        //         }
        //     })
        // } else {
        //     this.setState({error: 'Could not establish connection with server'})
        // }
    }

    createRoom = () => {
        if (!this.state.bigBlind || !this.state.smallBlind) {
            return this.setState({error: 'Please provide all required fields'})
        }
        // if (this.socket.disconnected) {
        //     this.socket.connect(process.env.REACT_APP_BACKEND_URL, {auth: {token: getToken()}})
        // }
        // if (this.socket.connected) {
        //     this.socket.emit('create room', {bigBlind: this.state.bigBlind, smallBlind: this.state.smallBlind}, (data) => {
        //         if (data.status !== 201) {
        //             console.log(data)
        //             this.setState({error: data.message})
        //         } else {
        //             this.setState({joinRoom: true, activeId: data.active_id, players: data.players})
        //         }
        //     })
        // } else {
        //     this.setState({error: 'Could not establish connection with server'})
        // }
    }

    toggleDisplayCreateRoom = () => {
        this.setState((state) => ({error: '', displayCreateRoom: !state.displayCreateRoom}))
    }

    render() {
        if (this.state.joinRoom) {
            // this.props.setPlayers(this.players)
            // return <Navigate to={`/room/${this.state.activeId}`} />
        }

        const joinRoom = (
            <div>
                <TextField required id="outlined-basic" label="Room Code" variant="outlined" size="small" onChange={(e) => this.setState({activeId: e.target.value})} />
                <Button variant="contained" color="primary" onClick={this.joinRoom}>Join</Button>
                <Button variant="contained" color="secondary" onClick={() => this.toggleDisplayCreateRoom()}>Create</Button>
                <Typography color="error">
                    {this.state.error}
                </Typography>
            </div>
        )

        const createRoom = (
            <div>
            <Input type="number"/>
                <TextField required id="outlined-basic" label="Big Blind" variant="outlined" size="small" onChange={(e) => this.setState({bigBlind: e.target.value})} />
                <TextField required id="outlined-basic" label="Small Blind" variant="outlined" size="small" onChange={(e) => this.setState({smallBlind: e.target.value})} />
                <Button variant="contained" color="secondary" onClick={() => this.toggleDisplayCreateRoom()}>Back</Button>
                <Button variant="contained" color="primary" onClick={() => this.createRoom()}>Create</Button>
                <Typography color="error">
                    {this.state.error}
                </Typography>
            </div>
        )
        return (
            <PageWrapper >
                <div>
                    Welcome to homepage {this.props.username}
                </div>
                {this.state.displayCreateRoom ? createRoom : joinRoom}
            </PageWrapper>
        )
    }
}


const HOCRoom = (props) => {
    const navigate = useNavigate();
    return <LandingPage {...props} navigate={navigate} />
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

const mapDispatchToProps = dispatch => ({
    connectSocket: () => dispatch(connectSocket()),
    joinRoom: (activeId) => dispatch(joinRoom(activeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(HOCRoom)