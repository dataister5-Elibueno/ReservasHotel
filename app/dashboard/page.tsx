import { supabase } from "@/lib/supabaseCliente"

export default async function DashboardPage() {
  // Usuario logueado
  const { data: { user } } = await supabase.auth.getUser()

  // Conteos globales
  const { count: reservasCount } = await supabase
    .from("reservas")
    .select("id, fecha_inicio, fecha_fin, estado, habitacion_id", { count: "exact", head: true })

  const { count: hotelesCount } = await supabase
    .from("hoteles")
    .select("id, nombre, ciudad, descripcion, imagen_url", { count: "exact", head: true })

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
    .select("id, nombre, ciudad, descripcion, imagen_url")

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          <span className="text-yellow-400">Reserv</span>
          <span className="text-blue-500">EC</span>
          <span className="text-red-500">_HOTEL</span>
        </h1>
        {user && <p className="text-slate-400">Bienvenida {user.email}</p>}
      </div>

      {/* Cards globales placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card #1 de conteo de reservas */}
        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-1">Reservas</p>
          <p className="text-3xl font-bold text-yellow-400">0</p>
        </div>
        {/* Card #2 de conteo de hoteles */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Hoteles</p>
          <p className="text-3xl font-bold text-blue-500">0</p>
        </div>
        {/* Card #3 de conteo de usuarios */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-1">Usuarios</p>
          <p className="text-3xl font-bold text-red-500">0</p>
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
      <h2 className="text-xl font-bold text-green-500 mb-4">Hoteles disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hoteles?.map((hotel) => (
          <div key={hotel.id} className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-500 mb-2">{hotel.nombre}</h3>
            <p className="text-slate-400">{hotel.ciudad}</p>
            <p className="text-slate-300 text-green-500">{hotel.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}