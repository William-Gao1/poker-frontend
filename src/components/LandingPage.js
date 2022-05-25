import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import PageWrapper from './PageWrapper'
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import { connectSocket, createRoom, joinRoom } from '../redux/Socket/socket.actions'
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

    componentDidUpdate() {
        if (this.props.roomId) {
            this.props.navigate(`/room/${this.props.roomId}`)
        }
    }

    joinRoom = async () => {
        if (!this.state.activeId) {
            return this.setState({error: 'Please provide a room code'})
        }
        try {
            await this.props.joinRoom(this.state.activeId)
        } catch (e) {
            return this.setState({error: e.message})
        }
    }

    createRoom = async () => {
        if (!this.state.bigBlind || !this.state.smallBlind) {
            return this.setState({error: 'Please provide all required fields'})
        }
        try {
             await this.props.createRoom(this.state.bigBlind, this.state.smallBlind)
        } catch (e) {
            return this.setState({error: e.message})
        }
    }

    toggleDisplayCreateRoom = () => {
        this.setState((state) => ({error: '', displayCreateRoom: !state.displayCreateRoom}))
    }

    render() {
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
        username: state.user.username,
        roomId: state.room.activeId
    }
}

const mapDispatchToProps = dispatch => ({
    connectSocket: () => dispatch(connectSocket()),
    joinRoom: async (activeId) => await dispatch(joinRoom(activeId)),
    createRoom: async (bigBlind, smallBlind) => await dispatch(createRoom(bigBlind, smallBlind))
})

export default connect(mapStateToProps, mapDispatchToProps)(HOCRoom)