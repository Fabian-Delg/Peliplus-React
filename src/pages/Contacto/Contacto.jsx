import ContactoForm from './ContactoForm'

function Contacto() {
    return (
        <div className=" p-10 bg-slate-100 dark:bg-slate-950">
            <div className="p-6 shadow-lg rounded-2xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 dark:text-slate-200">Contáctame</h2>
                <ContactoForm />
            </div>
        </div>
    )
}

export default Contacto;