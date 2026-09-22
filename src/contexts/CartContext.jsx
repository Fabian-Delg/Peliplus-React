import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";

const IVA_PORCENTAJE = 0.19;

// Leer carrito guardado
function leerCarritoDesdeStorage() {
    try {
        const data = localStorage.getItem(CLAVE_CARRITO);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

    // Guardar los cambios del carrito en LocalStorage
    useEffect(() => {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }, [carrito]);

    // Agregar producto o aumentar su cantidad
    const agregarAlCarrito = useCallback((pelicula) => {
        setCarrito((prev) => {
            const yaExiste = prev.find((item) => item.id === pelicula.id);

            if (yaExiste) {
                return prev.map((item) =>
                    item.id === pelicula.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: pelicula.id,
                    nombre: pelicula.title || "Sin título",
                    imagen: pelicula.medium_cover_image || "",
                    year: pelicula.year || null,
                    precio: Number(pelicula.precio) || 0,
                    cantidad: 1,
                },
            ];
        });
    }, []);

    // Disminuir cantidad de un producto
    const disminuirCantidad = useCallback((id) => {
        setCarrito((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }, []);

    // Eliminar un producto del carrito
    const eliminarDelCarrito = useCallback((id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    }, []);

    // Vaciar carrito
    const vaciarCarrito = useCallback(() => {
        setCarrito([]);
        localStorage.removeItem(CLAVE_CARRITO);
    }, []);

    // Cálculos
    const totalItems = carrito.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    const subtotal = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    const iva = subtotal * IVA_PORCENTAJE;
    const totalPagar = subtotal + iva;

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                disminuirCantidad,
                eliminarDelCarrito,
                vaciarCarrito,
                totalItems,
                subtotal,
                iva,
                totalPagar,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}