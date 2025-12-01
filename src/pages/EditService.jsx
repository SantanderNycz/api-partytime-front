"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { api } from "../config/api"

export default function EditService() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  })

  useEffect(() => {
    loadService()
  }, [id])

  const loadService = async () => {
    try {
      const data = await api.getService(id)
      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        image: data.image || "",
      })
    } catch (error) {
      console.error("Erro ao carregar serviço:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
      }
      await api.updateService(id, dataToSend)
      navigate("/services")
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error)
      alert("Erro ao atualizar serviço. Verifique os dados e tente novamente.")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-party-purple)] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
        <h1 className="text-3xl font-bold">Editar Serviço</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Serviço *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            <label className="block text-sm font-medium mb-2">Preço (R$) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-[var(--color-party-blue)] to-[var(--color-party-purple)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Salvar Alterações
          </button>
          <Link
            to="/services"
            className="px-6 py-3 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-background)] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
