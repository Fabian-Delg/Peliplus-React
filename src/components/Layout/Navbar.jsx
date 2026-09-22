import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar(){
    return(
        <nav className='navbar'>
            <Link to={"/escenario"} className='link'>Diviértete</Link>
            <Link to={"/producto"} className='link'>Catálogo</Link>
            <Link to={"/contacto"} className='link'>Contáctame</Link>
        </nav>
    )
}

export default Navbar;