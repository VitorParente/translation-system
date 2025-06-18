# Translation System

Este projeto é um sistema de tradução assíncrona composto por dois serviços Node.js: uma API REST e um worker, que se comunicam via RabbitMQ e armazenam dados no MongoDB. O objetivo é receber textos para tradução, processá-los em background e permitir o acompanhamento do status de cada requisição.

---

## Estrutura do Projeto

```
translation-system/
│
├── translation-api/         # API REST para receber e consultar traduções
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── models/
│       └── app.js
│
├── translation-worker/      # Serviço worker que processa as traduções
│   └── src/
│       ├── services/
│       ├── models/
│       └── consumer.js
│
├── docker-compose.yml       # Orquestração dos serviços e dependências
└── README.md
```

---

## Como rodar com Docker

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/VitorParente/translation-system.git
   cd translation-system
   ```

2. **Suba todos os serviços:**
   ```sh
   docker-compose up --build
   ```

3. **Acesse a API:**  
   http://localhost:3000

4. **Acesse o painel do RabbitMQ:**  
   http://localhost:15672  
   Usuário: `guest`  
   Senha: `guest`

---

## Testando a API

### 1. Enviar uma tradução

- **POST** `http://localhost:3000/translations`
- **Body (JSON):**
  ```json
  {
    "text": "hello world",
    "to": "es"
  }
  ```

### 2. Consultar status da tradução

- **GET** `http://localhost:3000/translations/{requestId}`

### 3. Listar traduções por status

- **GET** `http://localhost:3000/translations?status=processing`

---

## Parar e iniciar o worker manualmente

Para pausar o processamento (deixar traduções em "queued"):

```sh
docker-compose stop translation-worker
```

Para retomar:

```sh
docker-compose start translation-worker
```

---

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB (via Mongoose)
- RabbitMQ
- Docker e Docker Compose

---