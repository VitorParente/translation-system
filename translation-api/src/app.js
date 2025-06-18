require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const translationRoutes = require('./routes/translationRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/translation_db';

// Conecta ao MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB conectado com sucesso'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

// Rotas
app.use('/', translationRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
