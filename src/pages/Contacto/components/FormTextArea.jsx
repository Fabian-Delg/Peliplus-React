import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea({ label, name, required = false, error = "", ...rest }, ref) {
    return (
        <div className="md:col-span-2">
            <label className="block mb-2.5 text-base font-medium dark:text-slate-200">{label} {required && "*"}</label>
            <textarea
                rows="4"
                name={name}
                required={required}
                ref={ref}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-sky-500 block w-full px-3 py-2.5 shadow-xs dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:placeholder:text-slate-400 dark:focus:border-sky-400 dark:focus:ring-sky-400 dark:outline-none"
                {...rest}
            >
            </textarea>

            {error && (
                <span className="text-sm text-red-600 dark:text-red-400">
                    {error}
                </span>
            )}

        </div>
    );
});

export default FormTextArea;