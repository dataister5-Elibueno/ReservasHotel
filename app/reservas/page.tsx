"use client"  // Esto indica que este componente se renderiza en el cliente
import { useEffect, useState } from "react"; // Importa hooks de React para manejar estado y efectos secundarios
import { supabase } from "@/lib/supabaseCliente";           
import ReservaCard from "@/components/ReservaCard"; // Importa el componente ReservaCard para mostrar cada reserva

export default function ReservasPage() {

    const [reservas, setReservas] = useState([]); // Estado local para almacenar las reservas
    const [error, setError] = useState(null); // Estado local para manejar errores

    useEffect(() => {
        const fetchReservas = async () => {
            const {data,error} = await supabase
                .from("reservas")
                .select("id, fecha_inicio, fecha_fin, estado, usuario_id, habitacion_id");  
  
         if (error) {
        console.error("Error al cargar reserva:", error)
        setError(error)
         }else {
            setReservas(data || []); // Actualiza el estado con las reservas obtenidas
         }

        }
        fetchReservas(); // Llama a la función para obtener las reservas al montar el componente
    }, []) // El efecto se ejecuta solo una vez al montar el componente
if (error) {    
            return <p className="text-red-400">Error al cargar reservas</p>
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


