import React from 'react'

const Log = ({gameTurn}) => {
  return (
    <ol id="log">
        {gameTurn.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>Player {turn.player} clicked ({turn.square.row} , {turn.square.col})</li>)}
    </ol>
  )
}

export default Log