# 🔐 Login System

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/EduzzDev/LoginSystem?style=social)](https://github.com/EduzzDev/LoginSystem/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/EduzzDev/LoginSystem?style=social)](https://github.com/EduzzDev/LoginSystem/network)
[![GitHub issues](https://img.shields.io/github/issues/EduzzDev/LoginSystem)](https://github.com/EduzzDev/LoginSystem/issues)
[![Last commit](https://img.shields.io/github/last-commit/EduzzDev/LoginSystem)](https://github.com/EduzzDev/LoginSystem/commits/main)

<br/>

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

---

## ⚡ Quick Start

```bash
# Clone o projeto
git clone https://github.com/EduzzDev/LoginSystem.git
cd LoginSystem

# Instale as dependências (monorepo)
pnpm install

# Inicie o backend (Terminal 1)
cd backend && pnpm dev

# Inicie o frontend (Terminal 2)
cd login_system && pnpm dev
```

> ⏩ Pronto! Acesse `http://localhost:5173` no seu navegador.

---

## 📋 Sumário

- [⚡ Quick Start](#-quick-start)
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

| Camada      | Tecnologia     | Descrição              |
| ----------- | -------------- | ---------------------- |
| 🖥️ Frontend | React          | UI Library             |
| ⚡ Frontend | Vite           | Build tool rápido      |
| 🎨 Frontend | TailwindCSS    | Styling                |
| 🌐 Frontend | Axios          | HTTP requests          |
| 🖥️ Backend  | Node.js        | Runtime                |
| 🌐 Backend  | Express.js     | Web framework          |
| 💾 Backend  | better-sqlite3 | Database SQLite        |
| 🔐 Backend  | bcrypt         | Criptografia de senhas |
| 🌐 Backend  | jsonwebtoken   | Autenticação JWT       |
| ⚙️ Backend  | dotenv         | Variáveis de ambiente  |

---

## 📌 Funcionalidades

### ✅ Implementadas

- ✨ Página de registro e login de usuários
- 🔐 Criptografia de senhas com bcrypt (salt rounds: 10)
- 💾 Persistência de dados em SQLite via better-sqlite3
- 🚀 API REST com Express
- 🌐 CORS configurado para frontend local e ambientes de produção (Render + Vercel)
- 🍪 Cookies httpOnly com configurações seguras (secure: true, sameSite: none)
- 🛡️ Variáveis de ambiente para segurança
- 🎨 Componente Input reutilizável
- 🔁 Componente AuthSwitchLink para alternar entre login e cadastro
- ♻️ Refatoração dos formulários com componentes reutilizáveis no frontend
- 📝 Sistema de login com validação
- 🔐 Normalização de email (toLowerCase + trim)
- ⚠️ Tratamento de erros no frontend e backend
- 🔑 Autenticação backend com JWT + cookie httpOnly
- 🧾 Rota /dashboard protegida por token
- 📧 Validação de email com regex - validação de formato de email
- 📄 Arquivo .env.example - template para variáveis de ambiente
- 🚪 Logout com limpeza de cookies e contexto de autenticação
- 👤 Dashboard com dados do usuário (nome e tempo logado)
- ⏱️ Contador de tempo logado exibido para o usuário
- 🔗 Sidebar com navegação (PC) com items com hover e estado ativo
- 🎯 Header de navegação melhorado com design responsivo

### 🚧 Planejadas

- 🔄 Refresh tokens
- 🔐 Recuperação de senha
- 👤 Perfil do usuário (editar dados)
- 📱 Responsividade completa (mobile/tablet)
- 🎨 Tema escuro (dark mode)

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

| Variável        | Padrão                  | Descrição                                 |
| --------------- | ----------------------- | ----------------------------------------- |
| `NODE_ENV`      | `development`           | Ambiente de execução                      |
| `PORT`          | `3000`                  | Porta do servidor                         |
| `HOST`          | `localhost`             | Host do servidor                          |
| `DATABASE_PATH` | `LoginSystem.db`        | Caminho do banco de dados SQLite          |
| `CORS_ORIGIN`   | `http://localhost:5173` | Origem CORS permitida (ou URLs de deploy) |
| `CLIENT_URL`    | `http://localhost:5173` | URL do frontend para cookies              |

### Frontend

| Variável        | Padrão                  | Descrição            |
| --------------- | ----------------------- | -------------------- |
| `VITE_API_URL`  | `http://localhost:3000` | URL da API backend   |
| `VITE_BASE_URL` | `/`                     | URL base para deploy |

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

Verifique se `CORS_ORIGIN` em `.env` corresponde à URL do frontend. Em produção, adicione as URLs de deploy (ex: vercel.app, render.com).

### Cookies não funcionam em produção

Certifique-se de que:

- `secure: true` está configurado
- `sameSite: 'none'` está definido
- Protocolo é HTTPS em produção
- `CLIENT_URL` corresponde à URL do frontend

### Banco de dados trava

Delete `LoginSystem.db` e reinicie o servidor (criará novo).

---

## � Deployment

### Frontend - Vercel

O frontend está configurado para deploy automático no Vercel:

```bash
# Arquivo: vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Deploy:** `https://seu-dominio.vercel.app`

### Backend - Render

O backend está hospedado no Render com as seguintes configurações:

- **URL:** `https://seu-backend.onrender.com`
- **CORS:** Configurado para aceitar requisições da Vercel
- **Cookies:** Configurados com `secure: true` e `sameSite: 'none'`

**Variáveis de Ambiente em Produção:**

```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-dominio.vercel.app
CLIENT_URL=https://seu-dominio.vercel.app
```

---

## 📚 Melhorias Futuras

### Autenticação & Segurança

- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Proteção contra CSRF
- [ ] 2FA (autenticação de dois fatores)

### Funcionalidades

- [ ] Recuperação de senha por email
- [ ] Perfil do usuário (editar dados)
- [ ] Sessão persistente (lembrar-me)
- [ ] Notificações em tempo real

### UI/UX

- [ ] Loading states
- [ ] Animações de transição
- [ ] Validação visual inline
- [ ] Tema escuro (dark mode)
- [ ] Responsividade completa (mobile/tablet)

### Infraestrutura & DevOps

- [ ] Banco de dados em produção (PostgreSQL)
- [ ] Docker containers
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Logs e monitoramento
- [ ] Testes automatizados (Jest/Vitest)
- [ ] Backup automático de dados

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
