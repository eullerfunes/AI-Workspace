import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

async function bootstrap() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();

    // Iniciar servidor
    const server = app.listen(env.port, () => {
      console.log(`
╔══════════════════════════════════════════════╗
║           BarberFlow API Server              ║
╠══════════════════════════════════════════════╣
║  Status:    🟢 Running                       ║
║  Port:      ${String(env.port).padEnd(35)}║
║  Env:       ${env.nodeEnv.padEnd(35)}║
║  CORS:      ${env.corsOrigin.padEnd(35)}║
║  Database:  ${'PostgreSQL'.padEnd(35)}║
╚══════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });

      // Forçar shutdown após 10s
      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();