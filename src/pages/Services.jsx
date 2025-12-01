"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Sparkles, DollarSign, Trash2, Edit } from "lucide-react"
import { api } from "../config/api"

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await api.getServices()
      setServices(data)
    } catch (error) {
      console.error("Erro ao carregar serviços:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await api.deleteService(id)
        setServices(services.filter((service) => service._id !== id))
      } catch (error) {
        console.error("Erro ao deletar serviço:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-party-purple)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Carregando serviços...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Catálogo de Serviços</h1>
          <p className="text-[var(--color-text-secondary)]">Gerencie os serviços disponíveis para suas festas</p>
        </div>
        <Link
          to="/services/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-party-blue)] to-[var(--color-party-purple)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          Novo Serviço
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
          <Sparkles className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum serviço cadastrado</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Adicione serviços ao catálogo para usar em suas festas!
          </p>
          <Link
            to="/services/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-party-blue)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Criar Serviço
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-party-blue)] transition-all group"
            >
              <div className="relative h-48 overflow-hidden bg-[var(--color-background)]">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold line-clamp-1">{service.name}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[var(--color-party-yellow)]" />
                  <span className="text-xl font-bold text-[var(--color-party-yellow)]">
                    R$ {service.price?.toLocaleString("pt-BR") || "0"}
                  </span>
                </div>

                <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
                  <Link
                    to={`/services/edit/${service._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-party-blue)] text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
