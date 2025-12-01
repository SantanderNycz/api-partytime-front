"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Plus, X } from "lucide-react"
import { api } from "../config/api"

export default function CreateParty() {
  const navigate = useNavigate()
  const [availableServices, setAvailableServices] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    budget: "",
    image: "",
    services: [],
  })

  useEffect(() => {
    loadServices()
  }, [])

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
      await api.createParty(dataToSend)
      navigate("/parties")
    } catch (error) {
      console.error("Erro ao criar festa:", error)
      alert("Erro ao criar festa. Verifique os dados e tente novamente.")
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/parties"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-party-purple)] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
        <h1 className="text-3xl font-bold">Criar Nova Festa</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Preencha as informações da sua festa</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Título da Festa *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
              placeholder="Ex: Festa de Aniversário"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-2">Organizador *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
              placeholder="Seu nome"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors resize-none"
              placeholder="Descreva sua festa..."
            />
          </div>

          {/* Budget */}
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
              placeholder="0.00"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">URL da Imagem *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-party-purple)] transition-colors"
              placeholder="https://exemplo.com/imagem.jpg"
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

        {/* Services Section */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold">Serviços (Opcional)</h2>

          {/* Selected Services */}
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

          {/* Available Services */}
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

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-[var(--color-party-purple)] to-[var(--color-party-pink)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Criar Festa
          </button>
          <Link
            to="/parties"
            className="px-6 py-3 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-background)] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
