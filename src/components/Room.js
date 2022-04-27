import React from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PokerUser from './PokerUser'
import { Button, ButtonGroup, Input, Slider } from '@material-ui/core';
import { joinRoom, leaveRoom } from '../redux/Socket/socket.actions';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            activeId: props.params.activeId,
            bettingSliderValue: 0,
            pot: 0
        }
    }

    componentDidMount() {
        if (!this.props.room) {
            this.props.joinRoom(this.state.activeId)
        }
    }
    
    componentWillUnmount() {
        this.props.leaveRoom();
    }

    handleSliderChange = (e, newValue) => {
        const percentageValue = newValue * this.props.players[this.props.seatNumber].moneyRemaining / 100
        this.setState({bettingSliderValue: percentageValue})
    }

    handleInputChange = (newValue) => {
        this.setState({bettingSliderValue: newValue})
    }

    render() {
        if (this.state.error) {
            return (
                <PageWrapper>
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="errorModal">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {this.state.error}
                            </Typography>
                            <Button onClick={() => this.props.navigate("/")}>Homepage</Button>
                        </Box>
                    </Modal >
                </PageWrapper>

            )
        }
        return (
            <PageWrapper>

                {this.props.players && Object.keys(this.props.players).map((seatNumber) => {
                    const {moneyBet, name, moneyRemaining} = this.props.players[seatNumber];
                    return <PokerUser moneyBet={moneyBet} moneyRemaining={moneyRemaining} displayName={name} numberOfPlayers={this.props.maxPlayers} seatNumber={+seatNumber} key={seatNumber} />
                })}

                <div className="bettingDisplay">
                    <ButtonGroup variant='outlined'>
                        <Button onClick={() => this.handleInputChange(this.state.pot/2)}>1/2 Pot</Button>
                        <Button onClick={() => this.handleInputChange(this.state.pot)}>Pot</Button>
                        <Button onClick={() => this.handleSliderChange(null, 100)}>All In</Button>
                    </ButtonGroup>
                    <div className='bettingSlider'>
                    <Slider value={this.props.players ? 100 * this.state.bettingSliderValue / this.props.players[this.props.seatNumber].moneyRemaining : 0}
                    onChange={this.handleSliderChange}
                    />
                    <Input 
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: this.props.players ? this.props.players[this.props.seatNumber].moneyRemaining : 0,
                        type: 'number'
                    }}
                    onChange={(e) => this.handleInputChange(e.target.value)}
                    value={this.state.bettingSliderValue}
                    />
                    </div>
                    <ButtonGroup variant='outlined'>
                        <Button>Fold</Button>
                        <Button>Call</Button>
                        <Button>Bet</Button>
                    </ButtonGroup>
                </div>
            </PageWrapper>
        )
    }
}

const HOCRoom = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Room {...props} params={params} navigate={navigate} />
}

const mapStateToProps = (state) => ({
    players: state.room.players,
    seatNumber: state.room.seatNumber,
    maxPlayers: state.room.maxPlayers
})

const mapDispatchToProps = (dispatch) => ({
    leaveRoom: () => dispatch(leaveRoom()),
    joinRoom: (activeId) => dispatch(joinRoom(activeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(HOCRoom);