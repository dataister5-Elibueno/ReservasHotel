//"use client"; // Esto indica que este componente se renderiza en el cliente

//import { useState } from "react"; // Hook de React para manejar el estado del componente



import { supabase } from "@/lib/supabaseCliente";
import ReservaCard from "@/components/ReservaCard";


export default async function PostsPage() {

    //await bloquea hasta que supabase responda

    const { data: reservas, error } = await supabase.from("reservas")
    .select("id, fecha_inicio, fecha_fin, estado, usuario_id, habitacion_id")

    if (error) {
        console.error("Error al cargar reserva:", error)
    }
    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-white mb-8">
                Reservas
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservas?.map((reserva) => (
                    
                    <ReservaCard key={reserva.id} {...reserva} />
                ))}
            </div>

            {reservas?.length === 0 && (
                <p className="text-slate-400 text-center py-12">
                    No hay reservas disponibles.
                </p>
            )}
        </main>
    );
}


