import { useEffect } from "react";
import Square from "./Square";

type props = {
    xIsNext: boolean,
    squares: string[],
    onPlay: (nextSquares: string[]) => void,
    setStatusMsg: (statusMsg: string) => void,
}
export default function Board({ xIsNext, squares, onPlay, setStatusMsg }: props) {
    const drawMessage = "This is a draw !!!"
    const gameStatus = calculateGameStatus(squares, drawMessage);
    let statusMsg:string;
    let winLine: number[] | null = null
    if (gameStatus === drawMessage) {
        statusMsg = drawMessage;
    } else if (Array.isArray(gameStatus)) {
        const winnerName = xIsNext ? "O" : "X"
        statusMsg = "Winner: " + winnerName;
        winLine = gameStatus
    } else {
        statusMsg = "Next player: " + (xIsNext ? "X" : "O");
        winLine = null
    }
    useEffect(() => {
      setStatusMsg(statusMsg)
    }, [squares])
    
    function handleClick(i: number) {
        if (squares[i] !== "" || calculateGameStatus(squares, drawMessage)) return
        const mark = xIsNext ? "X" : "O"
        const updateSquare = squares.slice();
        updateSquare[i] = mark
        onPlay(updateSquare);
    }
    /*
    calculateGameStatus has 3 return types
    drawMessage: when the game result is a draw
    lines[i]: when the lines[i] is array of wining index
    null: when there's no winner
     */
    function calculateGameStatus(squares: string[], drawMessage: string) {
        const emptySlotsCount = squares.filter(s => s === "").length;

        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }
        if (emptySlotsCount === 0) {
            return drawMessage
        }
        return null;
    }
    function getBoardSlots(row: number, col: number, squares: string[], winLine: number[] | null) {
        let board: React.ReactElement[] = [];
        for (let i = 0; i < row; i++) {
            let cols: React.ReactElement[] = [];
            for (let j = 0; j < col; j++) {
                const index = i !== 0 ? (i * 3) + j : j
                cols.push(<Square key={index} highLight={winLine !== null && winLine.includes(index)} value={squares[index]} onSquareClick={() => handleClick(index)} />)
            }
            board.push(<div key={i} className="board-row">{cols}</div>)
        }
        return board
    }
    return (
        <>
            {getBoardSlots(3, 3, squares, winLine)}
        </>
    );
}

