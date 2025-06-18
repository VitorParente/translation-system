require('dotenv').config();
const amqp = require('amqplib');
const mongoose = require('mongoose');
const Translation = require('./models/translation');
const translateText = require('./translator');

// Conectar ao MongoDB
async function connectMongo() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/translation_db';
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Worker conectado ao MongoDB');
}

// Consumir fila RabbitMQ
async function startWorker() {
  await connectMongo();

  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
  const channel = await connection.createChannel();
  await channel.assertQueue('translation_queue');

  console.log('🕒 Aguardando mensagens na fila...');

  channel.consume('translation_queue', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const { requestId, text, to } = data;

    try {
      console.log(`🔁 Processando tradução ${requestId}...`);

      await Translation.updateOne(
        { requestId },
        { status: 'processing', updatedAt: new Date() }
      );

      const translated = translateText(text, to);

      await Translation.updateOne(
        { requestId },
        {
          status: 'completed',
          translatedText: translated,
          updatedAt: new Date(),
        }
      );

      console.log(`✅ Tradução ${requestId} concluída.`);
    } catch (error) {
      console.error(`Erro na tradução ${requestId}:`, error.message);
      await Translation.updateOne(
        { requestId },
        { status: 'failed', updatedAt: new Date() }
      );
    }

    channel.ack(msg);
  });
}

startWorker();
