// Este componente muestra el panel de un ADMINISTRADOR.
// - Recibe como props el perfil del admin, el total de hoteles y el total de reservas.
// - Incluye un botón clave: "+ Registrar hotel".
// - Sirve para gestionar el sistema ReservEC_HOTEL.
import Link from "next/link"

interface AdminDashboardProps {
  profile: { full_name: string | null; empresa: string | null }
  totalHoteles: number
  totalReservas: number
}

export default function AdminDashboard({
  profile,
  totalHoteles,
  totalReservas,
}: AdminDashboardProps) {
    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hola, {profile.full_name ?? "Administrador"}
                    </h1>
                    <p className="text-slate-400">
                        {profile.empresa ?? "Panel de administrador"}
                    </p>
                </div>
                {/* Botón clave: registrar hotel */}
                <Link
                    href="/dashboard/nuevo-hotel"
                    className="bg-blue-500 hover:bg-blue-600
                        text-white font-semibold
                        px-5 py-3 rounded-lg transition-colors"
                >
                    + Registrar hotel
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-1">Mis hoteles</p>
                    <p className="text-3xl font-bold text-white">{totalHoteles}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-1">Reservas totales</p>
                    <p className="text-3xl font-bold text-white">{totalReservas}</p>
                </div>
            <div className="bg-slate-800 rounded-xl p-6">

                <Link
                    href="/dashboard/mis-hoteles"
                    className="bg-blue-400 hover:bg-blue-300
                        text-white font-semibold
                        px-5 py-3 rounded-lg transition-colors"
                >
                    Ver mis hoteles $rarr
                </Link>
            </div>
        </main>
    )
}
