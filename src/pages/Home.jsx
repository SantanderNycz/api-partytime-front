import { Link } from "react-router-dom";
import { PartyPopper, Sparkles, Plus, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="justify-center items-center text-center py-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <PartyPopper className="w-12 h-12 text-[var(--color-party-purple)]" />
          <Sparkles className="w-8 h-8 text-[var(--color-party-yellow)]" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--color-party-purple)] via-[var(--color-party-pink)] to-[var(--color-party-blue)] bg-clip-text text-transparent">
          Party Time
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] mx-auto mb-8 mt-8">
          Gerencie suas festas e serviços de forma simples e eficiente. Crie
          eventos incríveis e organize todos os detalhes em um só lugar!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/parties/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-party-purple)] to-[var(--color-party-pink)] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Criar Nova Festa
          </Link>
          <Link
            to="/services/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-party-purple)] text-[var(--color-party-purple)] rounded-lg font-medium hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Adicionar Serviço
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        <Link
          to="/parties"
          className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 hover:border-[var(--color-party-purple)] transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[var(--color-party-purple)] to-[var(--color-party-pink)] p-3 rounded-xl">
              <PartyPopper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Gerenciar Festas</h2>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Organize e acompanhe todas as suas festas. Adicione serviços, defina
            orçamentos e mantenha tudo sob controle.
          </p>
          <div className="flex items-center gap-2 text-[var(--color-party-purple)] font-medium group-hover:gap-3 transition-all">
            <span>Ver festas</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </Link>

        <Link
          to="/services"
          className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 hover:border-[var(--color-party-blue)] transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[var(--color-party-blue)] to-[var(--color-party-purple)] p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Catálogo de Serviços</h2>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Crie e gerencie o catálogo de serviços disponíveis para suas festas.
            Defina preços, descrições e muito mais.
          </p>
          <div className="flex items-center gap-2 text-[var(--color-party-blue)] font-medium group-hover:gap-3 transition-all">
            <span>Ver serviços</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </Link>
      </section>
    </div>
  );
}
