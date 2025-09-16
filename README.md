# README — Mini Notes App (Effect + React + Drizzle)

## 🎯 Objetivo

Construir um aplicativo web simples de **notas** que permita criar, listar, atualizar e excluir registros.
O desafio avalia sua capacidade de trabalhar com nosso stack principal (**Effect, React, Drizzle**) e explorar o uso de IA no design de interface.

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou bun

### Instalação e Execução

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone <repository-url>
   cd ledda-notes
   npm install
   ```

2. **Instale as dependências dos sub-projetos:**
   ```bash
   # Instalar dependências do servidor (API)
   npm run install-server
   
   # Instalar dependências do cliente (React)
   npm run install-client
   ```

3. **Executar o projeto:**

   **Opção 1: Executar tudo de uma vez (recomendado)**
   ```bash
   npm run dev
   ```
   Este comando inicia tanto o servidor backend quanto o cliente frontend simultaneamente.

   **Opção 2: Executar separadamente**
   ```bash
   # Terminal 1 - Servidor API (porta 3035)
   npm run dev-server
   
   # Terminal 2 - Cliente React (porta 3000)
   npm run dev-client
   ```

4. **Acessar a aplicação:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3035

---

## 🔧 Requisitos Técnicos

### Backend

* Desenvolver em **TypeScript** usando **Effect**:
  * `http-api` para definição de contrato e rotas
  * uso de **services** e **layers** para injeção de dependências
  * validação com **schemas**
  * erros tipados mapeados corretamente para status HTTP
* CRUD completo de notas: criar, listar, buscar por ID, atualizar e excluir.

### Banco de Dados

* Modelagem via **Drizzle ORM** (SQLite ou Postgres).
* Tabela `notes` com:
  * `id`, `title`, `content`, `createdAt`, `updatedAt`.

### Frontend

* Interface em **React**.
* CRUD acessível e fluido.
* Estilo/UX produzido com apoio de **IA** (Cursor, Claude Code, etc.).
* Uso consistente da **paleta Ledda**:

  **Primary Colors**
  * Primary: Deep teal `#1E4D4A` / `hsl(180, 45%, 15%)`
  * Secondary: Light green `#D5E5DC` / `hsl(142, 25%, 86%)`

  **Supporting Colors**
  * Background: Pure white `hsl(0, 0%, 100%)`
  * Foreground: Deep teal `hsl(180, 45%, 15%)`
  * Muted: Very light green `hsl(142, 25%, 96%)`
  * Accent: Light green `hsl(142, 25%, 86%)`
  * Border: Light green `hsl(142, 25%, 86%)`

  **Logo Colors**
  * Petals: Light green `#C1D9C3`
  * Stroke: White

---

## 📂 Estrutura do Projeto

```
ledda-notes/
├── apps/
│   ├── api/                    # Backend API (Effect + TypeScript)
│   │   ├── src/
│   │   │   ├── domain/         # schemas, erros de domínio
│   │   │   ├── services/       # services + layers
│   │   │   ├── http/           # contrato HttpApi + handlers
│   │   │   └── db/             # schema Drizzle + migrations
│   │   ├── drizzle/            # migrations e configurações do banco
│   │   └── package.json
│   └── web/                    # Frontend React
│       ├── src/
│       │   ├── components/     # UI (cards, forms, feedback)
│       │   ├── pages/          # telas de CRUD
│       │   ├── lib/            # client API
│       │   └── styles/         # tokens e temas
│       └── package.json
├── package.json                # Scripts principais e workspaces
└── README.md
```

---

## 🛠️ Decisões Técnicas

### Backend (Effect + TypeScript)
- **Effect Framework**: Escolhido para demonstrar competência com programação funcional e gerenciamento de efeitos
- **HTTP API**: Utilização do `@effect/http` para definição de contratos tipados
- **Drizzle ORM**: ORM moderno e type-safe para TypeScript
- **SQLite**: Banco de dados leve para desenvolvimento local

### Frontend (React + TypeScript)
- **React 18**: Framework principal com hooks modernos
- **TanStack Query**: Gerenciamento de estado do servidor e cache
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápido para desenvolvimento

### Arquitetura
- **Monorepo**: Estrutura com workspaces npm para organizar API e Web
- **Separation of Concerns**: Camadas bem definidas (domain, services, http)
- **Type Safety**: Contratos compartilhados entre frontend e backend

---

## 🤖 Uso de IA no Design

### Processo de Design com IA

A interface foi desenvolvida com extenso apoio de IA, seguindo estas etapas:

1. **Análise de Requisitos**: IA ajudou a interpretar os requisitos de acessibilidade e UX
2. **Paleta de Cores**: Implementação consistente da paleta Ledda com validação de contraste
3. **Componentes**: Criação de sistema de design modular e reutilizável
4. **Acessibilidade**: Implementação de WCAG 2.1 AA com foco em:
   - Contraste de cores adequado
   - Navegação por teclado
   - ARIA labels e semântica
   - Suporte a leitores de tela

### Prompts Utilizados
- "Criar componentes React acessíveis seguindo WCAG 2.1 AA"
- "Implementar sistema de cores Ledda com validação de contraste"
- "Desenvolver interface responsiva com foco em UX moderna"
- "Otimizar navegação por teclado e suporte a tecnologias assistivas"

---

## 📑 Critérios de Avaliação

| Critério                                                            | Peso | Status |
| ------------------------------------------------------------------- | ---: | ------ |
| Uso do Effect (services, layers, http-api, erros tipados)           |  25% | ✅     |
| **Acessibilidade** (contraste, foco visível, navegação por teclado) |  15% | ✅     |
| Modelagem de dados e Drizzle                                        |  10% | ✅     |
| Frontend/UX                                                         |  20% | ✅     |
| Uso de IA no design                                                 |  10% | ✅     |
| Qualidade de código (organização, tipagem, testes básicos)          |  10% | ✅     |
| Developer Experience (setup simples, README, env)                   |  10% | ✅     |

**Bônus Implementados (+ 10%)**
- ✅ TanStack Query e gerenciamento de cache
- ✅ Interface totalmente acessível (WCAG 2.1 AA)
- ✅ Sistema de design consistente

---

## 🔗 Endpoints da API

A API fornece os seguintes endpoints:

- `GET /notes` - Listar todas as notas
- `GET /note/:id` - Buscar nota por ID
- `POST /note` - Criar nova nota
- `PUT /note` - Atualizar nota existente
- `DELETE /note` - Excluir nota

---

## 🧪 Funcionalidades Implementadas

### Backend
- ✅ CRUD completo de notas
- ✅ Validação de schemas com Effect
- ✅ Tratamento de erros tipados
- ✅ Injeção de dependências com layers
- ✅ Banco de dados SQLite com Drizzle

### Frontend
- ✅ Interface React moderna e responsiva
- ✅ Operações CRUD com feedback visual
- ✅ Estados de loading e error
- ✅ Modais para criação/edição
- ✅ Confirmação de exclusão
- ✅ Navegação por teclado completa
- ✅ Suporte a leitores de tela

---

## 📝 Licença

ISC License