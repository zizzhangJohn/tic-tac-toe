import style from "./toggle.module.css"
type props = {
    reverseMoves: boolean
    setReverseMoves: React.Dispatch<React.SetStateAction<boolean>>,

}
export default function Toggle({ reverseMoves, setReverseMoves }: props) {
    return (
        <button onClick={() => setReverseMoves(pre => !pre)} className={style["sort-btn"]}>
            <div className={style["btn-content-container"]}>
                <span className={`${reverseMoves ? style["sort-selected"] : ""}`}>&uarr;</span>
                <span className={!reverseMoves ? style["sort-selected"] : ""}>&darr;</span>
            </div>
        </button>

    )
}