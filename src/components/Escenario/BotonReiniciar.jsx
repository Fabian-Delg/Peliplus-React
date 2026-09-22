import reiniciar from "../../assets/reiniciar.png"

function BotonReiniciar({inicial}){
    return(
        <button onClick={inicial} className="boton">
            <img src={reiniciar} alt="reiniciar" />
        </button>
    )
}

export default BotonReiniciar;