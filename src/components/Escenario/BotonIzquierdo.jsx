import izquierda from "../../assets/izquierda.png"

function BotonIzquierdo({mover}){
    return(
        <button onClick={mover} className="boton">
            <img src={izquierda} alt="Izquierda" />
        </button>
    )
}

export default BotonIzquierdo;