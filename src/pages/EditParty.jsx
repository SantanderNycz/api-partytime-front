import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const API_URL = "https://api-partytime-back.onrender.com/api";

export default function EditParty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [party, setParty] = useState({
    title: "",
    author: "",
    description: "",
    budget: "",
    image: "",
  });

  useEffect(() => {
    fetchParty();
  }, [id]);

  const fetchParty = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/parties/${id}`);

      if (!response.ok) {
        throw new Error(`Erro ao carregar festa: ${response.status}`);
      }

      const data = await response.json();

      // Ajusta os dados para o formato do formulário
      setParty({
        title: data.title || "",
        author: data.author || "",
        description: data.description || "",
        budget: data.budget || "",
        image: data.image || "",
      });
    } catch (err) {
      console.error("Erro ao buscar festa:", err);
      setError("Não foi possível carregar os dados da festa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!party.title || !party.author || !party.budget) {
      setError(
        "Por favor, preencha todos os campos obrigatórios (título, autor e orçamento)."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Prepara os dados para envio
      const dataToSend = {
        title: party.title.trim(),
        author: party.author.trim(),
        description: party.description.trim(),
        budget: Number(party.budget),
        image: party.image.trim(),
      };

      console.log("Enviando atualização:", dataToSend);

      const response = await fetch(`${API_URL}/parties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.message || `Erro ao atualizar: ${response.status}`
        );
      }

      // Sucesso! Redireciona para a página de detalhes
      alert("Festa atualizada com sucesso!");
      navigate(`/parties/${id}`);
    } catch (err) {
      console.error("Erro ao atualizar festa:", err);
      setError(
        err.message || "Não foi possível atualizar a festa. Tente novamente."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando dados da festa...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
          Editar Festa
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a2e] rounded-lg p-6 shadow-xl"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={party.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0f0f23] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Autor <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={party.author}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0f0f23] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Descrição</label>
            <textarea
              name="description"
              value={party.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-[#0f0f23] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Orçamento (R$) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="budget"
              value={party.budget}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 bg-[#0f0f23] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">URL da Imagem</label>
            <input
              type="url"
              name="image"
              value={party.image}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0f0f23] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/parties/${id}`)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
