<h1 align="center">📊 Sales Dashboard</h1>

<p align="center">
  Aplicação fullstack de análise de vendas com gráficos interativos, construída com Spring Boot e React.
</p>

<p align="center">
  <img alt="Java" src="https://img.shields.io/badge/Java-11-007396?style=for-the-badge&logo=openjdk&logoColor=white">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-2.x-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-17-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge">
</p>

<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-demonstração">Demonstração</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-stack">Stack</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-arquitetura">Arquitetura</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-deploy">Deploy</a>&nbsp;&nbsp;•&nbsp;
  <a href="#-licença">Licença</a>
</p>

---

## 💡 Sobre

**Sales Dashboard** é uma aplicação fullstack que exibe métricas e análises de performance de vendas em tempo real. O backend expõe uma API REST construída com Spring Boot que alimenta um frontend React com gráficos interativos — permitindo visualizar taxa de sucesso por vendedor, total de vendas por mês e desempenho geral da equipe comercial.

O projeto cobre o ciclo completo de uma aplicação moderna: API REST com paginação, consumo de dados no frontend com Axios, gráficos com Apex Charts, deploy do backend no Railway e do frontend no Netlify.

---

## ✅ Funcionalidades

- 📈 **Gráfico de barras** — total de vendas por mês com dados históricos
- 🥧 **Gráfico de pizza** — taxa de sucesso por vendedor (vendas realizadas vs. visitadas)
- 📋 **Tabela paginada** — listagem de vendas com nome do vendedor, data e valor
- 🔄 **API REST** — endpoints com paginação e ordenação via Spring Data JPA
- 🐳 **Docker** — containerização do backend para facilitar o setup local e o deploy
- ☁️ **Deploy em nuvem** — Railway (backend) + Netlify (frontend)

---

## 🎨 Demonstração

> **🔗 [Acesse o deploy ao vivo →](https://michelspirlandeli-dsvendas.netlify.app/)**

![Dashboard de vendas](./frontend/src/assets/img/dashboard.png)

---

## 🛠 Stack

### Backend
| Tecnologia | Versão | Papel |
|---|---|---|
| Java | 11 | Linguagem base |
| Spring Boot | 2.x | Framework principal |
| Spring Data JPA | — | Persistência e repositórios |
| H2 Database | — | Banco em memória para desenvolvimento |
| Maven | — | Gerenciador de dependências |
| Docker | — | Containerização |

### Frontend
| Tecnologia | Versão | Papel |
|---|---|---|
| React | 17 | Biblioteca de UI |
| TypeScript | 4.x | Tipagem estática |
| Axios | — | Requisições HTTP |
| ApexCharts | — | Gráficos interativos |
| Bootstrap | — | Estilização base |

### Infraestrutura
| Serviço | Uso |
|---|---|
| Railway | Deploy do backend Spring Boot |
| Netlify | Deploy do frontend React |

---

## 🏗 Arquitetura

```
sales-dashboard/
├── backend/                  # API REST - Spring Boot
│   ├── src/main/java/
│   │   └── com/devsuperior/dsvendas/
│   │       ├── controllers/  # Endpoints REST
│   │       ├── dto/          # Objetos de transferência de dados
│   │       ├── entities/     # Entidades JPA (Sale, Seller)
│   │       ├── repositories/ # Spring Data JPA
│   │       └── services/     # Regras de negócio
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                 # SPA - React + TypeScript
│   ├── src/
│   │   ├── components/       # Gráficos e tabela de vendas
│   │   ├── types/            # Interfaces TypeScript
│   │   └── utils/            # Funções auxiliares
│   └── package.json
│
├── netlify.toml              # Configuração de deploy (Netlify)
├── railway.toml              # Configuração de deploy (Railway)
└── .env.example              # Variáveis de ambiente necessárias
```

**Fluxo de dados:**
```
Netlify (React) → Axios → Railway (Spring Boot) → H2 Database
```

---

## 🚀 Como executar

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Java 11+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Node.js](https://nodejs.org/) (v14+)
- [Yarn](https://yarnpkg.com/) ou npm
- [Docker](https://www.docker.com/) *(opcional)*

### Clonando o projeto

```bash
git clone https://github.com/michelspirlandeli/sales-dashboard.git
cd sales-dashboard
```

### Configurando as variáveis de ambiente

```bash
cp .env.example .env
# Edite o .env com suas configurações
```

---

### Backend

```bash
cd backend

# Com Maven
mvn spring-boot:run

# Com Docker
docker build -t sales-dashboard-api .
docker run -p 8080:8080 sales-dashboard-api
```

A API estará disponível em `http://localhost:8080`.

**Endpoints principais:**

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/sellers` | Lista todos os vendedores |
| `GET` | `/sales` | Lista vendas com paginação |
| `GET` | `/sales/amount-by-seller` | Total de vendas por vendedor |
| `GET` | `/sales/success-by-seller` | Taxa de sucesso por vendedor |

---

### Frontend

```bash
cd frontend

# Instalar dependências
yarn install

# Iniciar em desenvolvimento
yarn start
```

Acesse `http://localhost:3000` no seu navegador.

> Por padrão, o frontend aponta para a API em produção no Railway. Para usar a API local, edite a `baseURL` no arquivo de configuração do Axios.

### Build de produção

```bash
# Frontend
cd frontend && yarn build

# Backend
cd backend && mvn clean package
java -jar target/*.jar
```

---

## ☁️ Deploy

O projeto está configurado para deploy contínuo:

| Serviço | Branch | URL |
|---|---|---|
| Netlify (frontend) | `main` | [michelspirlandeli-dsvendas.netlify.app](https://michelspirlandeli-dsvendas.netlify.app/) |
| Railway (backend) | `main` | Configurado via `railway.toml` |

Para fazer seu próprio deploy:

1. **Netlify** — conecte o repo e aponte o diretório base para `frontend/`
2. **Railway** — conecte o repo, o `railway.toml` já define o build automaticamente

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido por <a href="https://www.linkedin.com/in/michel-spirlandeli/">Michel Spirlandeli</a>
</p>
