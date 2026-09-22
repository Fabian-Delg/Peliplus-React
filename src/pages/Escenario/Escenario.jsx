import Leopardo from "../../components/Escenario/Leopardo";
import Posicion from "../../components/Escenario/Posicion";
import BotonIzquierdo from "../../components/Escenario/BotonIzquierdo";
import BotonReiniciar from "../../components/Escenario/BotonReiniciar";
import BotonDerecho from "../../components/Escenario/BotonDerecho";
import "./Escenario.css";
import { useState } from "react";

function Escenario(){
    const [posicion, setPosicion] = useState(0);

    function moverIzquierda(){
        if (posicion>-300){
            setPosicion(posicion-10);
        }
    }

    function moverDerecha(){
        if (posicion<300){
            setPosicion(posicion+10);
        }
    }

    function reiniciar(){
        setPosicion(0);
    }

    return(
        <div className="escenario">
            <h2 className="titulo-juego">Carrera del Leopardo</h2>
            <Leopardo posicion={posicion}/>
            <Posicion posicionActual={posicion}/>
            <BotonIzquierdo mover={moverIzquierda}/>
            <BotonReiniciar inicial={reiniciar}/>
            <BotonDerecho mover={moverDerecha}/>
        </div>
    )
}

export default Escenario;