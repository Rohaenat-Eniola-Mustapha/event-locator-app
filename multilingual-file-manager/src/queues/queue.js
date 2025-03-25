const Queue = require('bull');

const eventQueue = new Queue('event-tasks', {
  redis: { host: '127.0.0.1', port: 6379 }, // Redis connection details
});

module.exports = eventQueue;