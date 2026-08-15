"use client"

import { supabase } from "@/lib/supabaseCliente"

export default async function HotelesPage() {
  const { data: hoteles, error } = await supabase
    .from("hoteles")
    .select("id, nombre, ciudad, descripcion, imagen_url")

  if (error) {
    console.error("Error al cargar hoteles:", error)
    return <p className="text-red-400">Error al cargar hoteles</p>
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Hoteles disponibles</h1>

      {hoteles?.length === 0 && (
        <p className="text-slate-400 text-center py-12">
          No hay hoteles registrados.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hoteles?.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700"
          >
            {hotel.imagen_url && (
              <img
                src={hotel.imagen_url}
                alt={hotel.nombre}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-white mb-2">{hotel.nombre}</h2>
            <p className="text-slate-400 mb-1">{hotel.ciudad}</p>
            <p className="text-slate-300 text-sm">{hotel.descripcion}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
