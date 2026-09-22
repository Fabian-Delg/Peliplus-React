import leopardo from "../../assets/leopardo.png"

function Leopardo({posicion}){
    return(
        <img src={leopardo} alt="Leopardo"
            style={{
                width: "90px",
                position: "relative",
                left: `${305 + posicion}px`,
                marginTop: "140px",
                transition: "left 0.2s"
            }}
        />
    )
}

export default Leopardo;