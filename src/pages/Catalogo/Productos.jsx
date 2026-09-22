import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import MovieCard from "../../components/Catalogo/MovieCard";

function Productos() {
    const [pagina, setPagina] = useState(1);
    const [genero, setGenero] = useState("");

    const {
        peliculas,
        cargando,
        error,
        totalPaginas
    } = useMovies(pagina, 12, genero);

    // Volver a la primera página cuando cambie el género
    useEffect(() => {
        setPagina(1);
    }, [genero]);

    function cambiarPagina(evento) {
        setPagina(Number(evento.target.value));
    }

    function paginaAnterior() {
        setPagina((actual) => Math.max(1, actual - 1));
    }

    function paginaSiguiente() {
        setPagina((actual) => Math.min(totalPaginas, actual + 1));
    }

    return (
        <section className="bg-slate-50 min-h-screen px-6 py-10 dark:bg-slate-950">
            <div className="max-w-6xl mx-auto">

                {/* Encabezado */}
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                    Catálogo de películas
                </h2>

                <p className="text-slate-500 mt-2 dark:text-slate-400">
                    Descubre películas y explora tus géneros favoritos.
                </p>

                {/* Filtro por género */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <label
                        htmlFor="filtro-genero"
                        className="font-medium text-slate-700 dark:text-slate-300"
                    >
                        Filtrar por género:
                    </label>

                    <select
                        id="filtro-genero"
                        value={genero}
                        onChange={(evento) => setGenero(evento.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300
                        bg-white text-slate-900
                        dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700
                        focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">Todos los géneros</option>
                        <option value="Action">Acción</option>
                        <option value="Adventure">Aventura</option>
                        <option value="Animation">Animación</option>
                        <option value="Comedy">Comedia</option>
                        <option value="Crime">Crimen</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasía</option>
                        <option value="Horror">Terror</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Ciencia ficción</option>
                        <option value="Thriller">Suspenso</option>
                        <option value="Musical">Musical</option>
                        <option value="Documentary">Documental</option>
                    </select>
                </div>

                {/* Cargando */}
                {cargando && (
                    <p className="mt-10 text-center text-slate-400">
                        Cargando películas...
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p className="mt-10 text-center text-rose-500">
                        {error}
                    </p>
                )}

                {/* Catálogo */}
                {!cargando && !error && (
                    <>
                        {peliculas.length === 0 ? (
                            <p className="mt-10 text-center text-slate-400">
                                No se encontraron películas para este género.
                            </p>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {peliculas.map((pelicula) => (
                                    <MovieCard
                                        key={pelicula.id}
                                        pelicula={pelicula}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Paginador */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

                            <button
                                type="button"
                                onClick={paginaAnterior}
                                disabled={pagina === 1}
                                className="px-5 py-2 rounded-lg bg-slate-900 text-white
                                hover:bg-cyan-600 transition-colors
                                disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>

                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="selector-pagina"
                                    className="text-slate-700 dark:text-slate-300 font-medium"
                                >
                                    Página:
                                </label>

                                <select
                                    id="selector-pagina"
                                    value={pagina}
                                    onChange={cambiarPagina}
                                    disabled={cargando}
                                    className="px-3 py-2 rounded-lg border border-slate-300
                                    bg-white text-slate-900
                                    dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                                >
                                    {Array.from(
                                        { length: totalPaginas },
                                        (_, indice) => indice + 1
                                    ).map((numero) => (
                                        <option key={numero} value={numero}>
                                            {numero}
                                        </option>
                                    ))}
                                </select>

                                <span className="text-slate-500 dark:text-slate-400">
                                    de {totalPaginas}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={paginaSiguiente}
                                disabled={pagina >= totalPaginas || cargando}
                                className="px-5 py-2 rounded-lg bg-slate-900 text-white
                                hover:bg-cyan-600 transition-colors
                                disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>

                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Productos;