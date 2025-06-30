const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread - create workers as needed
  const worker = new Worker(__filename);
} else {
  // Worker thread code
  parentPort.postMessage('Hello from worker');
}