# BarberFlow - Sistema SaaS para Barbearias

Sistema completo de gestão para barbearias com agendamento online, controle financeiro, gestão de clientes e muito mais.

## 🚀 Como rodar o projeto (SEM DOCKER)

### Pré-requisitos

- Node.js 18+ instalado
- NPM ou Yarn
- PostgreSQL instalado e rodando (local ou remoto)

### Passo 1: Instalar dependências

Abra o terminal na pasta do projeto e execute:

```bash
# Instalar dependências do backend
cd barberflow/server
npm install

# Instalar dependências do frontend (em outro terminal)
cd barberflow/web
npm install
```

### Passo 2: Configurar banco de dados

O projeto usa **PostgreSQL** (compatível com Railway, Neon, Supabase, VPS, AWS, Azure):

```bash
# Na pasta server
npm run db:setup
```

Este comando vai:
- ✅ Criar todas as tabelas no PostgreSQL
- ✅ Popular com dados de exemplo (admin, barbeiros, serviços, clientes)

### Passo 3: Iniciar o backend

```bash
cd barberflow/server
npm run dev
```

O backend vai rodar em: **http://localhost:3001**

### Passo 4: Iniciar o frontend

Abra **outro terminal**:

```bash
cd barberflow/web
npm run dev
```

O frontend vai abrir automaticamente em: **http://localhost:5173**

## 🔐 Credenciais de acesso

Após executar o seed, use estas credenciais:

- **Email:** `admin@barberflow.com`
- **Senha:** `admin123`

## 📁 Estrutura do projeto

```
barberflow/
├── server/                 # Backend (Node.js + Express + Prisma + PostgreSQL)
│   ├── prisma/
│   │   ├── schema.prisma   # Modelos do banco de dados
│   │   ├── seed.ts         # Dados de exemplo
│   │   └── migrations/     # Migrations do banco de dados
│   └── src/
│       ├── config/         # Configurações
│       ├── middlewares/    # Auth, validação, erros
│       ├── repositories/   # Acesso a dados
│       ├── services/       # Lógica de negócio
│       ├── controllers/    # Controllers
│       └── routes/         # Rotas da API
│
├── web/                    # Frontend (React + Vite + Tailwind)
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       ├── pages/          # Páginas
│       ├── services/       # Chamadas à API
│       └── lib/            # Utilitários
│
└── README.md
```

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (compatível com Railway, Neon, Supabase, VPS, AWS, Azure)
- JWT + Refresh Token
- Zod (validação)
- Bcrypt (senhas)

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Query
- React Router
- Framer Motion
- Recharts

## 📊 Funcionalidades

### ✅ Implementado
- [x] Autenticação (JWT + Refresh Token)
- [x] Multi-tenant (cada barbearia isolada)
- [x] CRUD de Clientes
- [x] CRUD de Barbeiros
- [x] CRUD de Serviços
- [x] CRUD de Agendamentos
- [x] Verificação de conflitos de horário
- [x] Controle de acesso por perfil (RBAC)
- [x] Validação de dados (Zod)
- [x] Segurança (Helmet, Rate Limit, CORS)

### 🔜 Em desenvolvimento
- [ ] Dashboard com KPIs
- [ ] Calendário interativo
- [ ] Módulo financeiro
- [ ] Estoque
- [ ] Relatórios
- [ ] Notificações
- [ ] Agenda online pública
- [ ] App mobile (PWA)

## 🎯 Comandos úteis

```bash
# Backend
cd barberflow/server
npm run dev              # Iniciar servidor em modo desenvolvimento
npm run db:setup         # Criar banco e popular com dados
npm run db:seed          # Apenas popular com dados
npm run db:reset         # Resetar banco e popular novamente

# Frontend
cd barberflow/web
npm run dev              # Iniciar frontend em modo desenvolvimento
npm run build            # Build para produção
```

## 🎯 Como usar

1. **Cadastrar barbearia:** Acesse `/api/auth/register`
2. **Fazer login:** Acesse `/api/auth/login`
3. **Gerenciar clientes:** `GET/POST/PUT/DELETE /api/clients`
4. **Gerenciar barbeiros:** `GET/POST/PUT/DELETE /api/barbers`
5. **Gerenciar serviços:** `GET/POST/PUT/DELETE /api/services`
6. **Agendamentos:** `GET/POST/PUT/DELETE /api/appointments`

## 📝 Licença

Este projeto é proprietário e foi desenvolvido para fins comerciais.

---

**Desenvolvido com ❤️ por Euller Funes**