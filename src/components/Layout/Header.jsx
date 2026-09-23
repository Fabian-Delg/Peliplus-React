import { Link } from "react-router-dom";
import { Sun, Moon, ShoppingCart, UserRound } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";
import logo from "../../assets/logo.png";
import Navbar from "./Navbar";

function Header() {
    const { tema, cambiarTema } = useTheme();
    const { totalItems } = useCart();
    const { autenticado, usuario } = useAuth();

    return (
        <header>
            <div className="header">
                <Link to="/">
                    <img
                        className="logo"
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                <Link to="/">
                    <h1 className="titulo-principal">PeliPlus</h1>
                </Link>

                {/* Carrito */}
                <Link
                    to="/carrito"
                    className="ml-auto mx-2 relative p-2 bg-slate-100 rounded-full hover:bg-slate-400 transition-colors"
                    title="Ver carrito"
                    aria-label={`Ver carrito, ${totalItems} productos`}
                >
                    <ShoppingCart size={20} />

                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-400 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>

                {/* Cambiar tema */}
                <button
                    type="button"
                    onClick={cambiarTema}
                    title={
                        tema === "claro"
                            ? "Cambiar a modo oscuro"
                            : "Cambiar a modo claro"
                    }
                    className="bg-slate-100 p-2 mx-2 rounded-full hover:bg-slate-400 transition-colors"
                >
                    {tema === "claro" ? (
                        <Moon size={20} />
                    ) : (
                        <Sun size={20} />
                    )}
                </button>

                {/* Login o perfil */}
                {autenticado ? (
                    <Link
                        to="/perfil"
                        title={`Perfil de ${usuario.nombre}`}
                        aria-label="Ver perfil"
                        className="mx-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-500 text-white transition hover:bg-cyan-700"
                    >
                        {usuario.foto ? (
                            <img
                                src={usuario.foto}
                                alt={`Foto de ${usuario.nombre}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserRound size={20} />
                        )}
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="login"
                    >
                        Login
                    </Link>
                )}
            </div>

            <div>
                <Navbar />
            </div>
        </header>
    );
}

export default Header;