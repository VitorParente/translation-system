const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib');
const Translation = require('../models/translation');

// Conexão com RabbitMQ
let channel;
async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
  channel = await connection.createChannel();
  await channel.assertQueue('translation_queue');
}
connectRabbit();

exports.createTranslation = async (req, res) => {
  const { text, to } = req.body;

  if (!text || !to) {
    return res.status(400).json({ error: 'Campos "text" e "to" são obrigatórios.' });
  }

  const requestId = uuidv4();

  const translation = new Translation({
    requestId,
    originalText: text,
    translatedText: null,
    to,
    status: 'queued',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await translation.save();

  const message = {
    requestId,
    text,
    to,
  };

  channel.sendToQueue('translation_queue', Buffer.from(JSON.stringify(message)));

  return res.status(202).json({
    message: 'Tradução em processamento.',
    requestId,
  });
};

exports.getTranslationStatus = async (req, res) => {
  const { requestId } = req.params;

  const translation = await Translation.findOne({ requestId });

  if (!translation) {
    return res.status(404).json({ error: 'Tradução não encontrada.' });
  }

  return res.status(200).json({
    requestId: translation.requestId,
    status: translation.status,
    translatedText: translation.translatedText,
  });
};

exports.listAll = async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) query.status = status;
    const translations = await Translation.find(query);
    res.json(translations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
