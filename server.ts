import app from './app';
import http from 'http';

const PORT = process.env.PORT || 3000;
const SERVER = http.createServer(app.callback());

const gracefulShutdown = (err: any) => {
  console.log(err);
  SERVER.close(() => {
    console.log('Shutting down...');
  });
};

// Server start
SERVER.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

  // Handle kill commands
  process.on('SIGTERM', gracefulShutdown);

  // Prevent dirty exit on code-fault crashes:
  process.on('uncaughtException', gracefulShutdown);
});
