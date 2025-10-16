import startServer from './services/server';

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});

startServer().catch((error) => {
	console.error('Failed to start server:', error);
	process.exit(1);
});
