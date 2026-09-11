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

> Sistema moderno de autenticação com interface elegante, rotas protegidas, gerenciamento de perfil e uma experiência de usuário em evolução.

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento%20Ativo-blue.svg)](#-status-do-projeto)

</div>

---

## ✨ Visão geral

Este projeto nasceu como uma aplicação completa de autenticação e está evoluindo para algo mais completo: uma experiência com dashboard, gerenciamento de perfil, páginas internas e recursos de segurança.

### 🌟 Destaques do projeto

- Autenticação com JWT e cookies HTTP-only
- Interface moderna com React e Vite
- Estrutura organizada em frontend e backend
- Dashboard como ponto central do sistema
- Gerenciamento de perfil e imagem do usuário
- Verificação de senha para alterações sensíveis
- Sistema de notificações com toast
- Fluxo de recuperação de senha com envio de link e redefinição
- Página de segurança com painel de sessões e histórico de atividades
- Melhorias de layout responsivo e drawer mobile para navegação

---

## 🚀 Status do projeto

> O projeto está em desenvolvimento ativo e segue uma evolução clara em fases.

### ✅ O que já está sólido

- Cadastro e login de usuários
- Criptografia de senha com bcrypt
- Autenticação protegida com JWT
- Cookies HTTP-only para autenticação
- Estrutura da dashboard
- Navegação por sidebar e páginas internas
- Validação de formulário e tratamento de erros
- Notificações de login, registro e logout
- Gerenciamento de perfil
- Upload e exibição de imagem de perfil
- Verificação da senha atual antes de alterações sensíveis no perfil
- Página Security com painel de segurança da conta e histórico de atividades
- Fluxo de recuperação de senha com envio de link, reset e validação de token
- Layout responsivo com drawer inferior para mobile e refinamento de UX

### 🛠️ O que está sendo trabalhado

- Finalização visual e funcional da página Tasks
- Refinamento final do MyProfile e dos componentes de entrada
- Evolução da página Security para incluir gestão real de sessões e ações de conta
- Página Help em desenvolvimento com conteúdo e suporte mais completo
- Dashboard sendo transformada em painel central do sistema
- Ajustes finais de segurança e UX no fluxo de recuperação de senha

### 🔄 Melhorias recentes adicionadas desde o último README

- Painel de segurança da conta com blocos de proteção, sessões ativas e histórico de atividades
- Redefinição de senha via link enviado por e-mail e validação de token JWT
- Melhorias de responsividade em MyProfile, Tasks, Dashboard e páginas internas
- Drawer mobile inferior para navegação rápida em telas menores
- Botões de voltar e refinamento visual em modais e fluxos de edição
- Ícones e componentes de input mais consistentes em formulários de perfil

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
- Tasks — gerenciamento e organização de tarefas
- MyProfile — gerenciamento do perfil e imagem do usuário
- Dashboard — painel geral como centro da aplicação

---

## 🔐 Autenticação e segurança

O sistema utiliza diferentes recursos para proteger as contas e operações dos usuários:

- JWT para autenticação
- Cookies HTTP-only
- Hash de senhas com bcrypt
- Rotas protegidas
- Verificação da senha atual para alterações sensíveis no perfil
- Validação e expiração de tokens para redefinição de senha
- Painel de segurança da conta com visão geral de proteção e sessões ativas
- Variáveis de ambiente para informações sensíveis

### 📧 Recuperação de senha

O fluxo de recuperação de senha já está funcional em boa parte do processo e atualmente conta com:

- Link "Forgot password?" na tela de login
- Modal e rota para solicitar recuperação
- Rota dedicada para redefinição de senha
- Tokens JWT com expiração e validação de segurança
- Envio de link por e-mail via EmailJS / SMTP
- Processo de atualização de senha com confirmação de nova senha

> 🚧 O fluxo continua em refinamento, mas a base de autenticação e reset já foi implementada e integrada ao app.

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
| Frontend | Axios         | Comunicação com a API       |
| Frontend | React Hot Toast | Notificações               |
| Frontend | Lucide React  | Ícones da interface         |
| Frontend | Material UI   | Componentes de interface    |
| Backend  | Node.js       | Runtime do servidor         |
| Backend  | Express       | API REST                    |
| Backend  | SQLite        | Banco de dados local        |
| Backend  | bcrypt        | Hash de senhas              |
| Backend  | jsonwebtoken  | Autenticação e tokens       |
| Backend  | cookie-parser | Gerenciamento de cookies    |
| Backend  | multer        | Upload de arquivos          |
| Backend  | dotenv        | Variáveis de ambiente      |
| Backend  | Nodemailer    | Envio de e-mails            |

---

## 🌈 Funcionalidades principais

- Login e cadastro com fluxo fluido
- Armazenamento de usuários no banco SQLite
- Hash de senhas com bcrypt
- Sessões protegidas com JWT
- Cookies HTTP-only
- Dashboard geral como visão central do sistema
- Gerenciamento de perfil
- Upload e atualização de imagem de perfil
- Verificação de senha para alterações sensíveis
- Página Security com gestão de segurança e histórico de atividades
- Recuperação de senha por email com token e redefinição
- Notificações de sucesso e erro
- Interface responsiva com melhorias mobile e drawer inferior
- Fluxo de navegação mais refinado em páginas internas

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
- Completar e refinar MyProfile
- Finalizar o fluxo de recuperação de senha
- Melhorar a dashboard como painel geral
- Fortalecer a segurança com melhorias adicionais
- Evoluir a experiência para um produto mais completo

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

Desenvolvido por Eduardo.
