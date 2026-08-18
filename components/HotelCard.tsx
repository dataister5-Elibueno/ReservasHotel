// components/HotelCard.tsx
import Image from "next/image"

// 🔹 Interfaz tipada para los datos del hotel
interface HotelCardProps {
  id: string
  nombre: string
  ciudad: string
  descripcion: string
  imagen_url?: string | null // opcional, puede venir vacío
}

// 🔹 Componente que recibe las props del hotel
export default function HotelCard({
  id,
  nombre,
  ciudad,
  descripcion,
  imagen_url,
}: HotelCardProps) {
  return (
    <article className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:bg-slate-700 transition-colors border border-slate-700">
      {/* Imagen del hotel (si existe) */}
      {imagen_url ? (
        <Image
          src={imagen_url}
          alt={nombre}
          width={400}
          height={250}
          className="rounded-lg mb-4 object-cover"
        />
      ) : (
        <div className="bg-slate-700 rounded-lg h-40 mb-4 flex items-center justify-center text-slate-400 text-sm">
          Sin imagen disponible
        </div>
      )}

      {/* Nombre y ciudad */}
      <h2 className="text-xl font-bold text-green-500 mb-1">{nombre}</h2>
      <p className="text-slate-400 text-sm mb-2">{ciudad}</p>

      {/* Descripción */}
      <p className="text-slate-300 text-sm mb-4">{descripcion}</p>

      {/* Botón de acción */}
      <button className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
        Ver detalles &rarr;
      </button>
    </article>
  )
}
