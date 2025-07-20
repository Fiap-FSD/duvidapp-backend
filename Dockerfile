# ---- ESTÁGIO 1: Build ----
# Usamos uma imagem Node completa para instalar todas as dependências (incluindo as de desenvolvimento)
# e compilar o código TypeScript para JavaScript.
FROM node:18-alpine AS builder

# Instala pacotes necessários para compilar dependências nativas, se houver.
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copia os arquivos de definição do projeto e instala TODAS as dependências
COPY package*.json ./
RUN npm install

# Copia todo o resto do código fonte
COPY . .

# Executa o build de produção, que cria a pasta /dist
RUN npm run build


# ---- ESTÁGIO 2: Produção ----
# Começamos com uma imagem limpa e leve para a versão final.
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia os arquivos de definição do projeto
COPY package*.json ./

# Instala SOMENTE as dependências de PRODUÇÃO. Isso ignora devDependencies e deixa a imagem final menor.
RUN npm install --production

# Copia a pasta 'dist' (com o código já compilado) do estágio de build
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Comando final para iniciar a aplicação em MODO DE PRODUÇÃO.
# Ele executa o JavaScript compilado diretamente com o Node.
CMD ["node", "dist/main"]