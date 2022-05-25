import React from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import PageWrapper from './PageWrapper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PokerUser from './PokerUser'
import { Button, ButtonGroup, Input, Slider } from '@material-ui/core';
import { joinRoom, leaveRoom, startGame, checkOrCall, fold, bet } from '../redux/Socket/socket.actions';
import numeral from 'numeral'

const suits = {
    s: <p>&spades;</p>,
    c: <p >&clubs;</p>,
    h: <p>&hearts;</p>,
    d: <p>&diams;</p>,
    x: <p>?</p>
}

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            activeId: props.params.activeId,
            bettingSliderValue: 0,
            pot: props.pot,
            message: '',
        }
    }

    componentDidUpdate() {
        if (this.props.message !== this.state.message) {
            this.setState({message: this.props.message}, () => 
            this.props.message && this.props.alert.show(this.props.message, {type: this.props.messageType}))
        }
    }

    async componentDidMount() {
        if (!this.props.room) {
            try {
                await this.props.joinRoom(this.state.activeId)
            } catch (e) {
                this.setState({ error: e.message })
            }
        }
    }

    componentWillUnmount() {
        this.props.leaveRoom();
    }

    handleSliderChange = (e, newValue) => {
        const percentageValue = newValue * this.props.players[this.props.seatNumber].moneyRemaining / 100
        this.setState({ bettingSliderValue: percentageValue })
    }

    handleInputChange = (newValue) => {
        this.setState({ bettingSliderValue: newValue })
    }

    checkOrCall = () => {
        this.props.checkOrCall();
    }

    bet = () => {
        this.props.bet(this.state.bettingSliderValue);
    }

    fold = () => {
        this.props.fold();
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
                            <Button onClick={() => this.props.navigate("/")} variant='contained'>Homepage</Button>
                        </Box>
                    </Modal >
                </PageWrapper>

            )
        }
        return (
            <PageWrapper>
                {this.props.players && this.props.seatNumber && Object.keys(this.props.players).map((seatNumber) => {
                    const { moneyInPot, name, moneyRemaining, hand } = this.props.players[seatNumber];
                    return <PokerUser moneyBet={moneyInPot} moneyRemaining={moneyRemaining} displayName={name} numberOfPlayers={this.props.maxPlayers} seatNumber={+seatNumber} key={seatNumber} turn={this.props.turn} hand={hand} />
                })}
                {this.props.pot !== 0 && (<div className='potContainer'>
                    <img src="/multi-chips.webp" className="potChipsImg" alt="Poker chips" />
                    <p className="potAmount">{numeral(this.props.pot).format('($ 0[.]00 a)')}</p>
                </div>)}
                <div className="communityCards">
                    {this.props.communityCards && this.props.communityCards.map(card => {
                        return (
                            <div className='communityCard' key={card}>
                                <p>{card.charAt(0)}</p>
                                {suits[card.charAt(1)]}
                            </div>
                        )
                    })}
                </div>

                {this.props.roomStatus === 'WAITING' && this.props.players && this.props.seatNumber && this.props.players[this.props.seatNumber].id === this.props.owner && <Button variant='outlined' onClick={this.props.startGame}>Start Game</Button>}

                <div className="bettingDisplay">
                    <ButtonGroup variant='outlined'>
                        <Button onClick={() => this.handleInputChange(this.state.pot / 2)}>1/2 Pot</Button>
                        <Button onClick={() => this.handleInputChange(this.state.pot)}>Pot</Button>
                        <Button onClick={() => this.handleSliderChange(null, 100)}>All In</Button>
                    </ButtonGroup>
                    <div className='bettingSlider'>
                        <Slider value={this.props.players && this.props.seatNumber ? 100 * this.state.bettingSliderValue / this.props.players[this.props.seatNumber].moneyRemaining : 0}
                            onChange={this.handleSliderChange}
                            min={this.props.players && this.props.minimumCall && this.props.seatNumber ? (this.props.minimumCall - this.props.players[this.props.seatNumber].moneyInPot) * 100 / this.props.players[this.props.seatNumber].moneyRemaining : 0}
                        />
                        <Input
                            inputProps={{
                                step: 10,
                                min: this.props.players && this.props.minimumCall && this.props.seatNumber ? this.props.minimumCall - this.props.players[this.props.seatNumber].moneyInPot : 0,
                                max: this.props.players && this.props.seatNumber ? this.props.players[this.props.seatNumber].moneyRemaining : 0,
                                type: 'number'
                            }}
                            onChange={(e) => this.handleInputChange(e.target.value)}
                            value={this.state.bettingSliderValue}
                        />
                    </div>
                    <ButtonGroup variant='outlined'>
                        <Button onClick={this.fold}>Fold</Button>
                        <Button onClick={this.checkOrCall}>{this.props.players && this.props.seatNumber && this.props.players[this.props.seatNumber].moneyInPot >= this.props.minimumCall ? 'Check' : 'Call'}</Button>
                        <Button onClick={this.bet}>Bet</Button>
                    </ButtonGroup>
                </div>
            </PageWrapper>
        )
    }
}

const HOCRoom = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    return <Room {...props} params={params} navigate={navigate} alert={alert} />
}

const mapStateToProps = (state) => ({
    players: state.room.players,
    seatNumber: state.room.seatNumber,
    maxPlayers: state.room.maxPlayers,
    owner: state.room.owner,
    roomStatus: state.room.roomStatus,
    turn: state.room.turn,
    pot: state.room.pot,
    minimumCall: state.room.minimumCall,
    communityCards: state.room.communityCards,
    message: state.room.message?.message,
    messageType: state.room.message?.type
})

const mapDispatchToProps = (dispatch) => ({
    leaveRoom: () => dispatch(leaveRoom()),
    joinRoom: async (activeId) => await dispatch(joinRoom(activeId)),
    startGame: () => dispatch(startGame()),
    checkOrCall: () => dispatch(checkOrCall()),
    fold: () => dispatch(fold()),
    bet: async (amount) => dispatch(bet(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(HOCRoom);