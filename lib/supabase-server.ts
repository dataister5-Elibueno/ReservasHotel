import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

//Funcion para crear un cliente de Supabase en el servidor, cookies para mantener la sesión del usuario
export async function createClient() {

    //Obtenemos las cookies del navegador
    const cookieStore = await cookies()

    //Creamos el cliente de Supabase con las cookies del navegador
    return createServerClient(

        //Obtenemos las variables de entorno para la URL y la clave de Supabase
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            //Pasamos las cookies del navegador al cliente de Supabase
            cookies: {
                //Creamos una función para obtener todas las cookies del navegador
                getAll() {
                    return cookieStore.getAll()
                },
                //Creamos una función para establecer todas las cookies del navegador
                setAll(cookiesToSet) {
                    //Iteramos sobre todas las cookies que queremos establecer y las establecemos en el navegador
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                },
            },
        }
    )
}
