import { useState } from "react";
import { ShoppingCart, Star, X } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

export default function MovieCard({ pelicula }) {
    const { agregarAlCarrito } = useCart();
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    return (
        <div>
            <article
                onClick={() => setMostrarDetalles(true)}
                className="group flex h-full flex-col bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer dark:bg-slate-800 dark:ring-slate-700"
            >

                {/* Póster */}
                <div className="relative">
                    <img
                        src={pelicula.medium_cover_image}
                        alt={`Póster de ${pelicula.title}`}
                        className="w-full h-96 object-cover"
                        loading="lazy"
                    />

                    {/* Puntuación */}
                    <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        {pelicula.rating || "Sin puntuación"}
                    </span>
                </div>

                {/* Información */}
                <div className="flex flex-1 flex-col p-4">

                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-800 text-lg leading-tight dark:text-slate-300">
                            {pelicula.title}
                        </h3>

                        <span className="text-xs text-slate-500 shrink-0 dark:text-slate-400">
                            {pelicula.year}
                        </span>
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">

                        <li>
                            <span className="text-slate-700 dark:text-slate-300">Géneros:</span>{" "}
                            {pelicula.genres?.join(", ") || "No disponibles"}
                        </li>

                        <li>
                            <span className="text-slate-700 dark:text-slate-300">Duración:</span>{" "}
                            {pelicula.runtime
                                ? `${pelicula.runtime} minutos`
                                : "No disponible"}
                        </li>

                        <li>
                            <span className="text-slate-700 dark:text-slate-300">Idioma:</span>{" "}
                            {pelicula.language || "No disponible"}
                        </li>

                    </ul>

                    {/* Precio y carrito */}
                    <div className="mt-auto flex items-center justify-between pt-4">

                        <span className="text-cyan-600 font-bold text-lg">
                            {formatearPrecio(pelicula.precio)}
                        </span>

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                agregarAlCarrito(pelicula);
                                toast.success(`"${pelicula.title}" se agregó al carrito`);
                            }}
                            className="p-2 rounded-full bg-slate-900 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                            title="Agregar al carrito"
                            aria-label={`Agregar ${pelicula.title} al carrito`}
                        >
                            <ShoppingCart size={30} />
                        </button>

                    </div>
                </div>
            </article>

            {
                mostrarDetalles && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
                        onClick={() => setMostrarDetalles(false)}
                    >
                        <div
                            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
                            onClick={(event) => event.stopPropagation()}
                        >
                            {/* Botón cerrar */}
                            <button
                                type="button"
                                onClick={() => setMostrarDetalles(false)}
                                className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/80 p-2 text-white transition hover:bg-slate-900"
                                aria-label="Cerrar detalles"
                            >
                                <X size={22} />
                            </button>

                            <div className="grid md:grid-cols-2">
                                {/* Poster */}
                                <div className="overflow-hidden bg-slate-100 dark:bg-slate-900">
                                    <img
                                        src={pelicula.large_cover_image || pelicula.medium_cover_image}
                                        alt={`Póster de ${pelicula.title}`}
                                        className="h-full max-h-[760px] w-full object-cover"
                                    />
                                </div>

                                {/* Información */}
                                <div className="flex flex-col p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Star
                                            size={20}
                                            fill="currentColor"
                                            className="text-yellow-400"
                                        />

                                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                                            {pelicula.rating || "Sin puntuación"}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {pelicula.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {pelicula.year}
                                    </p>

                                    <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                        <p>
                                            <strong>Géneros:</strong>{" "}
                                            {pelicula.genres?.join(", ") || "No disponibles"}
                                        </p>

                                        <p>
                                            <strong>Duración:</strong>{" "}
                                            {pelicula.runtime
                                                ? `${pelicula.runtime} minutos`
                                                : "No disponible"}
                                        </p>

                                        <p>
                                            <strong>Idioma:</strong>{" "}
                                            {pelicula.language || "No disponible"}
                                        </p>
                                    </div>

                                    {pelicula.description_full && (
                                        <div className="mt-3">
                                            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                                                Sinopsis
                                            </h3>

                                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                {pelicula.description_full}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-700">
                                        <span className="text-xl font-bold text-cyan-600">
                                            {formatearPrecio(pelicula.precio)}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                agregarAlCarrito(pelicula);
                                                toast.success(
                                                    `"${pelicula.title}" se agregó al carrito`
                                                );
                                            }}
                                            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-900"
                                        >
                                            <ShoppingCart size={20} />
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}