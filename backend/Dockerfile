
FROM node:22-bookworm-slim

# Dependências para compilar módulos nativos, como better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Ativar pnpm
RUN corepack enable

# Copiar manifestos primeiro
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar o restante do backend
COPY . .

# Criar diretório de uploads
RUN mkdir -p uploads

EXPOSE 3000

CMD ["pnpm", "dev"]
