import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface HotelDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
    const { id } = await params
    const supabase = await createClient()

    // Buscar hotel
    const { data: hotel } = await supabase
        .from("hoteles")
        .select("*")
        .eq("id", id)
        .single()

    if (!hotel) notFound()

    // Usuario autenticado
    const { data: { user } } = await supabase.auth.getUser()

    let esCliente = false
    let yaReservado = false

    if (user) {
        const { data: profile } = await supabase
            .from("usuarios")
            .select("rol")
            .eq("id", user.id)
            .single()

        esCliente = profile?.rol === "cliente"

        if (esCliente) {
            const { data: reserva } = await supabase
                .from("reservas")
                .select("id")
                .eq("hotel_id", id)
                .eq("usuario_id", user.id)
                .maybeSingle()

            yaReservado = !!reserva
        }
    }

    // Server Action: reservar hotel definida DENTRO del componente
    async function reservarHotel() {
        "use server"

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) redirect("/login")

        await supabase.from("reservas").insert({
            hotel_id: id,
            usuario_id: user.id,
            estado: "pendiente",
        })

        revalidatePath(`/hoteles/${id}`)
        revalidatePath("/dashboard")
        redirect(`/hoteles/${id}`)
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
                &larr; Volver al dashboard
            </Link>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <h1 className="text-3xl font-bold text-green-500 mt-4 mb-1">{hotel.nombre}</h1>
                <p className="text-slate-400 mb-6">{hotel.ciudad}</p>

                {hotel.descripcion && (
                    <p className="text-slate-300 mb-6 leading-relaxed">{hotel.descripcion}</p>
                )}

                {hotel.imagen_url && (
                    <img
                        src={hotel.imagen_url}
                        alt={hotel.nombre}
                        className="rounded-lg shadow-lg w-full max-h-96 object-cover mb-6"
                    />
                )}

                {esCliente && (
                    yaReservado ? (
                        <p className="mt-6 bg-teal-500/10 border border-teal-500/50 text-teal-400 text-sm rounded-lg px-4 py-3">
                            Ya reservaste este hotel
                        </p>
                    ) : (
                        <form action={reservarHotel} className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Reservar hotel
                            </button>
                        </form>
                    )
                )}
            </div>
        </main>
    )
}
