import React from 'react'
import numeral from 'numeral'

const suits = {
    s: <p style={{ marginBottom: 0 }}>&spades;</p>,
    c: <p style={{ marginBottom: 0 }}>&clubs;</p>,
    h: <p style={{ marginBottom: 0 }}>&hearts;</p>,
    d: <p style={{ marginBottom: 0 }}>&diams;</p>,
    x: <p style={{ marginBottom: 0 }}>?</p>
}

const PokerUserComponent = ({ displayName, moneyRemaining, moneyBet, numberOfPlayers, seatNumber, turn, hand }) => {
    const displayMoneyInPot = (
        <React.Fragment>
            <img src="/poker-chip.svg" alt="Poker Chip" className="pokerChip" />
            <p className="moneyInPot">{numeral(moneyBet).format('($ 0[.]00 a)')}</p>
        </React.Fragment>
    )
    const cardDisplay = hand && hand.length > 0 && (
        <div className="userCardDisplay">
            <div className="card">
                <p style={{ margin: 0 }}>{hand[0].charAt(0) === 'T' ? '10' : hand[0].charAt(0)}</p>
                {suits[hand[0].charAt(1)]}
            </div>
            <div className="card">
                <p style={{ margin: 0 }}>{hand[1].charAt(0) === 'T' ? '10' : hand[1].charAt(0)}</p>
                {suits[hand[1].charAt(1)]}
            </div>
        </div>

    )

    const x = 55 - 35 * Math.cos((-seatNumber * 2 * Math.PI / numberOfPlayers) + (Math.PI / 2));
    const y = 55 + 35 * Math.sin((-seatNumber * 2 * Math.PI / numberOfPlayers) + (Math.PI / 2));
    return (
        <div className="pokerUserContainer" style={{ top: `${100 - y}%`, left: `${100 - x}%` }}>
            <div className="pokerUserCardContainer">
                {cardDisplay}
                <div className={`pokerUser ${turn === seatNumber && "currentTurn"}`}>
                    <p>{displayName}</p>
                    <p>{numeral(moneyRemaining).format('($ 0[.]00 a)')}</p>
                </div>
            </div>
            {moneyBet && moneyBet !== 0 ? displayMoneyInPot : null}
        </div>

    )
}

export default PokerUserComponent;