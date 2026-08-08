interface ReservaCardProps {
  id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  usuario_id: string;
  habitacion_id: number;
}

// Componente que recibe las props tipadas
export default function ReservaCard({
  id,
  fecha_inicio,
  fecha_fin,
  estado,
  usuario_id,
  habitacion_id,
}: ReservaCardProps) {
  return (
    <article className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:bg-slate-700 transition-colors border border-slate-700">
      {/* Encabezado con estado */}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            estado === "pendiente"
              ? "bg-yellow-500/20 text-yellow-400"
              : estado === "confirmada"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {estado}
        </span>
        <span className="text-xs text-slate-500">ID: {id}</span>
      </div>

      {/* Fechas de la reserva */}
      <h2 className="text-xl font-bold text-white mb-1">
        Habitación #{habitacion_id}
      </h2>
      <p className="text-slate-400 text-sm mb-4">Usuario: {usuario_id}</p>

      <div className="flex flex-col gap-1 mb-5 text-slate-300 text-sm">
        <p>Inicio: {fecha_inicio}</p>
        <p>Fin: {fecha_fin}</p>
      </div>

      {/* Botón de acción */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
        Ver detalles &rarr;
      </button>
    </article>
  );
}
