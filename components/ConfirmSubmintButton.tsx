"use client"
export default function ConfirmSubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("¿Estás seguro de eliminar este hotel?")) {
          e.preventDefault()
        }
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  )
}
