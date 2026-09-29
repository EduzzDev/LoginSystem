# 🔐 Login System

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/EduzzDev/LoginSystem?style=social)](https://github.com/EduzzDev/LoginSystem/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/EduzzDev/LoginSystem?style=social)](https://github.com/EduzzDev/LoginSystem/network)
[![GitHub issues](https://img.shields.io/github/issues/EduzzDev/LoginSystem)](https://github.com/EduzzDev/LoginSystem/issues)
[![Last commit](https://img.shields.io/github/last-commit/EduzzDev/LoginSystem)](https://github.com/EduzzDev/LoginSystem/commits/main)

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br/>

> Aplicação web de autenticação e gestão de conta, com dashboard, tarefas, perfil, segurança de sessões e central de ajuda.

[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](#-licença)
[![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-blue.svg)](#-estado-atual)

</div>

---

## ✨ Visão geral

O Login System é uma aplicação full-stack dividida entre um frontend React e uma API Node.js. O utilizador pode criar uma conta, iniciar sessão, gerir os seus dados, acompanhar as sessões ativas e utilizar ferramentas internas de organização.

O projeto está em desenvolvimento e serve também como base para evoluir uma experiência completa de autenticação e gestão de utilizadores.

## 🧰 Tecnologias utilizadas

### Frontend

- React 19 e React DOM
- Vite 8
- React Router DOM 7
- Tailwind CSS 4, PostCSS e Autoprefixer
- Material UI e Emotion
- Lucide React e Material Icons
- React Hot Toast
- Socket.IO Client

### Backend

- Node.js com módulos ES
- Express 5
- `better-sqlite3` para persistência local
- `bcrypt` para hash de passwords
- `jsonwebtoken` para autenticação e recuperação de password
- `cookie-parser` e cookies HTTP-only
- `cors` para comunicação entre frontend e API
- `multer` para upload de imagens de perfil
- Socket.IO para eventos de sessão
- EmailJS para envio de links de recuperação
- `dotenv` para configuração por variáveis de ambiente
- `ua-parser-js` para identificar o navegador e o sistema operativo das sessões

## 🌈 Funcionalidades principais

- Registo de utilizadores com validação de nome, email e password.
- Login com JWT, cookie HTTP-only e sessão associada ao dispositivo.
- Rotas protegidas para dashboard e páginas internas.
- Dashboard com navegação para as áreas principais da aplicação.
- Gestão de tarefas com criação, edição, data, prioridade e conclusão.
- Persistência das tarefas no `localStorage` do navegador.
- Consulta e edição do perfil, incluindo nome, cargo, email, password e imagem.
- Página de segurança com sessões ativas, informação do dispositivo e histórico de atividade.
- Revogação de sessões individuais, com atualização em tempo real através de Socket.IO.
- Recuperação de password através de link enviado por EmailJS e token com validade de uma hora.
- Central de ajuda com perguntas frequentes e orientações para problemas de acesso.
- Interface responsiva com navegação lateral em desktop e drawer mobile.
- Notificações de sucesso, carregamento e erro através de React Hot Toast.

## 🗺️ Páginas disponíveis

| Rota | Página | Acesso |
| --- | --- | --- |
| `/` | Login | Público |
| `/register` | Registo | Público |
| `/forgot` | Recuperação/alteração de password | Público, com token para redefinição |
| `/dashboard` | Dashboard | Protegido |
| `/tasks` | Gestão de tarefas | Protegido |
| `/myProfile` | Perfil do utilizador | Protegido |
| `/security` | Segurança e sessões | Protegido |
| `/help` | Central de ajuda | Protegido |

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js compatível com as dependências instaladas.
- pnpm 10 ou superior, conforme definido nos manifestos do projeto.
- Credenciais do EmailJS se o fluxo de recuperação de password for utilizado.

### 1. Clonar o repositório

```bash
git clone https://github.com/EduzzDev/LoginSystem.git
cd LoginSystem
```

### 2. Instalar as dependências

O backend e o frontend são pacotes independentes. Instale cada um no respetivo diretório:

```bash
cd backend
pnpm install

cd ../login_system
pnpm install
```

### 3. Configurar o backend

Crie `backend/.env` e preencha as variáveis necessárias:

```env
NODE_ENV=development
PORT=3000
DATABASE_PATH=LoginSystem.db
JWT_SECRET=uma-chave-secreta-para-sessoes
JWT_RESET_SECRET=uma-chave-secreta-para-reset
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
```

`DATABASE_PATH` e `PORT` são opcionais, mas `JWT_SECRET` é necessário para login e sessões. As quatro variáveis `EMAILJS_*` são necessárias para o envio de links de recuperação.

### 4. Iniciar a aplicação

Abra dois terminais na raiz do projeto.

**Backend**

```bash
cd backend
pnpm dev
```

**Frontend**

```bash
cd login_system
pnpm dev
```

Por defeito, o frontend fica disponível em [http://localhost:5173](http://localhost:5173) e a API em [http://localhost:3000](http://localhost:3000).

### Scripts disponíveis

No frontend:

```bash
pnpm dev       # inicia o servidor Vite
pnpm build     # gera a versão de produção
pnpm preview   # pré-visualiza o build de produção
pnpm lint      # executa o ESLint
```

No backend:

```bash
pnpm dev       # inicia a API com Node.js
pnpm start     # inicia a API
```

## 📂 Estrutura do projeto

```text
LoginSystem/
├── backend/
│   ├── database/       # Recursos relacionados com a base de dados
│   ├── routes/         # Autenticação, perfil, sessões e reset de password
│   ├── uploads/        # Imagens de perfil carregadas
│   ├── server.js       # API Express e servidor HTTP
│   └── socket.js       # Configuração do Socket.IO
├── login_system/
│   ├── public/         # Recursos públicos
│   └── src/
│       ├── components/ # Componentes reutilizáveis
│       ├── context/    # Estado global de autenticação
│       ├── pages/      # Páginas da aplicação
│       └── services/   # Comunicação com a API e Socket.IO
├── package.json
└── README.md
```

## 🖼️ Pré-visualização

As capturas de ecrã podem ser adicionadas nesta secção à medida que a interface for finalizada:

```markdown
![Login](docs/screenshots/login.png)
![Dashboard](docs/screenshots/dashboard.png)
![Gestão de tarefas](docs/screenshots/tasks.png)
```

## 🔐 Notas de segurança e configuração

- Nunca publique `backend/.env`, tokens ou chaves privadas no repositório.
- Em desenvolvimento, o backend aceita o frontend em `http://localhost:5173`.
- Em produção, reveja as origens CORS e os domínios definidos em `backend/server.js`.
- A base de dados SQLite e a pasta `uploads/` são criadas/utilizadas pelo backend localmente.

## 🚧 Estado atual

As funcionalidades principais de autenticação, perfil, tarefas, segurança e ajuda já estão representadas no frontend. O projeto continua em desenvolvimento, sobretudo no refinamento visual, na robustez da configuração de produção e na evolução das funcionalidades internas.

## 📄 Licença

O projeto declara a licença ISC nos manifestos `package.json`.

## 👨‍💻 Autor

Desenvolvido por Eduardo.
