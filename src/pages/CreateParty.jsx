import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchWithAuth } from "../config/api";

export default function CreateParty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [party, setParty] = useState({
    title: "",
    author: "",
    description: "",
    budget: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!party.title || !party.author || !party.budget) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const dataToSend = {
        title: party.title.trim(),
        author: party.author.trim(),
        description: party.description.trim(),
        budget: Number(party.budget),
        image: party.image.trim(),
      };

      // fetchWithAuth já adiciona o token automaticamente
      const response = await fetchWithAuth("/parties", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Erro ao criar festa");
      }

      alert("Festa criada com sucesso!");
      navigate("/parties");
    } catch (err) {
      console.error("Erro ao criar festa:", err);
      setError(
        err.message || "Não foi possível criar a festa. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
        Criar Nova Festa
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
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Criando..." : "Criar Festa"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/parties")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
