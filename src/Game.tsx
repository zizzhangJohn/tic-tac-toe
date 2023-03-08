import { useState } from "react";
import Board from "./Board";
import Toggle from "./Components/Toggle";
export default function Game() {
    const [history, setHistory] = useState<Array<string[]>>([Array(9).fill("")]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [statusMsg, setStatusMsg] = useState<string>("Next player: X")
    const [reverseMoves, setReverseMoves] = useState<boolean>(false)

    const moves = history.map((_, move) => {
        let description: string;
        if (move > 0) {
            description = "Go to move #" + move
        } else {
            description = "Go to game start"
        }
        return (
            <li key={move} onClick={() => jumpTo(move)}>
                {description}
            </li>
        )
    });
    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }
    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1);

    }
    return (

        <div className="game">
            <div className="game-bar">
                <div className="status">{statusMsg}</div>
                <Toggle reverseMoves={reverseMoves} setReverseMoves={setReverseMoves} />
            </div>

            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setStatusMsg={setStatusMsg} />
                <div className="game-info">
                    <ul className={`moves ${reverseMoves ? "reverse-moves" : ""}`}>{moves}</ul>
                </div>
            </div>

        </div>
    );
}