import Link from "next/link";

export default function Navbar() {
{/*ESTE NAVBAr estatito de componente sin Props, ESTE COMPONENTE SE MANTENDRA ESTATICO*/}
    return (
        <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center">

            <Link href="/" className="text-xl font-bold text-white hover: text-blue-400 transition-colors">
                ReservEC_HOTEL
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/" className="text-yellow-400 hover:text-white transition-colors">
                    Inicio
                </Link>

                <Link href="/reservas" className="text-blue-400 hover:text-white transition-colors">
                    Reservas publicadas
                </Link>

                <Link href="/dashboard" className="text-green-400 hover:text-white transition-colors">
                    Dashboard
                </Link>

                <Link href="/login" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                    Login
                </Link>
            </div>
        </nav>
    )
}