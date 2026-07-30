ReservasHotel
Descripción del proyecto

ReservasHotel es una aplicación web para la gestión de reservas de hotel.
El sistema contempla dos roles principales: cliente y administrador.

    Los clientes pueden registrarse, iniciar sesión, explorar hoteles y reservar habitaciones.

    Los administradores gestionan disponibilidad, precios y control de reservas.

El proyecto está desarrollado con Next.js, Tailwind CSS y TypeScript, utilizando Supabase como backend y desplegado en Vercel.

Roles del sistema

    Cliente

        Registro e inicio de sesión.

        Exploración de hoteles y habitaciones disponibles.

        Creación y cancelación de reservas.

    Administrador

        Gestión de disponibilidad y precios.

        CRUD completo de hoteles, habitaciones y reservas.

        Control de usuarios y métricas.

Base de datos en Supabase

La base de datos se implementa en Supabase (PostgreSQL) con las siguientes tablas:

    usuarios: clientes y administradores.

    hoteles: información de cada hotel.

    habitaciones: tipos, precios y estado.

    reservas: relación entre clientes y habitaciones.

Relaciones uno-a-muchos

    Un hotel → muchas habitaciones.

    Un cliente → muchas reservas.

    Una reserva → una habitación.

Autenticación

    Implementada con Supabase Auth.

    Registro e inicio de sesión seguro.

    Control de roles mediante políticas de seguridad (RLS).

Funcionalidades CRUD

    Clientes: crear reservas, leer disponibilidad, cancelar reservas.

    Administradores: crear/editar hoteles y habitaciones, actualizar precios, eliminar registros.

API externa

    Integración con OpenWeatherMap.???

    Muestra el clima del destino del hotel en tiempo real.

Frontend

    Framework: Next.js.

    Estilos: Tailwind CSS.

    Lenguaje: TypeScript.

    Componentes principales:

        Login y registro.

        Listado de hoteles y habitaciones.

        Reservas de clientes.

        Panel administrativo.

Despliegue

    El proyecto se despliega en Vercel.

    Documentación incluida en este README y en el repositorio.

Resumen

Este proyecto integra:

    Supabase como backend (autenticación, base de datos, RLS).

    Next.js + Tailwind + TypeScript como frontend.

    OpenWeatherMap API para información climática.

    Vercel para despliegue en producción.# ReservasHotel
 Tendrá dos roles: cliente y administrador. Los clientes podrán registrarse, iniciar sesión, explorar hoteles y reservar habitaciones. Los administradores gestionarán disponibilidad y precios. La base de datos en Supabase tendrá tablas para usuarios, hoteles, habitaciones y reservas, con relaciones uno-a-muchos. 
Se implementará autenticación real, CRUD completo y consumo de una API externa como OpenWeatherMap para mostrar el clima del destino. El frontend se construirá con Next.js, Tailwind y TypeScript, y el proyecto se desplegará en Vercel con documentación
