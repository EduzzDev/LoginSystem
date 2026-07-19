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
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br/>

> Sistema moderno de autenticação com frontend em React e backend em Node.js/Express, com login, cadastro, sessões seguras e dashboard protegido.

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento%20Ativo-blue.svg)](#-status-do-projeto)

</div>

---

## 📌 Status do projeto

Este projeto está em desenvolvimento ativo e segue uma evolução em etapas claras.

### 🟢 Estágio atual

- Status: Em desenvolvimento ativo
- Fase: MVP funcional
- Nível de maturidade: intermediário

### ✅ O que já funciona

- Cadastro e login de usuários
- Criptografia de senha com bcrypt
- Autenticação via JWT em cookies HTTP-only
- Rotas protegidas e estrutura inicial da dashboard
- Páginas de Security e Help já em desenvolvimento
- Página de Tasks em fase avançada, com a parte de expiration date ainda sendo ajustada
- Página de MyProfile sendo organizada como parte do fluxo do usuário
- Interface inicial com navegação por sidebar
- Validação de formulário e tratamento de erros

### ⏳ O que ainda está sendo pensado ou implementado

- Finalizar a lógica de expiration date na página Tasks
- Completar o layout e fluxo da página MyProfile
- Refinar a dashboard como uma visão geral do sistema
- Melhorias de UX e acessibilidade
- Testes automatizados e cobertura
- Tema escuro e responsividade completa

### 🧭 Guia de estágio

| Fase   | Status          | Objetivo                                         |
| ------ | --------------- | ------------------------------------------------ |
| Fase 1 | ✅ Concluída    | Estrutura base do sistema e autenticação inicial |
| Fase 2 | ✅ Concluída    | Login, registro, proteção de rotas e dashboard   |
| Fase 3 | 🔄 Em andamento | Melhorias de experiência e segurança             |
| Fase 4 | ⏭️ Planejada    | Expansão para produção e recursos avançados      |

---

## ⚡ Comece rapidamente

```bash
git clone https://github.com/EduzzDev/LoginSystem.git
cd LoginSystem
pnpm install
```

### Rodar o backend

```bash
cd backend
pnpm dev
```

### Rodar o frontend

```bash
cd login_system
pnpm dev
```

Acesse o app em http://localhost:5173 e a API em http://localhost:3000.

---

## 🧰 Tecnologias

| Camada   | Tecnologia    | Função                      |
| -------- | ------------- | --------------------------- |
| Frontend | React         | Interface do usuário        |
| Frontend | Vite          | Ambiente de desenvolvimento |
| Frontend | Tailwind CSS  | Estilização                 |
| Frontend | React Router  | Navegação                   |
| Backend  | Node.js       | Runtime do servidor         |
| Backend  | Express       | API REST                    |
| Backend  | SQLite        | Banco de dados local        |
| Backend  | bcrypt        | Hash de senhas              |
| Backend  | jsonwebtoken  | Autenticação JWT            |
| Backend  | cookie-parser | Gerenciamento de cookies    |

---

## ✨ Funcionalidades principais

- Página de login e cadastro
- Armazenamento seguro de usuários no banco SQLite
- Validação de email e senha
- Sessões protegidas com JWT
- Dashboard geral como visão central do sistema
- Páginas de Security e Help em desenvolvimento
- Página de Tasks avançada, com ajuste final na expiration date
- Página de MyProfile para gerenciamento do perfil do usuário
- Navegação com sidebar e layout moderno
- Tratamento de erros e feedback visual

---

## 📂 Estrutura do projeto

```text
LoginSystem/
├── backend/           # API Express
├── login_system/      # App React + Vite
├── README.md          # Documentação principal
└── pnpm-workspace.yaml
```

---

## 🔧 Como rodar localmente

### 1. Instale as dependências

```bash
pnpm install
```

### 2. Configure o ambiente

Crie um arquivo .env no backend com base no exemplo disponível na pasta backend.

### 3. Inicie os serviços

```bash
# Terminal 1
cd backend
pnpm dev

# Terminal 2
cd login_system
pnpm dev
```

---

## 🌐 Endpoints principais

### POST /register

Cria um novo usuário.

### POST /login

Realiza autenticação e gera sessão.

### GET /

Verifica se o backend está funcionando.

---

## 🛣️ Próximos passos

- Adicionar recuperação de senha
- Implementar perfil do usuário
- Melhorar a segurança com refresh token e rate limiting
- Criar testes de integração e automação
- Evoluir para uma experiência mais completa e profissional

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

Desenvolvido por Eduardo.
