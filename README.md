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

> Sistema moderno de autenticação com interface elegante, rotas protegidas e uma experiência de usuário em evolução.

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento%20Ativo-blue.svg)](#-status-do-projeto)

</div>

---

## ✨ Visão geral

Este projeto nasceu como uma aplicação completa de autenticação, mas está evoluindo para algo mais completo: uma experiência com dashboard, páginas internas e um fluxo mais organizado para o usuário.

### 🌟 Destaques do projeto

- Autenticação segura com JWT e cookies HTTP-only
- Interface moderna com React e Vite
- Estrutura organizada em frontend e backend
- Dashboard como ponto central do sistema
- Páginas em desenvolvimento com foco em usabilidade e evolução

---

## 🚀 Status do projeto

> O projeto está em desenvolvimento ativo e segue uma evolução clara em fases.

### ✅ O que já está sólido

- Cadastro e login de usuários
- Criptografia de senha com bcrypt
- Autenticação protegida com JWT
- Estrutura inicial da dashboard
- Navegação por sidebar e páginas internas
- Validação de formulário e tratamento de erros

### 🛠️ O que está sendo trabalhado

- Página Tasks quase concluída, com ajuste final na expiration date
- Página MyProfile sendo organizada para o fluxo do usuário
- Página Security em desenvolvimento
- Página Help sendo refinada
- Dashboard geral sendo transformada em uma visão central do sistema

### 🧭 Guia de etapas

| Fase   | Status          | Objetivo                                             |
| ------ | --------------- | ---------------------------------------------------- |
| Fase 1 | ✅ Concluída    | Estrutura base do sistema e autenticação inicial     |
| Fase 2 | ✅ Concluída    | Login, registro, proteção de rotas e dashboard       |
| Fase 3 | 🔄 Em andamento | Refinar páginas internas e experiência do usuário    |
| Fase 4 | ⏭️ Planejada    | Expandir para produção com mais segurança e recursos |

---

## 🧩 Páginas principais em evolução

- Security — foco em organização e acesso seguro
- Help — conteúdo e experiência de suporte
- Tasks — quase pronta, com detalhe de expiration date sendo ajustado
- MyProfile — visão do perfil do usuário
- Dashboard — painel geral como centro da aplicação

---

## ⚡ Como rodar rapidamente

```bash
git clone https://github.com/EduzzDev/LoginSystem.git
cd LoginSystem
pnpm install
```

### Backend

```bash
cd backend
pnpm dev
```

### Frontend

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

## 🌈 Funcionalidades principais

- Login e cadastro com fluxo fluido
- Armazenamento seguro de usuários no banco SQLite
- Sessões protegidas com JWT
- Dashboard geral como visão central do sistema
- Páginas internas em desenvolvimento para uma experiência mais completa
- Navegação moderna e layout limpo

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

## 🛣️ Próximos passos

- Finalizar a lógica da expiration date em Tasks
- Completar MyProfile e refiná-lo visualmente
- Melhorar a dashboard como painel geral
- Fortalecer a segurança com melhorias adicionais
- Evoluir a experiência para um produto mais completo

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

Desenvolvido por Eduardo.
