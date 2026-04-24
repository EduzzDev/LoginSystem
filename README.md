# 🔐 Login System

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<br/>

> Sistema completo de autenticação e gerenciamento de usuários com frontend moderno e backend seguro.

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue.svg)](#)

</div>

## 📋 Sumário

- [🏗️ Arquitetura](#arquitetura)
- [⚙️ Tecnologias](#-tecnologias)
- [✨ Funcionalidades](#-funcionalidades)
- [📦 Pré-requisitos](#pré-requisitos)
- [🔨 Instalação](#instalação)
- [🚀 Como Rodar](#-como-rodar)
- [🔐 Variáveis de Ambiente](#variáveis-de-ambiente)
- [📂 Estrutura do Projeto](#estrutura-do-projeto)
- [🌐 Endpoints da API](#endpoints-da-api)
- [🔄 Fluxo de Autenticação](#fluxo-de-autenticação)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Melhorias Futuras](#melhorias-futuras)
- [🛠️ Script de Desenvolvedor](#-script-de-desenvolvedor)

## Arquitetura

Este é um projeto **monorepo** com separação clara entre frontend e backend:

```
LoginSystem/
├── login_system/          # Frontend (React + Vite)
├── backend/               # Backend (Express.js)
└── Shared configs
```

## 🚀 Tecnologias

### Frontend

- **React** - UI Library
- **Vite** - Build tool rápido
- **TailwindCSS** - Styling
- **Axios/Fetch API** - HTTP requests

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **better-sqlite3** - Database (SQLite)
- **bcrypt** - Autenticação segura
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

---

## 📌 Funcionalidades

### ✅ Implementadas

- ✨ Página de registro de usuários
- 🔐 Criptografia de senhas com bcrypt (salt rounds: 10)
- 💾 Persistência de dados em SQLite
- 🚀 API REST com Express
- 🔄 CORS configurado
- 🛡️ Variáveis de ambiente para segurança
- 🎨 Componente Input reutilizável
- 📝 Sistema de login com validação
- 🔐 Normalização de email (toLowerCase + trim)
- ⚠️ Tratamento de erros no frontend e backend

### 🚧 Em Desenvolvimento

- 📊 Dashboard com informações do usuário

### 🚧 Planejadas

- 🔑 Autenticação com JWT
- 🔄 Refresh tokens
- 📧 Validação de email
- 🔐 Recuperação de senha
- 👤 Perfil do usuário
- 🚪 Logout

---

## 📦 Pré-requisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (ou npm/yarn)
- **SQLite** (incluído no better-sqlite3)

Verificar versões:

```bash
node --version
pnpm --version
```

---

## 🔨 Instalação

### 1. Clone ou abra o projeto

```bash
cd LoginSystem
```

### 2. Instale as dependências globais (monorepo)

```bash
pnpm install
```

Isso instala dependências em ambos os projetos automaticamente.

### 3. Configure as variáveis de ambiente

**Backend (.env)**

```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env`:

```env
NODE_ENV=development
PORT=3000
HOST=localhost
DATABASE_PATH=LoginSystem.db
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env - se necessário)**

```bash
cp login_system/.env.example login_system/.env 2>/dev/null || echo "Sem .env.example no frontend"
```

---

## 🚀 Como Rodar

### Opção 1: Ambos os projetos em paralelo (recomendado)

**Terminal 1 - Backend:**

```bash
cd backend
pnpm run dev
# ou
pnpm dev
```

Servidor rodará em: `http://localhost:3000`

**Terminal 2 - Frontend:**

```bash
cd login_system
pnpm run dev
```

App rodará em: `http://localhost:5173`

### Opção 2: Apenas Frontend

```bash
cd login_system
pnpm install
pnpm run dev
```

### Opção 3: Apenas Backend

```bash
cd backend
pnpm install
pnpm run dev
```

---

## 🔐 Variáveis de Ambiente

### Backend

| Variável        | Padrão                  | Descrição                        |
| --------------- | ----------------------- | -------------------------------- |
| `NODE_ENV`      | `development`           | Ambiente de execução             |
| `PORT`          | `3000`                  | Porta do servidor                |
| `HOST`          | `localhost`             | Host do servidor                 |
| `DATABASE_PATH` | `LoginSystem.db`        | Caminho do banco de dados SQLite |
| `CORS_ORIGIN`   | `http://localhost:5173` | Origem CORS permitida            |

### Frontend (se necessário)

| Variável       | Padrão                  | Descrição          |
| -------------- | ----------------------- | ------------------ |
| `VITE_API_URL` | `http://localhost:3000` | URL da API backend |

---

## 📂 Estrutura do Projeto

```
LoginSystem/
├── backend/                    # Servidor Express
│   ├── controllers/            # Lógica de negócio (planejado)
│   ├── routes/                 # Rotas da API (planejado)
│   ├── database/               # Configurações DB (planejado)
│   ├── server.js               # Entrada do servidor
│   ├── package.json
│   ├── .env.example
│   └── .env                    # ⚠️ NÃO fazer commit
│
├── login_system/               # App React + Vite
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   └── Input.jsx
│   │   ├── pages/              # Páginas (Login, Register, Dashboard)
│   │   ├── services/           # API calls (api.js)
│   │   ├── context/            # Context API (planejado)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                 # Assets estáticos
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── package.json                # Root (monorepo)
├── pnpm-workspace.yaml         # Configuração pnpm
└── README.md
```

---

## 🌐 Endpoints da API

### Registros de Usuário

#### `POST /register`

Cria um novo usuário no sistema.

**Request:**

```json
{
  "email": "usuario@exemplo.com",
  "senha": "senha_segura_123"
}
```

**Response (201):**

```json
{
  "id": 1
}
```

**Response (500):**

```json
{
  "error": "Descrição do erro"
}
```

#### `GET /`

Rota de teste para verificar se o servidor está rodando.

**Response:**

```
Backend funcionando 🚀
```

---

## 🔄 Fluxo de Autenticação

### Registro

1. Usuário preenche formulário de registro
2. Frontend valida os dados
3. Envia POST para `/register`
4. Backend valida email e senha
5. Normaliza email (toLowerCase + trim)
6. Verifica se email já existe
7. Criptografa a senha com bcrypt (10 salt rounds)
8. Insere usuário no banco SQLite
9. Retorna ID do usuário
10. Frontend redireciona para Login

### Login

1. Usuário preenche formulário de login
2. Frontend valida campos obrigatórios
3. Envia POST para `/login`
4. Backend normaliza email (toLowerCase + trim)
5. Busca usuário no banco
6. Compara senha com bcrypt
7. Retorna sucesso/erro
8. Frontend redireciona para Dashboard

---

## 🐛 Troubleshooting

### Erro: `EADDRINUSE` na porta 3000

```bash
# Linux/Mac: Encontrar processo na porta 3000
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: `Cannot find module 'dotenv'`

```bash
cd backend
pnpm add dotenv
```

### CORS Error

Verifique se `CORS_ORIGIN` em `.env` corresponde à URL do frontend.

### Banco de dados trava

Delete `LoginSystem.db` e reinicie o servidor (criará novo).

---

## 📚 Melhorias Futuras

### Autenticação & Segurança

- [ ] Autenticação com JWT
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Criptografia de dados sensíveis

### Funcionalidades

- [ ] Dashboard com dados do usuário
- [ ] Validação de email com regex
- [ ] Recuperação de senha por email
- [ ] Perfil do usuário (editar dados)
- [ ] Logout
- [ ] Sessão persistente (lembrar-me)

### UI/UX

- [ ] Loading states
- [ ] Animações de transição
- [ ] Validação visual inline
- [ ] Tema escuro (dark mode)

### Infraestrutura & DevOps

- [ ] Deploy (Vercel/Railway) — frontend
- [ ] Deploy (Render/Railway/Heroku) — backend
- [ ] Banco de dados em produção (PostgreSQL)
- [ ] Docker containers
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Logs e monitoramento
- [ ] Testes automatizados (Jest/Vitest)

---

## 🛠️ Script de Desenvolvedor

Comandos úteis:

```bash
# Instalar todas as dependências
pnpm install

# Rodar ambos em paralelo (em development)
pnpm run dev          # na raiz

# Formato e lint
pnpm run lint

# Build para produção
pnpm run build

# Preview da build
pnpm run preview
```

---

<div align="center">

## 📄 Licença

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

</div>

---

<div align="center">

## 👨‍💻 Desenvolvedor

Desenvolvido por [EduzzDev](https://github.com/EduzzDev)

---

⭐️ _Se este projeto foi útil, considere dar uma estrela!_ ⭐️

</div>
