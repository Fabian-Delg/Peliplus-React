import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";

const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(valor);

export default function Carrito() {
    const {
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        subtotal,
        iva,
        totalPagar,
    } = useCart();

    const [enviando, setEnviando] = useState(false);

    function confirmarPedido() {
        return new Promise((resolve) => {
            toast(
                (t) => (
                    <div className="w-full min-w-0 box-border rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
                        <p className="mb-2 wrap-break-words font-semibold text-slate-800 dark:text-slate-100">
                            ¿Confirmar pedido?
                        </p>

                        <p className="mb-4 wrap-break-words text-sm text-slate-600 dark:text-slate-300">
                            ¿Deseas enviar tu pedido por{" "}
                            <strong>{formatoCOP(totalPagar)}</strong>?
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

    async function manejarEnviarPedido() {
        if (carrito.length === 0) {
            toast.error("No puedes enviar un pedido con el carrito vacío.");
            return;
        }

        const confirmar = await confirmarPedido();

        if (!confirmar) return;

        setEnviando(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 700));

            vaciarCarrito();

            toast.success("¡Pedido enviado correctamente! Gracias por tu compra.");
        } catch {
            toast.error("Ocurrió un error al enviar el pedido. Inténtalo nuevamente.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="bg-slate-50 min-h-screen px-4 py-8 dark:bg-slate-950 dark:text-slate-300">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-6 text-3xl font-bold dark:text-slate-200">
                    Mi carrito
                </h1>

                {/* Carrito vacío */}
                {carrito.length === 0 ? (
                    <div className="rounded-lg border border-slate-200 p-8 text-center dark:border-slate-700">
                        <p className="text-lg">
                            Tu carrito está vacío.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Lista de películas */}
                        <div className="space-y-4">
                            {carrito.map((item) => (
                                <article
                                    key={item.id}
                                    className="bg-white flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center dark:bg-slate-800 dark:border-slate-700"
                                >
                                    {/* Portada de la película */}
                                    <img
                                        src={item.imagen}
                                        alt={`Portada de ${item.nombre}`}
                                        className="h-40 w-28 rounded object-cover"
                                    />

                                    <div className="flex-1">
                                        {/* Título */}
                                        <h2 className="text-lg font-semibold">
                                            {item.nombre}
                                        </h2>

                                        {/* Año de estreno */}
                                        <p className="text-sm text-gray-500 dark:text-slate-400">
                                            Año: {item.year || "No disponible"}
                                        </p>

                                        {/* Precio unitario */}
                                        <p>
                                            Precio unitario:{" "}
                                            {formatoCOP(item.precio)}
                                        </p>

                                        {/* Subtotal por película */}
                                        <p>
                                            Subtotal:{" "}
                                            <strong>
                                                {formatoCOP(
                                                    item.precio * item.cantidad
                                                )}
                                            </strong>
                                        </p>

                                        {/* Control de cantidad */}
                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            <span>Cantidad:</span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    disminuirCantidad(item.id)
                                                }
                                                className="rounded border border-slate-300 px-3 py-1 dark:border-slate-700"
                                                aria-label={`Disminuir cantidad de ${item.nombre}`}
                                            >
                                                −
                                            </button>

                                            <span>{item.cantidad}</span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    agregarAlCarrito({
                                                        id: item.id,
                                                        title: item.nombre,
                                                        medium_cover_image: item.imagen,
                                                        year: item.year,
                                                        precio: item.precio,
                                                    })
                                                }
                                                className="rounded border border-slate-300 px-3 py-1 dark:border-slate-700"
                                                aria-label={`Aumentar cantidad de ${item.nombre}`}
                                            >
                                                +
                                            </button>

                                            {/* Eliminar película */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    eliminarDelCarrito(item.id);
                                                    toast.success(`"${item.nombre}" se eliminó del carrito`);
                                                }}
                                                className="ml-auto rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Resumen del pedido */}
                        <section className="bg-white mt-8 rounded-lg border border-slate-300 p-6 dark:bg-slate-800 dark:border-slate-700">
                            <h2 className="mb-4 text-xl font-bold">
                                Resumen del pedido
                            </h2>

                            <div className="space-y-2">
                                <p className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{formatoCOP(subtotal)}</span>
                                </p>

                                <p className="flex justify-between">
                                    <span>IVA (19 %):</span>
                                    <span>{formatoCOP(iva)}</span>
                                </p>

                                <hr />

                                <p className="flex justify-between text-xl font-bold">
                                    <span>Total a pagar:</span>
                                    <span>{formatoCOP(totalPagar)}</span>
                                </p>
                            </div>

                            {/* Enviar pedido */}
                            <button
                                type="button"
                                onClick={manejarEnviarPedido}
                                disabled={enviando || carrito.length === 0}
                                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {enviando
                                    ? "Enviando pedido..."
                                    : "Enviar Pedido"}
                            </button>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}