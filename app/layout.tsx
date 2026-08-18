import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ReservEC_HOTEL - Portal de hoteles asociados",
  description: "Encuentra Hoteles disponibles en ReservEC_HOTEL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
    >       
       <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen">
        <Navbar />
        <main className="px-6 py-10">{children}</main>
      </body>
    </html>
  );
}