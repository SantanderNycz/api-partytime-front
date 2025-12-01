"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Calendar, DollarSign, User, Trash2, Edit, Eye } from "lucide-react"
import { api } from "../config/api"

export default function Parties() {
  const [parties, setParties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadParties()
  }, [])

  const loadParties = async () => {
    try {
      const data = await api.getParties()
      setParties(data)
    } catch (error) {
      console.error("Erro ao carregar festas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta festa?")) {
      try {
        await api.deleteParty(id)
        setParties(parties.filter((party) => party._id !== id))
      } catch (error) {
        console.error("Erro ao deletar festa:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-party-purple)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Carregando festas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Minhas Festas</h1>
          <p className="text-[var(--color-text-secondary)]">Gerencie todas as suas festas e eventos</p>
        </div>
        <Link
          to="/parties/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-party-purple)] to-[var(--color-party-pink)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          Nova Festa
        </Link>
      </div>

      {/* Parties Grid */}
      {parties.length === 0 ? (
        <div className="text-center py-12 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
          <Calendar className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhuma festa cadastrada</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">Comece criando sua primeira festa!</p>
          <Link
            to="/parties/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-party-purple)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Criar Festa
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parties.map((party) => (
            <div
              key={party._id}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-party-purple)] transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-[var(--color-background)]">
                <img
                  src={party.image || "/placeholder.svg"}
                  alt={party.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold line-clamp-1">{party.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2">{party.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <User className="w-4 h-4" />
                    <span>{party.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[var(--color-party-yellow)]" />
                    <span className="font-semibold text-[var(--color-party-yellow)]">
                      R$ {party.budget?.toLocaleString("pt-BR") || "0"}
                    </span>
                  </div>
                  {party.services && party.services.length > 0 && (
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {party.services.length} serviço(s) adicionado(s)
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
                  <Link
                    to={`/parties/${party._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-party-blue)] text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Link>
                  <Link
                    to={`/parties/edit/${party._id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:border-[var(--color-party-purple)] transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(party._id)}
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
