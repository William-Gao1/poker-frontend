import React from 'react'
import numeral from 'numeral'

const PokerUserComponent = ({ displayName, moneyRemaining, moneyBet, numberOfPlayers, seatNumber }) => {
    const displayMoneyInPot = (
        <React.Fragment>
            <img src="/poker-chip.svg" alt="Poker Chip" className="pokerChip" />
            <p className="moneyInPot">{numeral(moneyBet).format('($ 0[.]00 a)')}</p>
        </React.Fragment>
    )

    const x = 57 - 35 * Math.cos((-seatNumber * 2 * Math.PI / numberOfPlayers) + (Math.PI / 2));
    const y = 50 + 35 * Math.sin((-seatNumber * 2 * Math.PI / numberOfPlayers) + (Math.PI / 2));
    return (
        <div className="pokerUserContainer" style={{top: `${100 - y}%`, left: `${100 - x}%`}}>
            <div className="pokerUser">
                <p>{displayName}</p>
                <p>{numeral(moneyRemaining).format('($ 0[.]00 a)')}</p>
            </div>
            {moneyBet && moneyBet !== 0 ? displayMoneyInPot : null}
        </div>

    )
}

export default PokerUserComponent;