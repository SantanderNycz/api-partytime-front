# Party Time Frontend

Frontend React para o sistema de gerenciamento de festas Party Time.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **React Router** - Navegação entre páginas
- **Tailwind CSS 4** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. Navegue até a pasta frontend:
\`\`\`bash
cd frontend
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure o backend:
   - Certifique-se de que o backend está rodando em `http://localhost:3000`
   - Se necessário, ajuste a URL da API em `src/config/api.js`

## 🎯 Executar o Projeto

\`\`\`bash
npm run dev
\`\`\`

O frontend estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

\`\`\`bash
npm run build
\`\`\`

Os arquivos otimizados serão gerados na pasta `dist/`

## 📁 Estrutura do Projeto

\`\`\`
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   └── Layout.jsx  # Layout principal com header/footer
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Parties.jsx
│   │   ├── PartyDetails.jsx
│   │   ├── CreateParty.jsx
│   │   ├── EditParty.jsx
│   │   ├── Services.jsx
│   │   ├── CreateService.jsx
│   │   └── EditService.jsx
│   ├── config/         # Configurações
│   │   └── api.js      # Configuração da API
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Entrada da aplicação
│   └── index.css       # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
\`\`\`

## 🎨 Funcionalidades

### Festas
- ✅ Listar todas as festas
- ✅ Ver detalhes de uma festa
- ✅ Criar nova festa
- ✅ Editar festa existente
- ✅ Excluir festa
- ✅ Adicionar serviços à festa

### Serviços
- ✅ Listar todos os serviços
- ✅ Criar novo serviço
- ✅ Editar serviço existente
- ✅ Excluir serviço

## 🎨 Design

O design utiliza um tema escuro vibrante com cores festivas:
- **Purple** (#8b5cf6) - Cor principal
- **Pink** (#ec4899) - Destaque secundário
- **Blue** (#3b82f6) - Ações e serviços
- **Yellow** (#fbbf24) - Valores monetários
- **Background** - Tons de azul escuro (#0f0f23, #1a1a2e)

## 🔌 Integração com Backend

O frontend se conecta ao backend através da configuração em `src/config/api.js`:

- Base URL: `http://localhost:3000/api`
- Endpoints:
  - `/parties` - CRUD de festas
  - `/services` - CRUD de serviços

## 📱 Responsividade

O layout é totalmente responsivo e otimizado para:
- 📱 Mobile (< 640px)
- 💻 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🚀 Próximos Passos

- [ ] Adicionar autenticação de usuários
- [ ] Implementar busca e filtros
- [ ] Adicionar paginação
- [ ] Upload de imagens
- [ ] Validação de formulários mais robusta
- [ ] Testes unitários e de integração
