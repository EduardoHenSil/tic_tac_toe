import { useState } from "react";


function Square({value, onSquareClick}){
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function checkForWinner(game){
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] 
    ];

    for (let i = 0; i < wins.length; i++){
        const [f, s, t] = wins[i];
        if (game[f] && game[f] == game[s] && game[s] == game[t]){
            return game[f];
        }
    }
    return null;

}

function checkDraw(game){

    for (let i = 0; i < game.length; i++){
        if (!game[i]){
            return false;
        }
    }
    return true;
}

export default function Board(){
    const [xIsNext, setXIsNext] = useState(true);
    const [state, setState] = useState(Array(9).fill(null));

    function handleClick(i){
        if (checkForWinner(state) || state[i]){
            return;
        }

        const nextSquares = state.slice();
        if (xIsNext){
            nextSquares[i] = "X";
        }else {
            nextSquares[i] = "O";
        }
        setState(nextSquares);
        setXIsNext(!xIsNext);
    }

    let winner = checkForWinner(state);
    let status;    
    if (winner){
        status = "WINNER IS " + winner;
    }else{
        status = "Next to play: " + (xIsNext ? "X" : "O");
    }
    if (!winner && checkDraw(state)){
        status = "deu empate";
    }


    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={state[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={state[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={state[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={state[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={state[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={state[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={state[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={state[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={state[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}
