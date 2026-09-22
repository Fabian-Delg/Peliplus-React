import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import toast from 'react-hot-toast';
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

function ContactoForm() {
    const [enviando, setEnviando] = useState(false);

    const {
        register, control, handleSubmit, reset,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            primerNombre: "", segundoNombre: "",
            primerApellido: "", segundoApellido: "",
            genero: "", pais: "", ciudad: "",
            correo: "", telefono: "", mensaje: "",
            archivo: [],
        },
    });

    const onSubmit = async (data) => {
        setEnviando(true);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo") {
                value.forEach((file) => formData.append("archivo", file));
            } else {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                console.log("Datos del formulario:", data);
                toast.success('¡Formulario enviado exitosamente!')
                reset();
            } else {
                // Formspree responde con { errors: [{ message: "..." }, ...] } si algo falla
                const resultado = await response.json();
                const mensajeError = resultado.errors
                    ? resultado.errors.map((e) => e.message).join(", ")
                    : "Ocurrió un error al enviar el formulario";

                toast.error(mensajeError)
            }
        } catch (error) {
            console.error("Error de red al enviar el formulario:", error);

            toast.error("No se pudo enviar, revisa tu conexión e inténtalo de nuevo")
        } finally {
            setEnviando(false);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <FormInput
                    label="Primer Nombre"
                    placeholder="Ingrese su primer nombre"
                    required
                    error={errors.primerNombre?.message}
                    {...register("primerNombre", { required: "El primer nombre es obligatorio" })}
                />

                <FormInput
                    label="Segundo Nombre"
                    placeholder="Ingrese su segundo nombre"
                    error={errors.segundoNombre?.message}
                    {...register("segundoNombre")}
                />

                <FormInput
                    label="Primer Apellido"
                    placeholder="Ingrese su primer apellido"
                    required
                    error={errors.primerApellido?.message}
                    {...register("primerApellido", { required: "El primer apellido es obligatorio" })}
                />

                <FormInput
                    label="Segundo Apellido"
                    placeholder="Ingrese su segundo apellido"
                    error={errors.segundoApellido?.message}
                    {...register("segundoApellido")}
                />

                <FormSelect
                    label="Género"
                    options={[
                        "Masculino",
                        "Femenino",
                        "Otro"
                    ]}
                    required
                    error={errors.genero?.message}
                    {...register("genero", { required: "El género es obligatorio" })}
                />

                <FormSelect
                    label="País"
                    options={[
                        "Colombia",
                        "Venezuela",
                        "Perú",
                        "Argentina",
                        "Bolivia",
                        "Ecuador",
                        "México"
                    ]}
                    required
                    error={errors.pais?.message}
                    {...register("pais", { required: "El país es obligatorio" })}
                />

                <FormSelect
                    label="Ciudad"
                    options={[
                        "Bogotá",
                        "Caracas",
                        "Lima",
                        "Buenos Aires",
                        "Sucre",
                        "Quito",
                        "Ciudad de México"
                    ]}
                    required
                    error={errors.ciudad?.message}
                    {...register("ciudad", { required: "La ciudad es obligatoria" })}
                />

                <FormInput
                    label="Correo"
                    placeholder="ejemplo@correo.com"
                    type="email"
                    required
                    error={errors.correo?.message}
                    {...register("correo", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo válido"
                        }
                    })}
                />

                <FormInput
                    label="Teléfono"
                    placeholder="300 000 000"
                    type="tel"
                    required
                    error={errors.telefono?.message}
                    {...register("telefono", {
                        required: "El número de teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Ingresa un número de teléfono válido"
                        }
                    })}
                />

                <FormTextArea
                    label="Mensaje"
                    required
                    error={errors.mensaje?.message}
                    {...register("mensaje", { required: "El mensaje es obligatorio" })}
                />

                <Controller
                    name="archivo"
                    control={control}
                    render={({ field }) => (
                        <FormFile
                            label="Adjuntar archivo"
                            name="adjuntarArchivo"
                            accept={{
                                "document/docx": [".docx"],
                                "application/pdf": [".pdf"],
                                "image/png": [".png"],
                                "image/jpeg": [".jpg", ".jpeg"],
                                "video/*": []
                            }}
                            maxSizeMB={2}
                            maxFiles={3}
                            value={field.value}
                            onFilesChange={field.onChange}
                            error={errors.archivo?.message}
                        />
                    )}
                />

                <div>
                    <button type="submit" className="px-6 py-2.5 bg-sky-500 text-white font-medium rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 transition">Enviar</button>
                </div>

            </div>
        </form>
    )
}

export default ContactoForm;