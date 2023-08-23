import { useState } from 'react';

function Square({value, onClickHandle, xTurn}) {
  
  return (
    <button className={`h-16 w-16 text-lg font-extrabold border border-black flex items-center justify-center`} onClick={onClickHandle}>
      {value}
    </button>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      // returns an object
      return squares[a];
    }
  }

  return null;
}

function noPossibleMoves(history, squares){
  return history.length === 10 && calculateWinner(squares) === null;
}

function Board({xTurn, squares, handlePlay, showHistory, history}){

  function clickHandle(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }

    const newSquares = [...squares];
    if(xTurn){
      newSquares[i] = "X";}
    else{
      newSquares[i] = "O";}
    
    // pass the new square to the handlePlay
    handlePlay(newSquares);
  }
  const winOrDraw = noPossibleMoves(history, squares)? "Tie: No possible move" : calculateWinner(squares)
  let statusBar;
  if (winOrDraw) {
    if(winOrDraw.length > 1 ){
      statusBar = winOrDraw;
    }
    else{
      statusBar = "Winner: " + winOrDraw;
    }
  } else {
    statusBar = "Next player: " + (xTurn ? "X" : "O");
  }

  return (
    <div>
      <p className='text-center'>{statusBar}</p>
      <div className='grid grid-cols-3'>
        <Square value={squares[0]} xTurn={xTurn} onClickHandle={()=>{clickHandle(0)}} />
        <Square value={squares[1]} xTurn={xTurn} onClickHandle={()=>{clickHandle(1)}} />
        <Square value={squares[2]} xTurn={xTurn} onClickHandle={()=>{clickHandle(2)}} />
        <Square value={squares[3]} xTurn={xTurn} onClickHandle={()=>{clickHandle(3)}} />
        <Square value={squares[4]} xTurn={xTurn} onClickHandle={()=>{clickHandle(4)}} />
        <Square value={squares[5]} xTurn={xTurn} onClickHandle={()=>{clickHandle(5)}} />
        <Square value={squares[6]} xTurn={xTurn} onClickHandle={()=>{clickHandle(6)}} />
        <Square value={squares[7]} xTurn={xTurn} onClickHandle={()=>{clickHandle(7)}} />
        <Square value={squares[8]} xTurn={xTurn} onClickHandle={()=>{clickHandle(8)}} />
      </div>
      <div className='my-2 text-end'>
        <button className='py-2 px-4 bg-green-500 text-white rounded' onClick={showHistory}>Reset</button>
      </div>
    </div>
  )
}

export default function Game() {
  // array of moves that is rendered in ui
  // [[null, null, null, x, o]]
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  
  // bool
  const xTurn = (history.length - 1) % 2 == 0


  function handlePlay(newSquares){
    setHistory(oldVal => [...oldVal, newSquares]);
  }

  // create a way to jump to the state of the squares to a specific index
  function jumpTo(index){
    setHistory(oldVal => oldVal.slice(0, index + 1));
  }

  // renders the ui of the history
  const moves = history.map((value, index) => {
    const description = !index? "" : "go to move #" + index;
    return (
        <li key={index}>
          {description && <button className='py-1 px-3 bg-green-500 hover:bg-green-600 text-white text-sm rounded' onClick={()=>jumpTo(index)}>{description}</button>}
        </li>
    )
  })

  return(
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex space-x-2'>
        <Board squares={currentSquares} history={history} handlePlay={handlePlay} xTurn={xTurn} />
        {/* history of the moves */}
        <div>
          <p>Moves: </p>
          <ol className='mt-2 space-y-2'>
            {moves}
          </ol>
        </div>
      </div>
    </div>
  )
}

// TODO : i need a way to highligth the winning combination if there's a winner