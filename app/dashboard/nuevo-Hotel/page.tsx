import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default function NuevoHotelPage() {
    // Server Action definida DENTRO del componente
    async function crearHotel(formData: FormData) {
        "use server" // convierte esta función en Server Action

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) redirect("/login")

        // Campos del formulario
        const nombre = formData.get("nombre") as string
        const ciudad = formData.get("ciudad") as string
        const descripcion = formData.get("descripcion") as string
        const imagenUrl = formData.get("imagen_url") as string

        // Insertar nuevo hotel en la tabla "hoteles"
        await supabase.from("hoteles").insert({
            nombre,
            ciudad,
            descripcion,
            imagen_url: imagenUrl,
        })

        // Revalidar rutas para refrescar datos
        revalidatePath("/hoteles")
        revalidatePath("/dashboard")
        redirect("/dashboard")
    }

    return (
        <main className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-white mb-8">
                Registrar nuevo hotel
            </h1>
            <form action={crearHotel} className="flex flex-col gap-4">
                <input
                    name="nombre"
                    placeholder="Nombre del hotel"
                    required
                    className="bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700"
                />
                <input
                    name="ciudad"
                    placeholder="Ciudad"
                    required
                    className="bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700"
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    className="bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700"
                    rows={4}
                />
                <input
                    name="imagen_url"
                    placeholder="URL de imagen"
                    className="bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    Registrar hotel
                </button>
            </form>
        </main>
    )
}
