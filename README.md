# TODO App - Teste Prático

## Visão Geral

Este é um sistema de gestão de tarefas (Todo List) desenvolvido como teste prático para desenvolvedores. O sistema inclui um backend em Node.js, frontend em React, banco de dados MongoDB e está preparado para containerização com Docker.

## Requisitos

* Node.js 18+
* Docker e Docker Compose
* MongoDB (ou usar via Docker)
* Git

## Instalação Local

### Backend

```bash
cd backend
npm install
node server.js
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
### Build e execução

```bash
docker-compose up --build
```

A aplicação estará disponível em:
 - Frontend: http://localhost
 - Backend: http://localhost:3001/api/tasks
 - MongoDB: mongodb://localhost:27017

 ## Testes 
 ### Backend
 ```bash
 cd backend
 npm test
 ```

 ### Frontend
 ```bash
 cd frontend
 npm test
 ```

 ## Variáveis de Ambiente
### Backend
 - MONGODB_URI: URL de conexão do MongoDB
 - PORT: Porta do servidor (padrão: 3001)

### Frontend
 - REACT_APP_API_URL: URL da API backend

### Problemas Conhecidos (Resolvidos)
 - Configuração CORS para produção
 - Variáveis de ambiente não configuradas
 - Autenticação MongoDB
 - Build do frontend para produção
 - Configuração Nginx

### Deploy
 Editei o docker-compose conforme as alterações nos meus arquivos de backend e frontend. Realizei o frontend com React (utilizando o Vite) e o backend com Node.js. Alterei adicionei a linha **command:** no docker-compose para rodar o backend corretamente. Após as alterações feitas, rodei no cmd o comando docker-compose up --build e o projeto estava com o deploy concluído

### Melhorias Sugeridas
 A ideia do projeto é muito boa, a única coisa que eu alteraria seria a biblioteca de componentes, que no caso foi utilizada a Material-UI, porém acho que a biblioteca Shadcn-ui é mais elegante e harmonizada.

### Autor
Desenvolvido para teste prático de contratação
