import { Link, useLocation } from "react-router-dom"
import { PartyPopper, Sparkles, Home } from "lucide-react"

export default function Layout({ children }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-[var(--color-party-purple)] to-[var(--color-party-pink)] p-2 rounded-xl group-hover:scale-110 transition-transform">
                <PartyPopper className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-party-purple)] to-[var(--color-party-pink)] bg-clip-text text-transparent">
                Party Time
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("/") && location.pathname === "/"
                    ? "bg-[var(--color-party-purple)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/parties"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("/parties")
                    ? "bg-[var(--color-party-purple)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <PartyPopper className="w-4 h-4" />
                <span className="hidden sm:inline">Festas</span>
              </Link>
              <Link
                to="/services"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("/services")
                    ? "bg-[var(--color-party-purple)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Serviços</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-[var(--color-text-muted)] text-sm">
            © 2025 Party Time. Transformando momentos em memórias inesquecíveis ✨
          </p>
        </div>
      </footer>
    </div>
  )
}
