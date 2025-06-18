const { connectToQueue } = require('./services/queueConsumer');
const { startTranslationWorker } = require('./services/translationService');

const startWorker = async () => {
    try {
        await connectToQueue();
        startTranslationWorker();
    } catch (error) {
        console.error('Error starting the worker:', error);
    }
};

startWorker();