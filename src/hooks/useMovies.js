import { useState, useEffect } from "react";

const RANGO_PRECIO = {
    min: 15000,
    max: 80000,
};

function precioAleatorio() {
    return Math.floor(
        Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1) +
        RANGO_PRECIO.min,
    );
}

export function useMovies(page = 1, limit = 12, genero = "") {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        let activo = true;

        async function cargarPeliculas() {
            try {
                setCargando(true);
                setError(null);

                const parametros = new URLSearchParams({
                    sort_by: "download_count",
                    order_by: "desc",
                    limit: String(limit),
                    page: String(page),
                });

                if (genero) {
                    parametros.set("genre", genero);
                }

                const url = `https://movies-api.accel.li/api/v2/list_movies.json?${parametros.toString()}`;

                const respuesta = await fetch(url);

                // Primero comprobamos el tipo de contenido
                const contentType = respuesta.headers.get("content-type") || "";

                if (!respuesta.ok) {
                    throw new Error(
                        `Error HTTP ${respuesta.status}: ${respuesta.statusText}`,
                    );
                }

                if (!contentType.includes("application/json")) {
                    const texto = await respuesta.text();

                    console.error("La API devolvió algo que no es JSON:", texto);

                    throw new Error(
                        "La API devolvió HTML en lugar de JSON. Comprueba la URL de la API.",
                    );
                }

                const datos = await respuesta.json();

                if (datos.status !== "ok") {
                    throw new Error("La API no pudo devolver las películas");
                }

                const lista = datos.data?.movies || [];
                const cantidadPeliculas = datos.data?.movie_count || 0;

                const listaConPrecios = lista.map((pelicula) => ({
                    ...pelicula,
                    precio: precioAleatorio(),
                }));

                const paginas = Math.min(
                    100,
                    Math.max(1, Math.ceil(cantidadPeliculas / limit)),
                );

                if (activo) {
                    setPeliculas(listaConPrecios);
                    setTotalPaginas(paginas);
                }
            } catch (err) {
                if (activo) {
                    console.error("Error cargando películas:", err);
                    setError(err.message);
                    setPeliculas([]);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarPeliculas();

        return () => {
            activo = false;
        };
    }, [page, limit, genero]);

    return {
        peliculas,
        cargando,
        error,
        totalPaginas,
    };
}
