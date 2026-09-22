import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function FormFile({ label, name, required = false, error = "", maxSizeMB = 2, maxFiles = 3, accept = { "application/pdf": [".pdf"] }, value = [], onFilesChange = () => { } }) {

    const [archivos, setArchivos] = useState([]);

    // Detectar cuando React Hook Form hace reset()
    useEffect(() => {
        if (value.length === 0 && archivos.length > 0) {
            setArchivos([]);
        }
    }, [value]);

    // Avisamos cada que la lista cambia
    useEffect(() => {
        onFilesChange(archivos.map((a) => a.file));
    }, [archivos]);

    // El id esta hecho con nombre, fecha de modificación y tamaño
    const generarId = (file) =>
        `${file.name}-${file.lastModified}-${file.size}`;

    // Mensaje cuando se elimina el archivo
    const [mensajeEliminado, setMensajeEliminado] = useState("");

    // Estado para guardar el mensaje de error de validación (tipo/tamaño)
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!mensajeEliminado) return;

        const temporizador = setTimeout(() => {
            setMensajeEliminado("");
        }, 3000);

        return () => clearTimeout(temporizador);
    }, [mensajeEliminado]);

    useEffect(() => {
        if (!errorMsg) return;

        const temporizador = setTimeout(() => {
            setErrorMsg("");
        }, 5000);

        return () => clearTimeout(temporizador);
    }, [errorMsg]);

    const espacioDisponible = maxFiles - archivos.length;

    const limiteArchivos = espacioDisponible <= 0;

    const onDrop = (acceptedFiles, rejectedFiles) => {

        if (acceptedFiles.length > 0) {
            const nuevosArchivos = acceptedFiles
                .slice(0, espacioDisponible)
                .map((file) => {
                    let preview = null;

                    if (file.type.startsWith("image/")) {
                        preview = URL.createObjectURL(file);
                    }

                    return {
                        id: generarId(file),
                        file: file,
                        preview: preview
                    };
                });

            setArchivos((anterioresArchivos) => [
                ...anterioresArchivos,
                ...nuevosArchivos
            ]);

            setErrorMsg("");
        }
        console.log(acceptedFiles);

        if (rejectedFiles.length > 0) {
            const primerError = rejectedFiles[0].errors[0];

            if (primerError.code === "file-too-large") {
                setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
            } else if (primerError.code === "file-invalid-type") {
                setErrorMsg("Tipo de archivo no permitido");
            } else if (primerError.code === "too-many-files") {
                setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
            } else {
                setErrorMsg(primerError.message);
            }
        }
        console.log({ acceptedFiles, rejectedFiles });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: maxSizeMB * 1024 * 1024, // dropzone trabaja en bytes
        maxFiles,
        accept,
        disabled: limiteArchivos
    });

    const eliminarArchivo = (id) => {
        setArchivos((anteriores) => {

            const archivoAEliminar = anteriores.find(
                (archivo) => archivo.id === id
            );

            // Si tiene preview, se libera la URL
            if (archivoAEliminar?.preview) {
                URL.revokeObjectURL(archivoAEliminar.preview);
            }

            return anteriores.filter(
                (archivo) => archivo.id !== id
            );
        });

        setMensajeEliminado("Archivo eliminado");
    };

    return (
        <div className="md:col-span-2">
            <label className="mb-2.5 block text-base font-medium text-gray-900 dark:text-slate-200">
                {label} {required && "*"}
            </label>

            {/* Contenedor del Dropzone */}
            <div
                {...getRootProps()}
                className={`rounded-xl border-2 border-dashed p-8 text-center transition bg-gray-50 border-slate-300 dark:bg-slate-700 dark:border-slate-600
                ${limiteArchivos
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:border-sky-400 dark:hover:border-sky-400"
                    }
            `}
            >
                <input
                    {...getInputProps({
                        id: name,
                        name: name,
                        required: required && archivos.length === 0,
                    })}
                />

                <div className="mb-3 text-4xl">
                    📎
                </div>

                <p className="font-medium text-slate-700 dark:text-slate-200">
                    Arrastra tus archivos aquí
                </p>

                <p className="my-2 font-bold text-red-500 dark:text-red-400">
                    Archivos seleccionados: {archivos.length} / {maxFiles}
                </p>

                <p className="font-medium text-slate-700 dark:text-slate-200">
                    O haz click para seleccionarlos
                </p>
            </div>

            {/* Archivos seleccionados */}
            {archivos.map(({ id, file, preview }) => (
                <div
                    key={id}
                    className="mt-3 flex items-center justify-between gap-4 rounded-lg bg-slate-200 p-4 dark:bg-slate-700"
                >
                    <div className="text-left text-slate-700 dark:text-slate-200">
                        <p className="mb-2 font-semibold">
                            Archivo seleccionado
                        </p>

                        <p>
                            <strong>Nombre:</strong> {file.name}
                        </p>

                        <p>
                            <strong>Tipo:</strong> {file.type}
                        </p>

                        <p>
                            <strong>Tamaño:</strong>{" "}
                            {(file.size / 1024).toFixed(2)} KB
                        </p>

                        <p>
                            <strong>Última modificación:</strong>{" "}
                            {file.lastModified}
                        </p>
                    </div>

                    {/* Vista previa de las imágenes */}
                    {preview && (
                        <img
                            src={preview}
                            alt={`Vista previa de ${file.name}`}
                            className="ml-auto h-50 w-50 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-slate-600"
                        />
                    )}

                    <button
                        type="button"
                        className="cursor-pointer rounded-lg p-2 text-2xl transition hover:bg-slate-200 dark:hover:bg-slate-700"
                        onClick={() => eliminarArchivo(id)}
                        aria-label={`Eliminar archivo ${file.name}`}
                    >
                        🗑️
                    </button>
                </div>
            ))}

            {/* Mensaje de archivo eliminado */}
            {mensajeEliminado && (
                <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                    {mensajeEliminado}
                </p>
            )}

            {/* Mensajes de error */}
            {(errorMsg || error) && (
                <span className="text-sm text-red-600 dark:text-red-400">
                    {errorMsg || error}
                </span>
            )}
        </div>
    );
}
export default FormFile;