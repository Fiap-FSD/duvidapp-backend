<p align="center">
  <img src="https://github.com/Fiap-FSD/tech-2/blob/development/src/pos-tech.png" width="400" /></a>
</p>

<p align="center">
  <img src="https://github.com/Fiap-FSD/tech-2/blob/development/Fiap-logo.jpg" width="300" /></a>
</p>

# ✨ Refatoração do Back-End do Blog Post

Este documento descreve o processo de desenvolvimento do refatoramento da parte Back-End do blog post. A aplicação foi inicialmente desenvolvida utilizando a plataforma OutSystems. Para esta nova etapa, o back-end da aplicação foi refatorado utilizando Node.js, utilizando o framkework NestJS, REST APIs, GitHub, Docker e MongoDB para persistência de dados.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## 🎯 Objetivos do Projeto

- Refatorar o back-end da aplicação de blogging para professores, e alunos, utilizando Node.js.
- Implementação de uma API RESTful com endpoints definidos para a criação, leitura, edição, exclusão e busca de postagens.
- Utilizar MongoDB como banco de dados para persistência dos dados.
- Utilizar Docker para garantir consistência, escalabilidade e facilitar o deploy do projeto.

## 🛠️ Ferramentas Utilizadas

A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

- **Visual Studio Code**: Ferramenta utilizada para escrita e execução de código, com extensões específicas para JavaScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

- **GitHub**: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência. O GitHub também integrou ferramentas de CI/CD, automatizando testes e o deploy do código.

- **MongoDB**: O banco de dados NoSQL foi escolhido por sua flexibilidade e integração com Node.js através de bibliotecas como o Mongoose, permitindo uma maneira dinâmica de armazenar dados.

- **Docker**: O Docker permitiu o empacotamento da aplicação e suas dependências em contêineres, garantindo consistência entre os ambientes de desenvolvimento e produção. O Docker Hub foi utilizado para armazenar e compartilhar as imagens dos contêineres.

- **Render**: Foi utilizado o Render como plataforma de hospedagem, o que simplificou o processo de deploy e gerenciamento da aplicação. O Render forneceu uma infraestrutura que permitiu que a equipe se concentrasse no desenvolvimento, sem se preocupar com a administração de servidores. O uso do Render foi fundamental para otimizar o fluxo de trabalho, garantindo agilidade no deploy e confiabilidade na execução da aplicação.


## 🏗️ Arquitetura da Aplicação

A arquitetura do projeto segue o padrão de **API RESTful**, que permite interações simples e claras entre o cliente e o servidor. A principal divisão da aplicação é composta por:

- **NestJS**: Framework para o desenvolvimento do back-end, que organiza o código em módulos e controladores, facilitando a manutenção, escalabilidade e reutilização de componentes.
- **MongoDB**: Banco de dados NoSQL utilizado para persistir as postagens e informações de usuários de forma flexível.
- **Docker**: Utilizado para empacotar a aplicação e suas dependências, garantindo consistência entre os ambientes de desenvolvimento e produção.
- **Render**: Plataforma de hospedagem utilizada para o deploy da aplicação, permitindo o gerenciamento simplificado de servidores e escalabilidade.

A arquitetura segue o padrão **NestJS**, organizada em **Controller, Providers, Modules**, com:

- **Controller**: Responsável pelo processamento das requisições HTTP e retorno de uma resposta para o client.
- **Providers**: São classes que executam a lógica central da aplicação. Podem ser de vários tipos de classes, como services, repositories e helpers.
- **Modules**: Organizam a aplicação de maneira modular e registram os componentes que ela utiliza. E cada módulo gerencia um conjunto específico de responsabilidades e pode importar ou exportar outros módulos para compartilhar funcionalidades.
  

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js instalado (versão recomendada: 16.x ou superior).
- Docker instalado.
- MongoDB rodando localmente ou utilizando uma instância em nuvem.

### Passos:

#### Clone este repositório:

```bash
git clone https://github.com/Fiap-FSD/tech-2.git
cd blog-posts
```

#### Configure o ambiente:

Crie um arquivo `.env` na raiz do projeto e insira nele:

```bash
PORT=3000
API_SECRET=batman
MONGO_URI=mongodb+srv://fiapfsd:SDHdwwa1MNK4GObi@blogposts.faa90.mongodb.net/?retryWrites=true&w=majority&appName=BlogPosts
```

#### Rodando no Docker:

Para construir e rodar a aplicação com Docker, utilize os seguintes comandos:

- Verifique o docker e docker compose

```bash
docker --version
docker-compose --version
```
- Construa e inicie os conteiners

```bash
docker-compose build
docker-compose up
```

## 🌐 APIs

Utilizar APIs para criar o backend de um sistema de blog post oferece uma série de vantagens que tornam a aplicação mais escalável, flexível e fácil de manter. Abaixo são apresentadas as requisições utilizadas pelo grupo: 

#### URL

A URL base para todas as requisições da API é a seguinte:

```http
  https://blog-post-hori.onrender.com/
```

#### Manual da API

As URLs do manual da API são as seguintes:

```http
  https://blog-post-hori.onrender.com/api
```

```http
  https://blog-post-hori.onrender.com/docs
```

- ##### AuthController_login - Utilizado para autenticar usuário

Este endpoint é utilizado para realizar o login de um usuário já cadastrado e obter o token necessário para realizar operações protegidas (como **POST**, **PUT** e **DELETE**) na API.  

```http
  POST URL/auth/login
```

- ##### AuthController_register - Utilizado para criar usuário

Este endpoint é utilizado para criar um novo usuário no sistema. Ele recebe o email e senha (criptografada) do usuário e cria um registro no banco de dados.

```http
  POST URL/auth/register
```

- ##### PostController_getAllPost - Obter todas as postagens

Este endpoint é utilizado para obter todas as postagens do blog. Ele retorna uma lista completa de posts armazenados no banco de dados.

```http
  GET URL/post/
```

- #####  PostController_searchPosts - Buscar postagens

Este endpoint é utilizado para realizar uma pesquisa por posts com base em um critério específico (título ou conteúdo).

```http
  GET URL/post/search/id
```

- ##### PostController_getPostById - Obter postagem específica

Este endpoint é utilizado para recuperar uma postagem específica com base no ID fornecido.

```http
  GET URL/post/id
```

- ##### PostController_createPost - Criar nova postagem

Este endpoint é utilizado para criar uma nova postagem no blog.

```http
  POST URL/post
```

- ##### PostController_updatePost - Editar postagem existente

Este endpoint é utilizado para editar uma postagem existente, fornecendo o ID da postagem a ser atualizada.

```http
  PUT URL/post/id
```

- ##### PostController_deletePost - Excluir postagem

Este endpoint é utilizado para excluir uma postagem do blog.

```http
  DELETE URL/post/id
```
## 🎥 Vídeo do Projeto
👉 **[Link para o vídeo](https://youtu.be/ILa9iL7bAOs)**  

## 📜 Conclusão

A refatoração do back-end do Blog Post trouxe melhorias significativas, tornando o sistema mais moderno, escalável e fácil de manter. A migração da plataforma OutSystems para uma arquitetura baseada em NestJS, REST APIs e MongoDB foi um grande avanço, proporcionando mais flexibilidade e controle no desenvolvimento.

O uso de Docker e GitHub facilitou o gerenciamento do código e a colaboração entre os desenvolvedores, além de garantir consistência nos diferentes ambientes. As APIs RESTful ajudaram a separar o front-end do back-end, o que trouxe agilidade e facilitou a integração com outras plataformas.

No entanto, o desenvolvimento não foi isento de desafios. A vinculação de várias tecnologias como Docker, MongoDB e Node.js exigiu um cuidado especial para garantir que todos os componentes funcionassem de forma integrada. A configuração do MongoDB e a criação de um ambiente Docker compatível com o sistema foram algumas das dificuldades encontradas, exigindo ajustes contínuos. Apesar desses desafios, a refatoração resultou em uma aplicação mais robusta e bem estruturada.

