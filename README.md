# Fantasy FC Clone

Este é um clone simplificado de um jogo fantasy estilo Cartola FC, construído com **Next.js (App Router)**, **React 18**, **TypeScript** e **Tailwind CSS**. Todos os dados são servidos por _mocks_ locais, sem necessidade de APIs externas.

---

## 📁 Estrutura de Pastas

```
fantasy-game-next-react/
├── app/
│   ├── api/                # Rotas de API mockadas
│   ├── layout.tsx          # Layout global (Navbar, Container)
│   ├── page.tsx            # Redirect para /dashboard
│   ├── dashboard/page.tsx  # Página de Dashboard
│   ├── team/page.tsx       # Página Meu Time
│   └── league/page.tsx     # Página Ligas
├── components/             # Componentes de UI (Navbar, Card, etc.)
├── context/                # Context API para gerenciamento de time
├── lib/                    # Funções de fetch mockado
├── mocks/                  # Dados estáticos de jogadores, times e ligas
├── styles/                 # CSS global (Tailwind)
├── .gitignore
├── next.config.js          # Configuração do Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Como Executar

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd fantasy-game-next-react
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Rodando em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

   - Acesse `http://localhost:3000` no navegador.
   - A rota raiz redireciona automaticamente para `/dashboard`.

4. **Build de produção**
   ```bash
   npm run build
   npm start
   ```

---

## 🎨 Tecnologias

- **Framework**: Next.js 13+ (App Router)
- **Biblioteca UI**: React 18
- **Estilo**: Tailwind CSS
- **Mock de dados**: módulos em TypeScript dentro de `/mocks`
- **State Management**: React Context API (Time & Orçamento)

---

## ⚙️ Funcionalidades Principais

- Listagem de jogadores da Série A Brasileira
- Orçamento e compra de jogadores (mock)
- Exibição e remoção de jogadores no time
- Listagem de ligas públicas (Série A, Série B, privadas)
- Navegação responsiva com menu hamburger
- Layout composto por Container e Cards

---

## 🛠️ Customizações

- **Mocks**: Para alterar os jogadores, edite `mocks/players.ts`.
- **Preços**: Ajuste campo `price` no mock.
- **Posições**: Valores livres em `position`.

---

## 🧪 Testes

### Estrutura de Testes

```
__tests__/
├── e2e/                    # Testes end-to-end (Cypress)
│   ├── player-purchase.cy.ts    # Testes de compra de jogadores
│   ├── mobile-menu.cy.ts        # Testes do menu mobile
│   └── navbar.accessibility.cy.ts # Testes de acessibilidade
│
├── unit/                   # Testes unitários (Jest)
│   ├── components/         # Testes de componentes
│   │   ├── PlayerList.test.tsx    # Lista de jogadores
│   │   ├── TeamStats.test.tsx     # Estatísticas do time
│   │   ├── Container.test.tsx     # Container principal
│   │   ├── LeagueList.test.tsx    # Lista de ligas
│   │   ├── Navbar.test.tsx        # Navegação
│   │   ├── TeamForm.test.tsx      # Formulário do time
│   │   ├── TeamPage.test.tsx      # Página do time
│   │   └── Button.test.tsx        # Botões
│   │
│   ├── context/           # Testes de contexto
│   │   └── TeamContext.test.tsx   # Contexto do time
│   │
│   ├── app/              # Testes de páginas
│   │   ├── page.test.tsx          # Página inicial
│   │   ├── layout.test.tsx        # Layout global
│   │   ├── dashboard/page.test.tsx # Dashboard
│   │   ├── team/page.test.tsx     # Página do time
│   │   └── league/page.test.tsx   # Página de ligas
│   │
│   └── lib/              # Testes de utilitários
│       └── api.test.ts            # Funções de API
│
└── config/               # Configurações de teste
```

### Comandos de Teste

#### Testes Unitários (Jest)

```bash
# Executar testes
npm run test:unit

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Abrir relatório de cobertura
npm run coverage:open
```

#### Testes E2E (Cypress)

```bash
# Rodar aplicação
npm run dev

# Modo interativo
npm run cypress:web

# Modo headless
npm run cypress:run

# Executar testes com relatório
npm run cypress:run:report

# Abrir relatórios
npm run cypress:report:open        # Relatório individual
npm run cypress:report:combined    # Relatório geral
```

## 📊 Relatórios de Teste

### Relatório Jest

![ Jest](https://raw.githubusercontent.com/lucashdp/fantasy-game-test/a8e1e9c9cff483ae363b5df9952370b9ed478c19/docs/jest-test.png)
![Relatório Jest](https://raw.githubusercontent.com/lucashdp/fantasy-game-test/a8e1e9c9cff483ae363b5df9952370b9ed478c19/docs/relatorio-jest.png)

### Relatório Cypress

![Relatório Cypress](https://raw.githubusercontent.com/lucashdp/fantasy-game-test/a8e1e9c9cff483ae363b5df9952370b9ed478c19/docs/relatorio-cypress.png)


## 📄 Licença

Projeto para fins educacionais e de demonstração.
