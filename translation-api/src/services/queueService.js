const amqp = require('amqplib');
const queueName = 'translations';

async function sendToQueue(message) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log("Mensagem enviada para a fila:", message);
    await channel.close();
    await connection.close();
}

module.exports = {
    sendToQueue
};