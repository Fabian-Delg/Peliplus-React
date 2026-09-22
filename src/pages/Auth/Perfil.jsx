import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { UserRound, LogOut } from "lucide-react";

export default function Perfil() {
    const { usuario, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    function confirmarCerrarSesion() {
            return new Promise((resolve) => {
                toast(
                    (t) => (
                        <div className="w-full min-w-0 box-border rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
                            <p className="mb-2 wrap-break-words font-semibold text-slate-800 dark:text-slate-100">
                                ¿Cerrar Sesión?
                            </p>
    
                            <p className="mb-4 wrap-break-words text-sm text-slate-600 dark:text-slate-300">
                                ¿Estás seguro que deseas cerrar sesión?
                            </p>
    
                            <div className="flex flex-wrap justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(false);
                                    }}
                                    className="rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-800 hover:bg-slate-300"
                                >
                                    Cancelar
                                </button>
    
                                <button
                                    type="button"
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(true);
                                    }}
                                    className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    ),
                    {
                        duration: Infinity,
                        position: "top-center",
                        style: {
                            width: "360px",
                            maxWidth: "calc(100vw - 32px)",
                            boxSizing: "border-box",
                            padding: 0,
                            background: "transparent",
                            boxShadow: "none",
                        },
                    }
                );
            });
        }

    async function manejarCerrarSesion() {
        const confirmar = await confirmarCerrarSesion();

        if (!confirmar) return;

        cerrarSesion();

        toast.success("Has cerrado sesión correctamente.");
        navigate("/");
    }

    if (!usuario) {
        return (
            <main className="min-h-screen px-4 py-10 dark:bg-slate-950 dark:text-slate-200">
                <div className="mx-auto max-w-md rounded-xl border p-6 text-center">
                    <p className="mb-4">
                        Debes iniciar sesión para ver tu perfil.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="rounded-lg bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700"
                    >
                        Ir al Login
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 dark:text-slate-200">
            <section className="mx-auto max-w-lg rounded-2xl bg-white border border-slate-200 p-8 shadow-lg dark:bg-slate-800 dark:border-slate-600">
                <div className="mb-6 flex flex-col items-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-400">
                        <UserRound size={42} />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Mi perfil
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="rounded-lg bg-slate-200 p-4 dark:bg-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                            Nombre
                        </p>

                        <p className="font-semibold">
                            {usuario.nombre}
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-200 p-4 dark:bg-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                            Correo electrónico
                        </p>

                        <p className="wrap-break-words font-semibold">
                            {usuario.correo}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={manejarCerrarSesion}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    <LogOut size={20} />
                    Cerrar sesión
                </button>
            </section>
        </main>
    );
}