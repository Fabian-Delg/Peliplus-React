import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

const AuthContext = createContext(null);

const CLAVE_USUARIO = "usuario";

function leerUsuarioDesdeStorage() {
    try {
        const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerUsuarioDesdeStorage);

    // Persistir únicamente los datos públicos del usuario
    useEffect(() => {
        if (usuario) {
            localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
        } else {
            localStorage.removeItem(CLAVE_USUARIO);
        }
    }, [usuario]);

    // Inicio de sesión demostrativo
    const iniciarSesion = useCallback((datosUsuario) => {
        const nuevoUsuario = {
            nombre: datosUsuario.nombre,
            correo: datosUsuario.correo,
        };

        setUsuario(nuevoUsuario);

        return {
            exito: true,
            usuario: nuevoUsuario,
        };
    }, []);

    // Cerrar sesión
    const cerrarSesion = useCallback(() => {
        localStorage.removeItem("usuario")
        setUsuario(null);
    }, []);

    const autenticado = Boolean(usuario);

    const actualizarFotoPerfil = (foto) => {
        setUsuario((usuarioActual) => {
            if (!usuarioActual) return null;

            const usuarioActualizado = {
                ...usuarioActual,
                foto,
            };

            localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

            return usuarioActualizado;
        });
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                autenticado,
                iniciarSesion,
                cerrarSesion,
                actualizarFotoPerfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
    }

    return contexto;
}