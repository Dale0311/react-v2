import { useState } from 'react';

function Square({value, combination, index, onClickHandle}) {
  let style;

  combination && combination.includes(index)? style = "text-green-500" : "";
  return (
    <button className={`h-16 w-16 text-lg font-extrabold border border-black flex items-center justify-center ${style?? ""}`} onClick={onClickHandle}>
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
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      // returns an object
      return {winner: squares[a], winningCombination: [a,b,c]}
    }
  }

  return null;
}

function noPossibleMoves(history, squares){
  return history.length === 10 && ! calculateWinner(squares);
}

function Board({xTurn, resetOrPlayAgain, squares, handlePlay, history}){

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
  
  let statusBar;
  let winOrDraw;
  if(calculateWinner(squares) || history.length === 10){
    winOrDraw = noPossibleMoves(history, squares)? "Tie: No possible move" : calculateWinner(squares);
    if(winOrDraw.length > 1 ){
      statusBar = winOrDraw;
    }
    else{
      statusBar = "Winner: " + winOrDraw.winner;
    } 
  }
  else{
      statusBar = "Next player: " + (xTurn ? "X" : "O");
  }  
  const squaress = Array(9).fill(Array(9));
  console.log(squaress)
  return (
    <div>
      <p className='text-center'>{statusBar}</p>
      <div className='grid grid-cols-3'>
        <Square value={squares[0]} index={0} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(0)}} />
        <Square value={squares[1]} index={1} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(1)}} />
        <Square value={squares[2]} index={2} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(2)}} />
        <Square value={squares[3]} index={3} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(3)}} />
        <Square value={squares[4]} index={4} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(4)}} />
        <Square value={squares[5]} index={5} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(5)}} />
        <Square value={squares[6]} index={6} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(6)}} />
        <Square value={squares[7]} index={7} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(7)}} />
        <Square value={squares[8]} index={8} combination={winOrDraw?.winningCombination?? ""} xTurn={xTurn} onClickHandle={()=>{clickHandle(8)}} />
      </div>
      <div className='my-2 text-end'>
        <button className='py-2 px-4 bg-green-500 text-white rounded' onClick={resetOrPlayAgain}>{winOrDraw? "Play again" : "Reset"}</button>
      </div>
    </div>
  )
}

export default function Game() {

  // array of moves that is rendered in ui
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  
  // bool
  const xTurn = (history.length - 1) % 2 == 0

  function handlePlay(newSquares){
    setHistory(oldVal => [...oldVal, newSquares]);
  }

  function resetOrPlayAgain(){
    setHistory(oldVal => [oldVal[0]]);
    // or
    // setHistory(oldVal => oldVal.slice(0, 1));
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
        <Board squares={currentSquares} history={history} resetOrPlayAgain={resetOrPlayAgain} handlePlay={handlePlay} xTurn={xTurn} />
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
