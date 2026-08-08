"use client"
import { supabase } from "@/lib/supabase"

export default async function DashboardPage() {
  // Usuario logueado
  const { data: { user } } = await supabase.auth.getUser()

  // Conteos globales
  const { count: reservasCount } = await supabase
    .from("reservas")
    .select("*", { count: "exact", head: true })

  const { count: hotelesCount } = await supabase
    .from("hoteles")
    .select("*", { count: "exact", head: true })

  const { count: usuariosCount } = await supabase
    .from("usuarios")
    .select("*", { count: "exact", head: true })

  // Reservas del usuario
  const { data: reservas } = await supabase
    .from("reservas")
    .select("id, fecha_inicio, fecha_fin, estado, habitacion_id")
    .eq("usuario_id", user?.id)

  // Hoteles disponibles
  const { data: hoteles } = await supabase
    .from("hoteles")
    .select("id, nombre, ciudad, descripcion")

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          RESERVAS HOTEL EC
        </h1>
        {user && <p className="text-slate-400">Bienvenida {user.email}</p>}
      </div>

      {/* Cards globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Reservas</p>
          <p className="text-3xl font-bold text-white">{reservasCount}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Hoteles</p>
          <p className="text-3xl font-bold text-white">{hotelesCount}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Usuarios</p>
          <p className="text-3xl font-bold text-white">{usuariosCount}</p>
        </div>
      </div>

      {/* Reservas del usuario */}
      <h2 className="text-xl font-bold text-white mb-4">Tus reservas</h2>
      {reservas?.length ? (
        <ul className="space-y-4 mb-12">
          {reservas.map((r) => (
            <li key={r.id} className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-200">Habitación: {r.habitacion_id}</p>
              <p className="text-slate-200">Estado: {r.estado}</p>
              <p className="text-slate-400 text-sm">
                {r.fecha_inicio} → {r.fecha_fin}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400 mb-12">No tienes reservas registradas.</p>
      )}

      {/* Hoteles disponibles */}
      <h2 className="text-xl font-bold text-white mb-4">Hoteles disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hoteles?.map((hotel) => (
          <div key={hotel.id} className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">{hotel.nombre}</h3>
            <p className="text-slate-400">{hotel.ciudad}</p>
            <p className="text-slate-300 text-sm">{hotel.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
