import derecha from "../../assets/derecha.png"

function BotonDerecho({mover}){
    return(
        <button onClick={mover} className="boton">
            <img className="derecha" src={derecha} alt="Derecha" />
        </button>
    )
}

export default BotonDerecho;