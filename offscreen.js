setInterval(async () => {
  (await navigator.serviceWorker.ready).active.postMessage('keepAlive');
}, 10000);