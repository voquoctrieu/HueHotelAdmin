export const setupErrorHandling = () => {

  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('iframe.js')) {
      event.preventDefault();
      return false;
    }
  });

  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('iframe.js') || args[0].includes('404'))) {
      return;
    }
    originalError.apply(console, args);
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && 
        event.reason.message.includes('iframe.js')) {
      event.preventDefault();
    }
  });
}; 