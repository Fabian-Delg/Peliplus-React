import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
    const { iniciarSesion, autenticado } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    function manejarIngreso(event) {
        event.preventDefault();

        if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
            toast.error("Completa todos los campos.");
            return;
        }

        // Inicio de sesión demostrativo, aún no conectado al backend
        iniciarSesion({
            nombre: nombre.trim(),
            correo: correo.trim(),
        });

        toast.success(`¡Bienvenido, ${nombre.trim()}!`);
        navigate("/");
    }

    if (autenticado) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 dark:text-slate-200">
                <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-slate-800">
                    <h1 className="mb-3 text-2xl font-bold">
                        Ya has iniciado sesión
                    </h1>

                    <Link
                        to="/perfil"
                        className="inline-block rounded-lg bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700"
                    >
                        Ver perfil
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 dark:text-slate-200">
            <form
                onSubmit={manejarIngreso}
                className="mx-auto max-w-md space-y-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-lg dark:bg-slate-800 dark:border-slate-700"
            >
                <h1 className="text-center text-3xl font-bold">
                    Iniciar sesión
                </h1>

                <div>
                    <label
                        htmlFor="nombre"
                        className="mb-1 block font-medium"
                    >
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2 outline-none focus:border-cyan-500"
                        placeholder="Tu nombre"
                        autoComplete="name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="correo"
                        className="mb-1 block font-medium"
                    >
                        Correo electrónico
                    </label>

                    <input
                        id="correo"
                        type="email"
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2 outline-none focus:border-cyan-500"
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label
                        htmlFor="contrasena"
                        className="mb-1 block font-medium"
                    >
                        Contraseña
                    </label>

                    <input
                        id="contrasena"
                        type="password"
                        value={contrasena}
                        onChange={(event) => setContrasena(event.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2 outline-none focus:border-cyan-500"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >
                    Ingresar
                </button>
            </form>
        </main>
    );
}