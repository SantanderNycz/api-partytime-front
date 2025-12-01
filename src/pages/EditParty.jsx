"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Plus, X } from "lucide-react"
import { api } from "../config/api"

export default function EditParty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [availableServices, setAvailableServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    budget: "",
    image: "",
    services: [],
  })

  useEffect(() => {
    loadParty()
    loadServices()
  }, [id])

  const loadParty = async () => {
    try {
      const data = await api.getParty(id)
      setFormData({
        title: data.title || "",
        author: data.author || "",
        description: data.description || "",
        budget: data.budget || "",
        image: data.image || "",
        services: data.services || [],
      })
    } catch (error) {
      console.error("Erro ao carregar festa:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadServices = async () => {
    try {
      const data = await api.getServices()
      setAvailableServices(data)
    } catch (error) {
      console.error("Erro ao carregar serviços:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const dataToSend = {
        ...formData,
        budget: Number(formData.budget),
      }
      await api.updateParty(id, dataToSend)
      navigate(`/parties/${id}`)
    } catch (error) {
      console.error("Erro ao atualizar festa:", error)
      alert("Erro ao atualizar festa. Verifique os dados e tente novamente.")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addService = (service) => {
    if (!formData.services.find((s) => s._id === service._id)) {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      })
    }
  }

  const removeService = (serviceId) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s._id !== serviceId),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-party-purple)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          to={`/parties/${id}`}
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-party-purple)] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
        <h1 className="text-3xl font-bold">Editar Festa</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título da Festa *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Organizador *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Orçamento (R$) *</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL da Imagem *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold">Serviços</h2>

          {formData.services.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-[var(--color-text-secondary)]">Serviços Selecionados:</h3>
              {formData.services.map((service) => (
                <div
                  key={service._id}
                  className="flex items-center justify-between p-4 bg-[var(--color-background)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {service.image && (
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-[var(--color-party-yellow)]">
                        R$ {service.price?.toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeService(service._id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <h3 className="font-medium text-[var(--color-text-secondary)] mb-3">Serviços Disponíveis:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {availableServices.map((service) => (
                <button
                  key={service._id}
                  type="button"
                  onClick={() => addService(service)}
                  disabled={formData.services.find((s) => s._id === service._id)}
                  className="flex items-center gap-3 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-party-purple)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  {service.image && (
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-[var(--color-party-yellow)]">
                      R$ {service.price?.toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <Plus className="w-5 h-5 text-[var(--color-party-purple)]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-[var(--color-party-purple)] to-[var(--color-party-pink)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Salvar Alterações
          </button>
          <Link
            to={`/parties/${id}`}
            className="px-6 py-3 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-background)] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
