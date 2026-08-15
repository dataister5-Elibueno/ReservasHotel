import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "ReservEC_HOTEL - Portal de hoteles asociados del Ecuador",
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
       <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white min-h-screen">
        <Navbar />
        <main className="px-6 py-10">{children}</main>
      </body>
    </html>
  );
}