"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseCliente"
import HotelCard from "@/components/HotelCard"
import ReservaCard from "@/components/ReservaCard"

export default function Home() {
  // 🔹 Estados locales para hoteles y reservas
  const [hoteles, setHoteles] = useState([])
  const [reservas, setReservas] = useState([])

  // 🔹 Cargar datos desde Supabase al montar la página
  useEffect(() => {
    const fetchData = async () => {
      // Hoteles
      const { data: hotelesData, error: hotelesError } = await supabase
        .from("hoteles")
        .select("id, nombre, ciudad, descripcion, imagen_url")

      if (hotelesError) console.error("Error al obtener hoteles:", hotelesError.message)
      else setHoteles(hotelesData || [])

      // Reservas
      const { data: reservasData, error: reservasError } = await supabase
        .from("reservas")
        .select("id, usuario_id, habitacion_id, fecha_inicio, fecha_fin, estado")

      if (reservasError) console.error("Error al obtener reservas:", reservasError.message)
      else setReservas(reservasData || [])
    }

    fetchData()
  }, [])

  // 🔹 Render principal
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-start py-10 px-6">
      {/* Encabezado */}
      <h1 className="text-5xl font-bold text-white mb-2">
        Bienvenido a <span className="text-blue-400">ReservEC_HOTEL</span>
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl text-center mb-10">
        Portal de reservas para hoteles asociados en ReservEC_HOTEL.
        Disponibilidad de reservas en línea para turistas nacionales e internacionales.
      </p>

      {/* Sección de Hoteles */}
      <section className="w-full max-w-6xl mb-12">
        <h2 className="text-3xl font-semibold text-green-400 mb-6">Hoteles disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoteles.length > 0 ? (
            hoteles.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                nombre={hotel.nombre}
                ciudad={hotel.ciudad}
                descripcion={hotel.descripcion}
                imagen_url={hotel.imagen_url}
              />
            ))
          ) : (
            <p className="text-slate-400">No hay hoteles registrados.</p>
          )}
        </div>
      </section>

      {/* Sección de Reservas */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Reservas registradas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <ReservaCard
                key={reserva.id}
                id={reserva.id}
                usuario_id={reserva.usuario_id}
                habitacion_id={reserva.habitacion_id}
                fecha_inicio={reserva.fecha_inicio}
                fecha_fin={reserva.fecha_fin}
                estado={reserva.estado}
              />
            ))
          ) : (
            <p className="text-slate-400">No hay reservas registradas.</p>
          )}
        </div>
      </section>
    </main>
  )
}
