
type props = {
    value: string,
    highLight: boolean,
    onSquareClick: () => void
}
export default function Square({ value, onSquareClick, highLight }: props) {
    return <button className={`square ${highLight ? "highLight" : ""}`} onClick={onSquareClick}>{value}</button>;
}