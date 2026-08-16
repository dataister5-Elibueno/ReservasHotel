// ==============================
// Este componente muestra el panel de un CLIENTE.
// - Recibe como props el perfil del cliente, el total de reservas,
//   la lista de reservas y la lista de hoteles disponibles.
// - NO consulta la base de datos directamente, solo muestra lo que recibe.
// ==============================
interface ClienteDashboardProps {
    profile: { full_name: string | null };
    totalReservas: number;
}

export default function ClienteDashboard({
    profile,
    totalReservas,
}: ClienteDashboardProps) {
    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-white mb-2">
                Hola, {profile.full_name}
            </h1>
            <p className="text-slate-400 mb-8">
                Este es tu panel como cliente
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-1">Mis reservas</p>
                    <p className="text-3xl font-bold text-white">{totalReservas}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-1">Hoteles vistos</p>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
            </div>
        </main>
    )
}

