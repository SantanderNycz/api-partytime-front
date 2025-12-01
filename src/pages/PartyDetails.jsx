"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Edit, Trash2, User, DollarSign, Sparkles } from "lucide-react"
import { api } from "../config/api"

export default function PartyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [party, setParty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadParty()
  }, [id])

  const loadParty = async () => {
    try {
      const data = await api.getParty(id)
      setParty(data)
    } catch (error) {
      console.error("Erro ao carregar festa:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta festa?")) {
      try {
        await api.deleteParty(id)
        navigate("/parties")
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
          <p className="text-[var(--color-text-secondary)]">Carregando detalhes...</p>
        </div>
      </div>
    )
  }

  if (!party) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Festa não encontrada</h2>
        <Link to="/parties" className="inline-flex items-center gap-2 text-[var(--color-party-purple)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Voltar para festas
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/parties"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-party-purple)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
        <div className="flex gap-2">
          <Link
            to={`/parties/edit/${id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-party-purple)] text-white rounded-lg hover:scale-105 transition-transform"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-105 transition-transform"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      {/* Party Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img src={party.image || "/placeholder.svg"} alt={party.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>
      </div>

      {/* Party Info */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{party.title}</h1>
          <p className="text-[var(--color-text-secondary)]">{party.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-[var(--color-background)] rounded-lg">
            <User className="w-5 h-5 text-[var(--color-party-purple)]" />
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Organizador</div>
              <div className="font-semibold">{party.author}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[var(--color-background)] rounded-lg">
            <DollarSign className="w-5 h-5 text-[var(--color-party-yellow)]" />
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Orçamento</div>
              <div className="font-semibold text-[var(--color-party-yellow)]">
                R$ {party.budget?.toLocaleString("pt-BR") || "0"}
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        {party.services && party.services.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--color-party-blue)]" />
              <h2 className="text-2xl font-bold">Serviços Contratados</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {party.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-4 space-y-3"
                >
                  {service.image && (
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <h3 className="font-bold text-lg">{service.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{service.description}</p>
                  <div className="flex items-center gap-2 text-[var(--color-party-yellow)] font-semibold">
                    <DollarSign className="w-4 h-4" />
                    R$ {service.price?.toLocaleString("pt-BR") || "0"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
