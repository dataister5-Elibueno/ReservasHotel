"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Usuario creado correctamente")
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Crear cuenta</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleSignup}>Registrarse</button>
      {message && <p>{message}</p>}
    </main>
  )
}
